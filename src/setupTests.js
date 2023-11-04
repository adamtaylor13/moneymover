global.chrome = {
  runtime: {
    // @ts-ignore: We're just testing
    onMessage: {
      addListener: jest.fn(),
    },
  },
};

global.document = {
  addEventListener: jest.fn(),
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(),
};

// This just fixes reference errors since we're not running in a browser
global.HTMLElement = () => {};
global.HTMLInputElement = () => {};
