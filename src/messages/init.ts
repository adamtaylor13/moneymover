import { Message } from "@messages/types";
import { highlightElement, unhighlightElement } from "@messages/messageActions";
import { getElementsForUnknownKey } from "@utils/getElementForKey";

export function initializeMessageListener() {
  chrome.runtime.onMessage.addListener(function (msg: Message) {
    switch (msg.topic) {
      case "HIGHLIGHT_ELEMENT":
        highlightElement(msg.payload.key);
        break;
      case "UNHIGHLIGHT_ELEMENT":
        unhighlightElement(msg.payload.key);
        break;
      case "CLICK_ELEMENT":
        const elements = getElementsForUnknownKey(msg.payload.key);
        // It could lead to strange behavior if we click on multiple elements
        // so we'll only click if there's exactly one element.
        if (Array.isArray(elements) && elements.filter(Boolean).length === 1) {
          elements[0]?.click();
        }
        break;
      default:
        ((x: never) => {
          throw new Error(`${JSON.stringify(x)} was unhandled msg topic!`);
        })(msg);
    }
    return true;
  });
}
