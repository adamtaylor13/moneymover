// Global to preserve active row after editing a cell in it via keyboard
let lastActiveRowIndex = "";

function isSkippableRow(
  row: Element | null | undefined
): row is HTMLTableRowElement {
  // This is the "Show/Hide pending transactions" row, skip it
  return (
    !!row && row.tagName === "TR" && !row.classList.contains("transaction-row")
  );
}

function setNewRowAsCurrent(newRow: HTMLTableRowElement | null) {
  document
    .querySelector(".keyboardSelected")
    ?.classList.remove("keyboardSelected");
  newRow?.classList.add("keyboardSelected");
  newRow?.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll the next item into view
  lastActiveRowIndex = newRow?.rowIndex.toString() || "";
}

function getFirstNonPendingRow(): HTMLTableRowElement | null {
  const tableBody = document.querySelector("tbody");
  if (!tableBody) {
    return null;
  }
  let firstItem: Element | null = tableBody?.querySelector("tr");
  if (isSkippableRow(firstItem)) {
    firstItem = firstItem.nextElementSibling;
  }
  setNewRowAsCurrent(firstItem as HTMLTableRowElement | null);
  return firstItem as HTMLTableRowElement | null;
}

function getCurrentRow() {
  let currentRow = document
    .querySelector("tbody")
    ?.querySelector("tr.keyboardSelected");
  if (!currentRow) {
    currentRow = getFirstNonPendingRow();
  }
  if (!currentRow) {
    console.warn("Could not find any transaction rows in the table");
    return null;
  } else {
    return currentRow;
  }
}

export const TransactionTable = {
  noSelectedRow() {
    return lastActiveRowIndex === "";
  },
  getFirstNonPendingRow,
  getNextNonPendingRow() {
    const currentRow = getCurrentRow();
    let row = currentRow?.nextElementSibling;
    while (isSkippableRow(row)) {
      row = row.nextElementSibling;
    }
    setNewRowAsCurrent(row as HTMLTableRowElement | null);
  },
  getPrevNonPendingRow() {
    const currentRow = getCurrentRow();
    let row = currentRow?.previousElementSibling;
    while (isSkippableRow(row)) {
      row = row.previousElementSibling;
    }
    setNewRowAsCurrent(row as HTMLTableRowElement | null);
  },
  // Function to reset the Transaction Keyboard Selection
  resetTransactionKeyboardSelection() {
    lastActiveRowIndex = "";
  },
  // Function to restore the last active row from after Transaction table update
  restoreTransactionKeyboardSelection() {
    if (lastActiveRowIndex !== "") {
      const rowIndex = parseInt(lastActiveRowIndex);
      if (!isNaN(rowIndex)) {
        // Query the table body for the row element at the saved rowIndex
        const querySelector = `tbody tr:nth-child(${rowIndex})`;
        const rowElement = document.querySelector(querySelector);

        // Set that current row ad Keyboard Selected and ensure it is in view
        if (rowElement) {
          rowElement.classList.add("keyboardSelected");
          rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  },
};
