import { getNextMonthUrl, getPreviousMonthUrl } from "./monthNavigation";

describe("monthNavigation", () => {
  describe("getNextMonthUrl", () => {
    it("should return the correct URL for the next month", () => {
      expect(getNextMonthUrl(1, 2022)).toEqual("/2022/02");
      expect(getNextMonthUrl(12, 2022)).toEqual("/2023/01");
      expect(getNextMonthUrl(9, 2022)).toEqual("/2022/10");
    });
  });

  describe("getPreviousMonthUrl", () => {
    it("should return the correct URL for the previous month", () => {
      expect(getPreviousMonthUrl(2, 2022)).toEqual("/2022/01");
      expect(getPreviousMonthUrl(11, 2022)).toEqual("/2022/10");
      expect(getPreviousMonthUrl(1, 2022)).toEqual("/2021/12");
    });
  });
});
