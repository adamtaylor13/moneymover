import { getElementsForKey } from "@utils/getElementForKey";

describe("content_script", function () {
  // Set up our mocks and stubs
  beforeAll(() => {
    jest.spyOn(getElementsForKey, 'getElementsForKey');
  });
  describe("One-Shot Keybindings", function () {
    it('should call getElementsForKey with the correct key', () => {
      // Trigger the keydown event
      const event = new KeyboardEvent('keydown', {key: 'n'});
      document.dispatchEvent(event);

      // Check if getElementsForKey was called with the correct key
      expect(getElementsForKey).toHaveBeenCalledWith('n');
    });
  });
});
