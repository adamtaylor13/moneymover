import { getCurrentYearAndMonthFromUrl } from "./getCurrentYearAndMonthFromUrl";
import { getNextMonthUrl, getPreviousMonthUrl } from "./monthNavigation";

// TODO: Refacotor into own file
export const query = (selector: string) =>
  document.querySelector(selector) as HTMLElement | null;
export const queryAll = (selector: string) =>
  Array.from(document.querySelectorAll(selector) as NodeListOf<HTMLElement>);

const UrlsWithMonths = [".*\/(transactions|budget|recurring|calendar)\/\d*"];

type Key = "j" | "k" | "c" | "a" | "n" | "p" | "x" | "m" | "r" | "t" | "y" | ">" | "<" | "." | "/" | "Enter" | "Escape" | "Tab";
type ElementsForKey = {
  [K in Key]: K extends "/"
    ? HTMLInputElement | null
    : K extends "Escape"
    ? [HTMLElement | null, HTMLElement | null]
    : HTMLElement | null;
};

// Global to preserve active row after editing a cell in it via keyboard
let lastActiveRowIndex = ""

function isUrlOneOf(url: string, allowedUrls: string[]) {
  return allowedUrls.some(pattern => url.match(pattern))
}

function getFirstNonPendingRow(tableBody: HTMLTableSectionElement | null, goingUp: boolean): HTMLTableRowElement | null {
  if (!tableBody) {
    return null;
  }
  let firstItem: Element | null = tableBody?.querySelector("tr");
  if (firstItem && firstItem.tagName === 'TR' && !firstItem.classList.contains('transaction-row')) {
    // This is the "Show/Hide pending transactions" row, skip it
    firstItem = goingUp ? firstItem.previousElementSibling : firstItem.nextElementSibling;
  }
  return firstItem as HTMLTableRowElement | null;
}

function getNextNonPendingRow(currentRow: Element | null, goingUp: boolean): HTMLTableRowElement | null {
  if (!currentRow) {
    return null;
  }

  let row: Element | null = goingUp ? currentRow.previousElementSibling : currentRow.nextElementSibling;  
  while (row && row.tagName === 'TR' && !row.classList.contains('transaction-row')) {
    // This is the "Show/Hide pending transactions" row, skip it
    row = goingUp ? row.previousElementSibling : row.nextElementSibling;
  }
  return row as HTMLTableRowElement | null;
}

function setNewRowAsCurrent(newRow: HTMLTableRowElement | null, previous: HTMLTableRowElement | null) {
  previous?.classList.remove('keyboardSelected');
  newRow?.classList.add('keyboardSelected');
  newRow?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll the next item into view
  lastActiveRowIndex = (newRow?.rowIndex.toString() || "");
}

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
export function getElementsForKey(key: "y"): HTMLElement | null;
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
      const currentItem = tableBody?.querySelector("tr.keyboardSelected") as HTMLTableRowElement;
      if (currentItem) {
        const nextItem = getNextNonPendingRow(currentItem, false)
        setNewRowAsCurrent(nextItem, currentItem)
        return nextItem;
      }
      else {
        const firstItem = getFirstNonPendingRow(tableBody, false)
        setNewRowAsCurrent(firstItem, null)
        return firstItem;
      }
    }
    case "k": {
      const tableBody = document.querySelector("tbody");
      const currentItem = tableBody?.querySelector("tr.keyboardSelected") as HTMLTableRowElement;
      if (currentItem) {
        const prevItem = getNextNonPendingRow(currentItem, true)
        if (prevItem) {
          setNewRowAsCurrent(prevItem, currentItem)
          return prevItem;
        } else {
          return currentItem as HTMLElement | null;
        }
      }
      else {
        const firstItem = getFirstNonPendingRow(tableBody, false)
        setNewRowAsCurrent(firstItem, null)
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
          button?.textContent?.includes("Approve this new recurring item")
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
      case "y": {
        const allButtons = queryAll("button");
        const yesButton = allButtons.find((button) =>
          button?.textContent?.includes("Yes")
        ) as HTMLElement | null;
        return yesButton
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


// Function to reset the Transaction Keyboard Selection
export function resetTransactionKeyboardSelection() {
  lastActiveRowIndex = "";
}

// Function to restore the last active row from after Transaction table update
export function restoreTransactionKeyboardSelection() {
  if (lastActiveRowIndex !== "") {
    const rowIndex = parseInt(lastActiveRowIndex);
    if (!isNaN(rowIndex)) {
      // Query the table body for the row element at the saved rowIndex
      const querySelector = `tbody tr:nth-child(${rowIndex})`;
      const rowElement = document.querySelector(querySelector);

      // Set that current row ad Keyboard Selected and ensure it is in view
      if (rowElement) {
        rowElement.classList.add('keyboardSelected');
        rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}
