export const runtime = {
  onMessage: {
    addListener: jest.fn(),
  },
};

export const tabs = {
  query: jest.fn(),
  update: jest.fn(),
};

export const storage = {
  sync: {
    get: jest.fn(),
    set: jest.fn(),
  },
};
