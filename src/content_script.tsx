import { getElementsForKey } from "@utils/getElementForKey";
import { initializeMessageListener } from "@messages/init";

initializeMessageListener();

document.addEventListener("keydown", function (event) {
  if (
    document.activeElement instanceof HTMLInputElement ||
    event.ctrlKey ||
    event.metaKey
  ) {
    return;
  }

  switch (event.key) {
    case "n": {
      const [nextMonthButton] = getElementsForKey("n");
      nextMonthButton?.click();
      break;
    }
    case "p": {
      const [previousMonthButton] = getElementsForKey("p");
      previousMonthButton?.click();
      break;
    }
    case "r": {
      const [reviewTransactionsButton] = getElementsForKey("r");
      reviewTransactionsButton?.click();
      break;
    }
    case "t": {
      const [backToThisMonthButton] = getElementsForKey("t");
      backToThisMonthButton?.click();
      break;
    }
    case "/": {
      event.preventDefault(); // Don't actually type this key
      const [quickFilterInput] = getElementsForKey("/");
      quickFilterInput?.focus();
      // TODO: Instead of returning as arrays, let's just strongly type our inputs and outputs
      (quickFilterInput as HTMLInputElement)?.select();
      break;
    }
    case "Escape": {
      const [clearFilterButton, closeModalButton] = getElementsForKey("/");
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
