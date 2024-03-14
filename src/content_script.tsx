import { getElementsForKey } from "@utils/getElementForKey";
import { initializeMessageListener } from "@messages/init";
import { Sequencer } from "@utils/Sequencer";
import "@styles/keyboard-shortcuts.css"

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
        const jButton = getElementsForKey("j");
        //don't click as j is used to change selection
        break;
      }
      case "k": {
        const kButton = getElementsForKey("k");
        //don't click as k is used to change selection
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
      case "Enter": {
        const EnterButton = getElementsForKey("Enter");
        EnterButton?.click();
        break;
      }
      case "Escape": {
        seq.reset(); // Escape will reset our sequence
        const [clearFilterButton, closeModalButton] =
          getElementsForKey("Escape");
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
  };

const sequencer = Sequencer();
document.addEventListener("keydown", keyDownEventListener(sequencer));
console.log("🪄 MoneyMover intialized.");
