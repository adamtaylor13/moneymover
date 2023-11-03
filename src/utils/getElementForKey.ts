import { getCurrentYearAndMonthFromUrl } from "./getCurrentYearAndMonthFromUrl";
import { getNextMonthUrl, getPreviousMonthUrl } from "./monthNavigation";

const query = (selector: string) =>
  document.querySelector(selector) as HTMLElement | null;
const queryAll = (selector: string) =>
  document.querySelectorAll(selector) as NodeListOf<HTMLElement>;

type Key = "n" | "p" | "r" | "t" | "/" | "Escape" | "Tab";
type ElementsForKey = {
  [K in Key]: K extends "/"
    ? HTMLInputElement | null
    : K extends "Escape"
    ? [HTMLElement | null, HTMLElement | null]
    : HTMLElement | null;
};

export function getElementsForKey(key: "n"): HTMLElement | null;
export function getElementsForKey(key: "p"): HTMLElement | null;
export function getElementsForKey(key: "r"): HTMLElement | null;
export function getElementsForKey(key: "t"): HTMLElement | null;
export function getElementsForKey(key: "/"): HTMLInputElement | null;
export function getElementsForKey(
  key: "Escape"
): [HTMLElement | null, HTMLElement | null];
export function getElementsForKey(
  key: "Tab"
): [HTMLElement | null, HTMLElement | null];
export function getElementsForKey(key: Key): ElementsForKey[Key] {
  switch (key) {
    case "n": {
      const { year, month } = getCurrentYearAndMonthFromUrl();
      const nextMonthButton = query(
        `a[href*="${getNextMonthUrl(month, year)}"]`
      );
      return nextMonthButton;
    }
    case "p": {
      const { year, month } = getCurrentYearAndMonthFromUrl();
      const previousMonthButton = query(
        `a[href*="${getPreviousMonthUrl(month, year)}"]`
      );
      return previousMonthButton;
    }
    case "r": {
      const reviewTransactionsButton = query("div.task-card");
      return reviewTransactionsButton;
    }
    case "t": {
      const allButtons = queryAll("button");
      const thisMonthButton = Array.from(allButtons).find((button) =>
        button?.textContent?.includes("Back to this month")
      );
      return thisMonthButton || null;
    }
    case "/": {
      const quickFilterInput = document.getElementById(
        "search-transactions-input"
      ) as HTMLInputElement | null;
      return quickFilterInput;
    }
    case "Escape": {
      const clearFilterButton = query("table.p-transactions-table i.x.icon");

      const footerButtons = queryAll("div.modal .modal-footer button");
      const modalCloseButton = Array.from(footerButtons).find((button) => {
        const buttonText = button?.textContent?.toLowerCase();
        return buttonText?.includes("close") || buttonText?.includes("cancel");
      }) as HTMLElement | null;

      return [clearFilterButton, modalCloseButton];
    }
    case "Tab": {
      const allSubNavs = queryAll("div.secondary.menu a");
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
  }
  return null;
}

export function getElementsForUnknownKey(key: string): (HTMLElement | null)[] {
  const elements = getElementsForKey(key as any);
  return Array.isArray(elements) ? elements : [elements];
}
