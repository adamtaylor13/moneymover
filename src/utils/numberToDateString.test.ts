import { numberToDateString } from "./numberToDateString";

describe("numberToDateString", () => {
  it("should return a string with a leading zero for numbers less than 10", () => {
    expect(numberToDateString(1)).toBe("01");
    expect(numberToDateString(9)).toBe("09");
  });

  it("should return the same string for numbers 10 or greater", () => {
    expect(numberToDateString(10)).toBe("10");
    expect(numberToDateString(99)).toBe("99");
  });
});
