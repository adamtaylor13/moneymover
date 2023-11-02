import { getCurrentYearAndMonthFromUrl } from "./getCurrentYearAndMonthFromUrl";
import { getNextMonthUrl, getPreviousMonthUrl } from "./monthNavigation";

export function getElementsForKey(key: string): (HTMLElement | null)[] {
  switch (key) {
    case "n": {
      const { year, month } = getCurrentYearAndMonthFromUrl();
      const nextMonthButton = document.querySelector(
        `a[href*="${getNextMonthUrl(month, year)}"]`
      ) as HTMLElement | null;
      return [nextMonthButton];
    }
    case "p": {
      const { year, month } = getCurrentYearAndMonthFromUrl();
      const previousMonthButton = document.querySelector(
        `a[href*="${getPreviousMonthUrl(month, year)}"]`
      ) as HTMLElement | null;
      return [previousMonthButton];
    }
    case "r": {
      const reviewTransactionsButton = document.querySelector(
        "div.task-card"
      ) as HTMLElement | null;
      return [reviewTransactionsButton];
    }
    case "t": {
      const allButtons = document.querySelectorAll("button");
      const thisMonthButton = Array.from(allButtons).find((button) =>
        button?.textContent?.includes("Back to this month")
      );
      return [thisMonthButton || null];
    }
    case "/": {
      const quickFilterInput = document.getElementById(
        "search-transactions-input"
      ) as HTMLInputElement | null;
      return [quickFilterInput];
    }
    case "Escape": {
      const clearFilterButton = document.querySelector(
        "table.p-transactions-table i.x.icon"
      ) as HTMLElement | null;

      const footerButtons = document.querySelectorAll(
        "div.modal .modal-footer button"
      );
      const modalCloseButton = Array.from(footerButtons).find((button) => {
        const buttonText = button?.textContent?.toLowerCase();
        return buttonText?.includes("close") || buttonText?.includes("cancel");
      }) as HTMLElement | null;

      return [clearFilterButton, modalCloseButton];
    }
    case "Tab": {
      const allSubNavs = document.querySelectorAll(
        "div.secondary.menu a"
      ) as NodeListOf<HTMLElement>;
      const numSubNavs = allSubNavs.length;
      const activeSubNavIndex = Array.from(allSubNavs).findIndex((subNav) =>
        subNav.classList.contains("active")
      );

      const nextSubNavIndex =
        activeSubNavIndex + 1 > numSubNavs - 1 ? 0 : activeSubNavIndex + 1;
      const nextNavElement = allSubNavs[nextSubNavIndex];
      const previousSubNavIndex =
        activeSubNavIndex - 1 < 0 ? numSubNavs - 1 : activeSubNavIndex - 1;
      const previousNavElement = allSubNavs[previousSubNavIndex];

      return [previousNavElement, nextNavElement];
    }
    default: {
      return [];
    }
  }
}
