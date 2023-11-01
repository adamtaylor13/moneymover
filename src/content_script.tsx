import { getNextMonthUrl, getPreviousMonthUrl } from "./utils/monthNavigation";

document.addEventListener("keydown", function (event) {
  if (document.activeElement instanceof HTMLInputElement) {
    return;
  }

  const url = new URL(window.location.href);
  const pathParts = url.pathname.split("/");
  const year = parseInt(pathParts[pathParts.length - 2]);
  const month = parseInt(pathParts[pathParts.length - 1]);
  if (isNaN(year) || isNaN(month)) {
    console.error("Unable to parse year and month from url", url);
    return;
  }

  switch (event.key) {
    case "n": {
      const element = document.querySelector(
        `a[href="${getNextMonthUrl(month, year)}"]`
      ) as HTMLElement | null;
      element?.click();
      break;
    }
    case "p": {
      const element = document.querySelector(
        `a[href="${getPreviousMonthUrl(month, year)}"]`
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
      break;
    }
  }
});

console.log("🪄 MoneyMover intialized.");
