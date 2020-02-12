import formatDate from "./formatDate";

const sixDaysAgo = Date.now() - (6 * 24 * 60 * 60 * 1000);

test("less than one week ago", () => {
  const testDate = new Date(sixDaysAgo);
  const result = formatDate(testDate);
  expect(result).toBe("6 days ago");
});

test("more than one week ago", () => {
  const testDate = new Date("2020-01-01T12:05:00");
  const result = formatDate(testDate);
  expect(result).toBe("12:05 pm on 1/1/2020");
});