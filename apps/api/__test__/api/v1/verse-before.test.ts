import { createMocks } from "node-mocks-http";

import { CheckDuplicateOptionValue } from "~/functions/CheckDuplicateOptionValue";
import VerseBefore from "~/pages/api/v1/verse-before";

test("Not error", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await VerseBefore(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error).toBeNull();
});

test("Error when mode is not juz or surah", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { mode: "juza" },
  });

  await VerseBefore(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error.message).toMatch("Wrong mode, juz or surah only");
});

test("Returns a data with the specified type", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "27,28,29,30", mode: "surah" },
  });

  await VerseBefore(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp).toHaveProperty("error");
  expect(resp).toHaveProperty("amount", 1);
  expect(resp).toHaveProperty("mode", "surah");
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
    expect.any(String),
  );
});

test("Results array length is same with amount", async () => {
  const amount = 47;

  const { req, res } = createMocks({
    method: "GET",
    query: { select: "27,28,29,30", amount: amount },
  });

  await VerseBefore(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.results).toHaveLength(amount);
});

test("No duplicate option every question", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "27,28,29,30", amount: 20 },
  });

  await VerseBefore(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(CheckDuplicateOptionValue(resp.results)).toBeFalsy();
});

test("Error when amount > 50", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "27,28,29,30", amount: 51 },
  });

  await VerseBefore(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error.message).toMatch("Maximal amount is 50");
});

test("Error select > 30, for mode juz", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "28,29,30,31", mode: "juz" },
  });

  await VerseBefore(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error.message).toMatch("Select out of index, maximal juz is 30");
});

test("Error select > 114, for mode surah", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { select: "112,113,114,115", mode: "surah" },
  });

  await VerseBefore(req, res);

  expect(res._getStatusCode()).toBe(200);
  const resp = res._getJSONData();

  expect(resp.error.message).toMatch(
    "Select out of index, maximal surah is 114",
  );
});
