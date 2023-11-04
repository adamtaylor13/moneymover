global.chrome = {
  runtime: {
    // @ts-ignore: We're just testing
    onMessage: {
      addListener: jest.fn(),
    },
  },
};

global.document = {};
