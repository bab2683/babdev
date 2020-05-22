import { Queue } from '../queue.data-structure';

describe('queue', () => {
  let queue: Queue;

  it('should have size 0 when created', () => {
    queue = new Queue();

    expect(queue.size).toEqual(0);
  });

  beforeEach(() => {
    queue = new Queue();
  });

  it('should save one value', () => {
    queue.enqueue(10);

    expect(queue.size).toEqual(1);
  });

  it('should return the first value on the queue', () => {
    queue.enqueue(10);
    queue.enqueue(14);

    const result = queue.dequeue();

    expect(queue.size).toEqual(1);
    expect(result).toEqual(10);
  });
});
