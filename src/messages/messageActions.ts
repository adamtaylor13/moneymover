import { getElementsForKey } from "@utils/getElementForKey";

export function highlightElement(key: string) {
  const elements = getElementsForKey(key);
  for (const element of elements) {
    element?.style.setProperty(
      "box-shadow",
      "0px 0px 4px 4px #fbb700",
      "important"
    );
    element?.style.setProperty("border-radius", "10px");
  }
}

export function unhighlightElement(key: string) {
  const elements = getElementsForKey(key);
  for (const element of elements) {
    element?.style.removeProperty("box-shadow");
    element?.style.removeProperty("border-radius");
  }
}
