import { getCurrentYearAndMonthFromUrl } from "./getCurrentYearAndMonthFromUrl";
import { getNextMonthUrl, getPreviousMonthUrl } from "./monthNavigation";

// TODO: Refacotor into own file
export const query = (selector: string) =>
  document.querySelector(selector) as HTMLElement | null;
export const queryAll = (selector: string) =>
  Array.from(document.querySelectorAll(selector) as NodeListOf<HTMLElement>);

const UrlsWithMonths = [".*\/(transactions|budget|recurring|calendar)\/\d*"];

function isUrlOneOf(url: string, allowedUrls: string[]) {
  return allowedUrls.some(pattern => url.match(pattern))
}

type Key = "j" | "k" | "c" | "a" | "n" | "p" | "x" | "m" | "r" | "t" | ">" | "<" | "." | "/" | "Enter" | "Escape" | "Tab";
type ElementsForKey = {
  [K in Key]: K extends "/"
    ? HTMLInputElement | null
    : K extends "Escape"
    ? [HTMLElement | null, HTMLElement | null]
    : HTMLElement | null;
};

export function getElementsForKey(key: "j"): HTMLElement | null;
export function getElementsForKey(key: "k"): HTMLElement | null;
export function getElementsForKey(key: "c"): HTMLElement | null;
export function getElementsForKey(key: "a"): HTMLElement | null;
export function getElementsForKey(key: "n"): HTMLElement | null;
export function getElementsForKey(key: "p"): HTMLElement | null;
export function getElementsForKey(key: "x"): HTMLElement | null;
export function getElementsForKey(key: "m"): HTMLElement | null;
export function getElementsForKey(key: "r"): HTMLElement | null;
export function getElementsForKey(key: "t"): HTMLElement | null;
export function getElementsForKey(key: ">"): HTMLElement | null;
export function getElementsForKey(key: "<"): HTMLElement | null;
export function getElementsForKey(key: "."): HTMLElement | null;
export function getElementsForKey(key: "/"): HTMLInputElement | null;
export function getElementsForKey(key: "Enter"): HTMLElement | null;
export function getElementsForKey(key: "Escape"): [HTMLElement | null, HTMLElement | null];
export function getElementsForKey(key: "Tab"): [HTMLElement | null, HTMLElement | null];
export function getElementsForKey(key: Key): ElementsForKey[Key] 
{
  // url unrestricted keys
  switch (key) {
    case "j": {
      const tableBody = document.querySelector("tbody");
      const currentItem = tableBody?.querySelector("tr.keyboardSelected");
      if (currentItem) {
        const nextItem = currentItem.nextElementSibling as HTMLElement | null;
        currentItem.classList.remove('keyboardSelected');
        nextItem?.classList.add('keyboardSelected');
        return nextItem;
      }
      else {
        const firstItem = tableBody?.querySelector("tr") as HTMLElement | null;
        firstItem?.classList.add('keyboardSelected');
        return firstItem;
      }
    }
    case "k": {
      const tableBody = document.querySelector("tbody");
      const currentItem = tableBody?.querySelector("tr.keyboardSelected");
      if (currentItem) {
        const prevItem = currentItem.previousElementSibling as HTMLElement | null;
        if (prevItem) {
          currentItem.classList.remove("keyboardSelected");
          prevItem.classList.add("keyboardSelected");
          return prevItem;
        }
      }
      else {
        const firstItem = tableBody?.querySelector("tr") as HTMLElement | null;
        firstItem?.classList.add("keyboardSelected");
        return firstItem;
      }
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

  // Suggested Recurring shortcuts
  if (isUrlOneOf(window.location.href, [".*\/recurring\/suggested"]))
  {
    switch (key) {
      case "Enter": {
        const tableBody = document.querySelector("tbody");
        const currentItem = tableBody?.querySelector("tr.keyboardSelected") as HTMLElement | null;
        return currentItem;
      }
      case "a": {
        const allButtons = queryAll("button");
        const notRecurringButton = allButtons.find((button) =>
          button?.textContent?.includes("APPROVE THIS NEW RECURRING ITEM")
        );
        return notRecurringButton ? notRecurringButton : null;
      }
      case "n": {
        const allButtons = queryAll("button");
        const noRuleButton = allButtons.find((button) =>
          button?.textContent == ("No")
        );
        if (noRuleButton != null)
        {
          return noRuleButton;
        }
        const notRecurringButton = allButtons.find((button) =>
          button?.textContent?.includes("not a recurring item")
        );
        return notRecurringButton ? notRecurringButton : null;
      }
    }
  }

  // Month navigation shortcuts
  if (isUrlOneOf(window.location.href, UrlsWithMonths))
  {
    switch (key) {
      case ">": {
        const { year, month } = getCurrentYearAndMonthFromUrl();
        const nextMonthButton = query(
          `a[href*="${getNextMonthUrl(month, year)}"]`
        );
        return nextMonthButton;
      }
      case "<": {
        const { year, month } = getCurrentYearAndMonthFromUrl();
        const previousMonthButton = query(
          `a[href*="${getPreviousMonthUrl(month, year)}"]`
        );
        return previousMonthButton;
      }
      case ".": {
        const allButtons = queryAll("button");
        const thisMonthButton = Array.from(allButtons).find((button) =>
          button?.textContent?.includes("Back to this month")
        );
        return thisMonthButton || null;
      }
    }
  }

  // Transaction Edit shortcuts
  if (isUrlOneOf(window.location.href, [".*\/transactions\/\d*"]))
  {
    const tableBody = document.querySelector("tbody");
    const currentRow = tableBody?.querySelector("tr.keyboardSelected");
    switch (key) {
      case "c": {
        const categoryField = currentRow?.querySelectorAll("td.editable")[1].
          querySelector("div")?.querySelector("div")?.querySelector("div") as HTMLElement | null;
        return categoryField;
      }
      case "p": {
        const payeeField = currentRow?.querySelectorAll("td.editable")[2].
          querySelector("div")?.querySelector("div")?.querySelector("div") as HTMLElement | null;
        return payeeField;
      }
      case "a": {
        const amountField = currentRow?.querySelectorAll("td.clickable")[1] as HTMLElement | null;
        return amountField;
      }
      case "x": {
        const amountField = currentRow?.querySelectorAll("td.clickable")[0] as HTMLElement | null;
        return amountField;
      }
      case "m": {
        const allButtons = queryAll("button");
        const markReviewedButton = allButtons.find((button) =>
          button?.textContent?.includes("Mark Reviewed")
        ) as HTMLElement | null;
        return markReviewedButton;
      }
      case "n": {
        const notesField = currentRow?.querySelectorAll("td.editable")[3].
          querySelector("div")?.querySelector("div")?.querySelector("div") as HTMLElement | null;
        return notesField;
      }
      case "t": {
        const rowButtons = currentRow?.querySelectorAll("button");
        if (rowButtons == null)
        {
          return null
        }
        const rowButtonsArray = Array.from(rowButtons);
        const addTagButton = rowButtonsArray?.find((button) => button?.textContent?.includes("Add")) as HTMLElement | null;
        return addTagButton;
      }
      case "r": {
        const markReviewedButton = currentRow?.querySelector("i.check.circle.icon") as HTMLElement | null;
        return markReviewedButton;
      }
      case "Enter": {
        const detailsButton = currentRow?.querySelector("i.angle.right.icon") as HTMLElement | null;
        return detailsButton;
      }
      case "/": {
        const quickFilterInput = document.getElementById(
          "search-transactions-input"
        ) as HTMLInputElement | null;
        return quickFilterInput;
      }
    }
  }

  return null;
}

export function getElementsForUnknownKey(key: string): (HTMLElement | null)[] {
  const elements = getElementsForKey(key as any);
  return Array.isArray(elements) ? elements : [elements];
}
