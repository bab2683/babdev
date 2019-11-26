export const htmlTag = {
  appendChild: jest.fn(),
  blur: jest.fn(),
  classList: {
    add: jest.fn()
  },
  innerHTML: '',
  innerText: '',
  querySelector: jest.fn().mockImplementation(() => htmlTag)
};
