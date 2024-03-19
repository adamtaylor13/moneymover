import { getElementsForSequence } from "@utils/getElementsForSequence";
import { TransactionTable } from "@TransactionTable";

export function Sequencer() {
  let sequence = "";
  const validSequences = ["gb", "gt", "gg"];
  return {
    add: function (key: string) {
      sequence += key;
      if (!this.isBuildingValidSequence()) {
        this.reset();
      }
      return sequence;
    },
    reset: () => {
      sequence = "";
    },
    isBuildingValidSequence: () => {
      return (
        sequence.length > 0 &&
        validSequences.some((seq) => seq.startsWith(sequence))
      );
    },
    hasCompletedSequence: () => {
      return validSequences.includes(sequence);
    },
    handleSequence: function () {
      switch (sequence) {
        case "gb": {
          const budgetLink = getElementsForSequence("gb");
          budgetLink?.click();
          break;
        }
        case "gt": {
          const budgetLink = getElementsForSequence("gt");
          budgetLink?.click();
          break;
        }
        case "gg": {
          TransactionTable.getFirstNonPendingRow();
          break;
        }
      }
      this.reset();
    },
  };
}
