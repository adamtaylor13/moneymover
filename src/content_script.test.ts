import * as mod from "@utils/getElementForKey";
import { keyDownEventListener } from "./content_script";
import { Sequencer } from "@utils/Sequencer";

let getElementsForKeySpy = jest.fn();
beforeAll(() => {
  jest.spyOn(mod, "getElementsForKey").mockImplementation(getElementsForKeySpy);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("content_script", function () {
  // Set up our mocks and stubs

  describe("One-Shot Keybindings", function () {
    it("should call getElementsForKey with the correct key", () => {
      // Trigger the keydown event
      const seq = Sequencer();
      const event = { key: "n" } as KeyboardEvent;
      keyDownEventListener(seq)(event);

      // Check if getElementsForKey was called with the correct key
      expect(getElementsForKeySpy).toHaveBeenCalledWith("n");
    });
  });

  describe("Sequential Keybindings", function () {
    it("should call handleSequence if sequential keybinding is called", () => {
      const seq = Sequencer();
      const handleSequenceSpy = jest.spyOn(seq, "handleSequence");

      // Init sequential keybinding
      let event = { key: "g" } as KeyboardEvent;
      keyDownEventListener(seq)(event);
      expect(handleSequenceSpy).not.toHaveBeenCalled();

      // Finalize sequential keybinding
      event = { key: "b" } as KeyboardEvent;
      keyDownEventListener(seq)(event);

      expect(handleSequenceSpy).toHaveBeenCalled();
    });

    it("should cancel sequential keybinding if incorrect binding entered", () => {
      const seq = Sequencer();
      const handleSequenceSpy = jest.spyOn(seq, "handleSequence");
      const resetSpy = jest.spyOn(seq, "reset");

      let event = { key: "\\" } as KeyboardEvent;
      keyDownEventListener(seq)(event);
      expect(resetSpy).toHaveBeenCalled();
      event = { key: "-" } as KeyboardEvent;
      keyDownEventListener(seq)(event);
      expect(resetSpy).toHaveBeenCalled();

      expect(handleSequenceSpy).not.toHaveBeenCalled();
    });
  });
});
