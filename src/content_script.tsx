import { getNextMonthUrl, getPreviousMonthUrl } from "./utils/monthNavigation";
import { getCurrentYearAndMonthFromUrl } from "./utils/getCurrentYearAndMonthFromUrl";

document.addEventListener("keydown", function (event) {
  if (document.activeElement instanceof HTMLInputElement) {
    return;
  }

  switch (event.key) {
    case "n": {
      const { year, month } = getCurrentYearAndMonthFromUrl();
      const element = document.querySelector(
        `a[href*="${getNextMonthUrl(month, year)}"]`
      ) as HTMLElement | null;
      element?.click();
      break;
    }
    case "p": {
      const { year, month } = getCurrentYearAndMonthFromUrl();
      const element = document.querySelector(
        `a[href*="${getPreviousMonthUrl(month, year)}"]`
      ) as HTMLElement | null;
      element?.click();
      break;
    }
    case "r": {
      const reviewTransactionsButton = document.querySelector(
        "div.task-card"
      ) as HTMLElement | null;
      reviewTransactionsButton?.click();
      break;
    }
    case "t": {
      const allButtons = document.querySelectorAll("button");
      const backToThisMonthButton = Array.from(allButtons).find((button) =>
        button?.textContent?.includes("Back to this month")
      );
      if (backToThisMonthButton) {
        backToThisMonthButton.click();
      }
      break;
    }
    case "/": {
      event.preventDefault(); // Don't actually type this key
      const element = document.getElementById(
        "search-transactions-input"
      ) as HTMLInputElement | null;
      element?.focus();
      element?.select();
      break;
    }
    // There's a good chance this will get very overloaded depending on the UI state.
    case "Escape": {
      const clearFilterButton = document.querySelector(
        "table.p-transactions-table i.x.icon"
      ) as HTMLElement | null;
      clearFilterButton?.click();

      // First overload, attempt to close a modal if it's open.
      const footerButtons = document.querySelectorAll(
        "div.modal .modal-footer button"
      );
      const closeButton = Array.from(footerButtons).find((button) => {
        const buttonText = button?.textContent?.toLowerCase();
        return buttonText?.includes("close") || buttonText?.includes("cancel");
      }) as HTMLElement | null;
      closeButton?.click();
      break;
    }
    case "Tab": {
      const isShifted = event.shiftKey;
      event.preventDefault();
      const allSubNavs = document.querySelectorAll(
        "div.secondary.menu a"
      ) as NodeListOf<HTMLElement>;
      const numSubNavs = allSubNavs.length;
      const activeSubNavIndex = Array.from(allSubNavs).findIndex((subNav) =>
        subNav.classList.contains("active")
      );

      const nextSubNav =
        activeSubNavIndex + 1 > numSubNavs - 1 ? 0 : activeSubNavIndex + 1;
      const previousSubNav =
        activeSubNavIndex - 1 < 0 ? numSubNavs - 1 : activeSubNavIndex - 1;

      allSubNavs[isShifted ? previousSubNav : nextSubNav]?.click();
      break;
    }
  }
});

console.log("🪄 MoneyMover intialized.");
