import { MaxBinaryHeap } from '../max-binary-heap.data-structure';

describe('MaxBinaryHeap', () => {
  let heap: MaxBinaryHeap;

  describe('insert', () => {
    beforeEach(() => {
      heap = new MaxBinaryHeap([41, 39, 33, 18, 27, 12]);
    });

    it('should insert 55 and place it as first element', () => {
      heap.insert(55);

      expect(heap.values[0]).toEqual(55);
      expect(heap.values).toMatchSnapshot();
    });
  });

  describe('extractMax', () => {
    it('should return 41 and place the new max as 39', () => {
      heap = new MaxBinaryHeap([41, 39, 33, 18, 27, 12]);
      const result = heap.extractMax();

      expect(result).toEqual(41);
      expect(heap.values[0]).toEqual(39);
      expect(heap.values).toMatchSnapshot();
    });

    it('should return 87 and place the new max as 84', () => {
      heap = new MaxBinaryHeap();
      heap.insert(24);
      heap.insert(35);
      heap.insert(87);
      heap.insert(15);
      heap.insert(23);
      heap.insert(84);
      heap.insert(1);

      const result = heap.extractMax();

      expect(result).toEqual(87);
      expect(heap.values[0]).toEqual(84);
      expect(heap.values).toMatchSnapshot();
    });

    it('should return 35 and place the new max as 24', () => {
      heap = new MaxBinaryHeap();
      heap.insert(15);
      heap.insert(35);
      heap.insert(24);
      heap.insert(19);
      heap.insert(1);
      heap.insert(20);

      const result = heap.extractMax();

      expect(result).toEqual(35);
      expect(heap.values[0]).toEqual(24);
      expect(heap.values).toMatchSnapshot();
    });

    it('should return 87 and place the new max as 84', () => {
      heap = new MaxBinaryHeap();
      heap.insert(15);
      heap.insert(49);
      heap.insert(24);
      heap.insert(19);
      heap.insert(1);
      heap.insert(20);
      heap.insert(13);
      heap.insert(21);

      const result = heap.extractMax();

      expect(result).toEqual(49);
      expect(heap.values[0]).toEqual(24);
      expect(heap.values).toMatchSnapshot();
    });
  });
});
