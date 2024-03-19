import { getElementsForKey } from "@utils/getElementForKey";
import { initializeMessageListener } from "@messages/init";
import { Sequencer } from "@utils/Sequencer";
import { TransactionTable } from "@TransactionTable";

import "@styles/keyboard-shortcuts.css";

initializeMessageListener();

export const keyDownEventListener = (seq: ReturnType<typeof Sequencer>) =>
  function (event: KeyboardEvent) {
    // In general, we probably don't want to run any of these functions
    // when "ctrl" or "meta" (cmd on MacOS) is held down. Reason being is that
    // these actually do things in the browser. So for example, Ctrl/Meta-R will
    // refresh the page, and chances are that's _ALL_ the user intends for it to do.
    if (
      document.activeElement instanceof HTMLInputElement ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    /**
     * So far, all of our keys are one-shot keybindings. That means as soon as
     * we press them, they activate. However, we'd like to get the full vim-like,
     * modal editing experience. To do this, we need to figure out how to keep
     * our one-shot keybindings, but also allow for sequential keybindings.
     */
    seq.add(event.key);
    if (seq.isBuildingValidSequence()) {
      if (seq.hasCompletedSequence()) {
        seq.handleSequence();
      }
      return;
    }

    // else it's a one-shot keybinding
    switch (event.key) {
      case "j": {
        if (TransactionTable.noSelectedRow()) {
          TransactionTable.getFirstNonPendingRow();
        } else {
          TransactionTable.getNextNonPendingRow();
        }
        break;
      }
      case "k": {
        if (TransactionTable.noSelectedRow()) {
          TransactionTable.getFirstNonPendingRow();
        } else {
          TransactionTable.getPrevNonPendingRow();
        }
        break;
      }
      case "c": {
        event.preventDefault(); //prevent typing c in category field
        const cButton = getElementsForKey("c");
        cButton?.click();
        break;
      }
      case "a": {
        const aButton = getElementsForKey("a");
        aButton?.click();
        break;
      }
      case "n": {
        event.preventDefault(); //don't type n in notes field
        const nButton = getElementsForKey("n");
        nButton?.click();
        break;
      }
      case "p": {
        event.preventDefault(); //don't type p in payee field
        const pButton = getElementsForKey("p");
        pButton?.click();
        break;
      }
      case "x": {
        const xButton = getElementsForKey("x");
        xButton?.click();
        break;
      }
      case "m": {
        const mButton = getElementsForKey("m");
        mButton?.click();
        break;
      }
      case "r": {
        const rButton = getElementsForKey("r");
        rButton?.click();
        break;
      }
      case "t": {
        event.preventDefault(); //don't type t in tags field
        const tButton = getElementsForKey("t");
        tButton?.click();
        break;
      }
      case "y": {
        const yButton = getElementsForKey("y");
        yButton?.click();
        break;
      }
      case "<": {
        const backButton = getElementsForKey("<");
        backButton?.click();
        break;
      }
      case ">": {
        const forwardButton = getElementsForKey(">");
        forwardButton?.click();
        break;
      }
      case ".": {
        const backToThisMonthButton = getElementsForKey(".");
        backToThisMonthButton?.click();
        break;
      }
      case "/": {
        event.preventDefault(); // Don't actually type this key
        const quickFilterInput = getElementsForKey("/");
        quickFilterInput?.focus();
        quickFilterInput?.select();
        break;
      }
      case "Enter": {
        const EnterButton = getElementsForKey("Enter");
        if (EnterButton instanceof HTMLButtonElement) {
          //else don't click as active row was re-selected
          EnterButton?.click();
        }
        break;
      }
      case "Escape": {
        seq.reset(); // Escape will reset our sequence
        const [clearFilterButton, closeModalButton] =
          getElementsForKey("Escape");
        clearFilterButton?.click();
        closeModalButton?.click();
        TransactionTable.setNewRowAsCurrent(null);
        break;
      }
      case "Tab": {
        const isShifted = event.shiftKey;
        event.preventDefault();
        const [previousNavElement, nextNavElement] = getElementsForKey("Tab");

        if (isShifted) {
          previousNavElement?.click();
        } else {
          nextNavElement?.click();
        }
        break;
      }
    }
  };

const sequencer = Sequencer();
document.addEventListener("keydown", keyDownEventListener(sequencer));

// Going through hoops here to update the Keyboard Shortcuts selected
// Transaction whenever the Transaction Table is re-rendered

// Mutation Observer will restore the keyboard selection after re-render
const mutationCallback = (mutationsList: MutationRecord[]) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList" || mutation.type === "attributes") {
      const target = mutation.target;
      if (target.nodeType === Node.ELEMENT_NODE) {
        const targetElement = target as Element;
        // If a transaction just got updated, restore the last active Keyboard Selection
        if (
          targetElement.classList.contains("transaction-row") &&
          (targetElement.classList.contains("cleared") ||
            targetElement.classList.contains("uncleared")) &&
          !targetElement.classList.contains("keyboardSelected")
        ) {
          TransactionTable.restoreTransactionKeyboardSelection();
        }
      }
    }
  }
};

let observer = new MutationObserver(mutationCallback);
let transactionTable: HTMLElement | null;
const config = { attributes: true, childList: true, subtree: true };

// Function to enable the mutation monitor when Transaction Table is detectedd
function monitorTransactionTable() {
  // Called when the transactions page is loaded or updated.
  // Since it can take time for the transactions table to load,
  // wait for a bit and then if it is found monitor it for changes so that
  // the keyboard selected transaction persists across changes
  setTimeout(() => {
    transactionTable = document.querySelector(".p-transactions-table");
    if (transactionTable) {
      console.log(
        "[MoneyMover] Keyboard Shortcuts enabled for transaction table."
      );
      //transactionTable = document.getElementById('.p-transactions-table');
      observer.observe(transactionTable, config);
    } else {
      console.log(
        "[MoneyMover] Couldn't find transaction table for Keyboard Shortcuts."
      );
    }
  }, 3000); // Adjust the delay as needed
}

// Check for Transaction Table on an initial page load
window.addEventListener("load", () => {
  // Check if the transaction page is being loaded and set up a listener
  // to monitor changes in the Transaction table
  const currentUrl = window.location.href;
  if (currentUrl.includes("transactions")) {
    onTransPage = true;
    monitorTransactionTable();
  } else {
    onTransPage = false;
  }
});

// Unfortunately, the only way I was able to consistently check for the
// presence of the transaction table was to periodically check the current URL
// when a lunchmoney tab is active
let lastUrl = location.href;
let onTransPage = false;
setInterval(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    if (!onTransPage && currentUrl.includes("transactions")) {
      onTransPage = true;
      monitorTransactionTable();
    } else if (onTransPage && !currentUrl.includes("transactions")) {
      console.log("[Money Mover]Disconnecting Transactions Table monitor");
      onTransPage = false;
      TransactionTable.resetTransactionKeyboardSelection();
      observer.disconnect();
    }
  }
}, 1000); // Check every 1000 milliseconds (1 second) - yes it's kludgy...

console.log("🪄 MoneyMover intialized.");
