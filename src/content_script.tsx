import { getElementsForKey } from "@utils/getElementForKey";
import { initializeMessageListener } from "@messages/init";
import { Sequencer } from "@utils/Sequencer";

initializeMessageListener();

const seq = Sequencer();

document.addEventListener("keydown", function (event) {
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
    case "n": {
      const nextMonthButton = getElementsForKey("n");
      nextMonthButton?.click();
      break;
    }
    case "p": {
      const previousMonthButton = getElementsForKey("p");
      previousMonthButton?.click();
      break;
    }
    case "r": {
      const reviewTransactionsButton = getElementsForKey("r");
      reviewTransactionsButton?.click();
      break;
    }
    case "t": {
      const backToThisMonthButton = getElementsForKey("t");
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
    case "Escape": {
      seq.reset(); // Escape will reset our sequence
      const [clearFilterButton, closeModalButton] = getElementsForKey("Escape");
      clearFilterButton?.click();
      closeModalButton?.click();
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
});

console.log("🪄 MoneyMover intialized.");
