import { createMocks } from "node-mocks-http";

import { CheckDuplicateOptionValue } from "~/functions/CheckDuplicateOptionValue";
import GuessSurah from "~/pages/api/v1/guess-surah";

test("Error when select less than 4", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await GuessSurah(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error.message).toMatch("Choose at least 4 surah");
});

test("Not error after select 4", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "111,112,113,114" },
  });

  await GuessSurah(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error).toBeNull();
});

test("Returns a data with the specified type", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "111,112,113,114" },
  });

  await GuessSurah(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp).toHaveProperty("error");
  expect(resp).toHaveProperty("amount", 1);
  expect(resp).not.toHaveProperty("mode", "surah");
  expect(resp).toHaveProperty("select", [111, 112, 113, 114]);

  expect(resp.results[0]).toHaveProperty("id", 0);
  expect(resp.results[0]).toHaveProperty("questionText", expect.any(String));

  expect(resp.results[0].options).toHaveLength(4);

  expect(resp.results[0].options[1]).toHaveProperty(
    "value",
    expect.any(Number),
  );
  expect(resp.results[0].options[1]).toHaveProperty(
    "option",
    expect.any(String),
  );
});

test("Results array length is same with amount", async () => {
  const amount = 47;

  const { req, res } = createMocks({
    method: "GET",
    query: { select: "111,112,113,114", amount: amount },
  });

  await GuessSurah(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.results).toHaveLength(amount);
});

test("No duplicated option name surah", async () => {
  const amount = 47;

  const { req, res } = createMocks({
    method: "GET",
    query: { select: "111,112,113,114", amount: amount },
  });

  await GuessSurah(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(CheckDuplicateOptionValue(resp.results)).toBeFalsy();
});

test("Error when amount > 50", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "111,112,113,114", amount: 51 },
  });

  await GuessSurah(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error.message).toMatch("Maximal amount is 50");
});

test("Error select > 114, for mode surah", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "111,112,113,115" },
  });

  await GuessSurah(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error.message).toMatch(
    "Select out of index, maximal surah is 114",
  );
});
