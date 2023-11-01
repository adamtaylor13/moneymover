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
    case "t": {
      const allButtons = document.querySelectorAll("button");
      const backToThisMonthButton = Array.from(allButtons).find((button) =>
        button?.textContent?.includes("Back to this month")
      );
      if (backToThisMonthButton) {
        backToThisMonthButton.click();
      }
    }
  }
});

console.log("🪄 MoneyMover intialized.");
