import { Stack } from '../stack.data-structure';

describe('Stack', () => {
  let stack: Stack;

  it('should have size 0 when created', () => {
    stack = new Stack();

    expect(stack.length).toEqual(0);
  });

  beforeEach(() => {
    stack = new Stack();
  });

  it('should save one value', () => {
    stack.add(10);

    expect(stack.length).toEqual(1);
  });

  it('should return the last value on the stack', () => {
    stack.add(10);
    stack.add(14);

    const result = stack.remove();

    expect(stack.length).toEqual(1);
    expect(result).toEqual(14);
  });
});
