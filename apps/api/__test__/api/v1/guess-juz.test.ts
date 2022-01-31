import { createMocks } from "node-mocks-http";

import { CheckDuplicateOptionValue } from "~/functions/CheckDuplicateOptionValue";
import GuessJuz from "~/pages/api/v1/guess-juz";

test("Error when select less than 4", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await GuessJuz(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error.message).toMatch("Choose at least 4 juz");
});

test("Not error after select 4", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "27,28,29,30" },
  });

  await GuessJuz(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error).toBeNull();
});

test("Returns a data with the specified type", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "27,28,29,30" },
  });

  await GuessJuz(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp).toHaveProperty("error");
  expect(resp).toHaveProperty("amount", 1);
  expect(resp).not.toHaveProperty("mode", "surah");
  expect(resp).toHaveProperty("select", [27, 28, 29, 30]);

  expect(resp.results[0]).toHaveProperty("id", 0);
  expect(resp.results[0]).toHaveProperty("questionText", expect.any(String));

  expect(resp.results[0].options).toHaveLength(4);

  expect(resp.results[0].options[1]).toHaveProperty(
    "value",
    expect.any(Number),
  );
  expect(resp.results[0].options[1]).toHaveProperty(
    "option",
    expect.any(Number),
  );
});

test("Results array length is same with amount", async () => {
  const amount = 47;

  const { req, res } = createMocks({
    method: "GET",
    query: { select: "27,28,29,30", amount: amount },
  });

  await GuessJuz(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.results).toHaveLength(amount);
});

test("No duplicate option every question", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "27,28,29,30", amount: 20 },
  });

  await GuessJuz(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(CheckDuplicateOptionValue(resp.results)).toBeFalsy();
});

test("Error when amount > 50", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "111,112,113,114", amount: 51 },
  });

  await GuessJuz(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error.message).toMatch("Maximal amount is 50");
});

test("Error select > 30, for mode juz", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "28,29,30,31" },
  });

  await GuessJuz(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error.message).toMatch("Select out of index, maximal juz is 30");
});
