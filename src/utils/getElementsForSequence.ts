import { query } from "@utils/getElementForKey";

type Sequence = "gb" | "gt";
type ElementsForSequence = {
  [K in Sequence]: HTMLElement | null;
};

export function getElementsForSequence(key: "gb"): HTMLElement | null;
export function getElementsForSequence(key: "gt"): HTMLElement | null;

export function getElementsForSequence(
  sequence: Sequence
): ElementsForSequence[Sequence] {
  switch (sequence) {
    case "gb": {
      const budgetLink = query(`a[href="/budget"]`);
      return budgetLink;
    }
    case "gt": {
      const transactionsLink = query(`a[href="/transactions"]`);
      return transactionsLink;
    }
  }
  return null;
}
