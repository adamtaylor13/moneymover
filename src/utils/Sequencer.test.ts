import { Sequencer } from "./Sequencer";

describe("Sequencer", function () {
  describe("isBuildingValidSequence", function () {
    it("should return true until a valid sequence is not sent", function () {
      let sequencer = Sequencer();
      sequencer.add("g");
      expect(sequencer.isBuildingValidSequence()).toEqual(true);
      sequencer.add("t");
      expect(sequencer.isBuildingValidSequence()).toEqual(true);
      sequencer.add("q");
      expect(sequencer.isBuildingValidSequence()).toEqual(false);
    });

    it("should allow one-shot keybindings to run", function () {
      let sequencer = Sequencer();
      sequencer.add("Tab");
      expect(sequencer.isBuildingValidSequence()).toEqual(false);
    });
  });

  describe("hasCompletedSequence", function () {
    it("should return false until a valid sequence is complete", function () {
      let sequencer = Sequencer();
      sequencer.add("g");
      expect(sequencer.hasCompletedSequence()).toEqual(false);
      sequencer.add("b");
      expect(sequencer.hasCompletedSequence()).toEqual(true);
    });
  });
});
