import { Node } from '../node.data-structure';
import { SinglyLinkedList } from '../singly-linked-list.data-structure';

describe('SinglyLinkedList', () => {
  let list: SinglyLinkedList;

  it('should have length 0 when created', () => {
    list = new SinglyLinkedList();

    expect(list.length).toEqual(0);
    expect(list.head).toEqual(null);
    expect(list.tail).toEqual(null);
  });

  describe('push', () => {
    beforeAll(() => {
      list = new SinglyLinkedList();
    });

    it('should have the same tail and a head when first pushing', () => {
      const result: SinglyLinkedList = list.push(8);

      expect(list.length).toEqual(1);
      expect(list.tail.val).toEqual(8);
      expect(list.head.val).toEqual(8);
      expect(list.tail.next).toEqual(null);
      expect(result).toEqual(list);
    });

    it('should have head.next equals to the tail on second push', () => {
      list.push(42);

      expect(list.length).toEqual(2);
      expect(list.head.next).toEqual(list.tail);
    });
  });

  describe('pop', () => {
    beforeEach(() => {
      list = new SinglyLinkedList();
    });

    it('should return undefined if no tail is present', () => {
      expect(list.pop()).toEqual(undefined);
    });

    it('should remove last node', () => {
      list.push(42);
      list.push(13);
      list.push(52);

      expect(list.length).toEqual(3);

      const result: Node = list.pop();

      expect(list.length).toEqual(2);
      expect(result.val).toEqual(52);
      expect(list.tail.val).toEqual(13);
      expect(list.tail.next).toEqual(null);
    });

    it('should reset head and tail when popping last node', () => {
      list.push(45);

      const result: Node = list.pop();

      expect(result.val).toEqual(45);
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });
  });

  describe('shift', () => {
    beforeEach(() => {
      list = new SinglyLinkedList();
    });

    it('should return undefined if no head is present', () => {
      expect(list.shift()).toEqual(undefined);
    });

    it('should reassign head to the second node', () => {
      list.push(42);
      list.push(13);

      const result: Node = list.shift();

      expect(list.length).toEqual(1);
      expect(result.val).toEqual(42);
      expect(list.head.val).toEqual(13);
    });

    it('should reset head and tail when shifting last node', () => {
      list.push(2);

      const result: Node = list.shift();

      expect(list.length).toEqual(0);
      expect(result.val).toEqual(2);
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });
  });

  describe('unshift', () => {
    beforeAll(() => {
      list = new SinglyLinkedList();
    });

    it('should have the same tail and a head when first unshifting', () => {
      const result: SinglyLinkedList = list.unshift(13);

      expect(list.length).toEqual(1);
      expect(list.tail.val).toEqual(13);
      expect(list.head.val).toEqual(13);
      expect(list.tail.next).toEqual(null);
      expect(result).toEqual(list);
    });

    it('should have 46 as new head', () => {
      const result: SinglyLinkedList = list.unshift(46);

      expect(list.length).toEqual(2);
      expect(list.head.val).toEqual(46);
      expect(list.head.next.val).toEqual(13);
      expect(result).toEqual(list);
    });
  });

  describe('get', () => {
    beforeAll(() => {
      list = new SinglyLinkedList();
      list.push(42);
      list.push(13);
      list.push(52);
    });

    it('should return null if index is less than 0', () => {
      const result: Node = list.get(-2);

      expect(result).toEqual(null);
    });

    it('should return null if index is equal or higher than the length of the list', () => {
      const result: Node = list.get(4);

      expect(result).toEqual(null);
    });

    it('should return second node', () => {
      const result: Node = list.get(1);

      expect(result.val).toEqual(13);
    });
  });

  describe('set', () => {
    beforeAll(() => {
      list = new SinglyLinkedList();
      list.push(42);
      list.push(13);
      list.push(52);
    });

    it('should return false if index is less than 0', () => {
      const result: boolean = list.set('test', -2);

      expect(result).toEqual(false);
    });

    it('should return false if index is equal or higher than the length of the list', () => {
      const result: boolean = list.set('test', 4);

      expect(result).toEqual(false);
    });

    it('should return second node', () => {
      expect(list).toMatchSnapshot();

      const result: boolean = list.set('test', 1);

      expect(result).toEqual(true);
      expect(list).toMatchSnapshot();
    });
  });

  describe('insert', () => {
    beforeEach(() => {
      list = new SinglyLinkedList();
      list.push(42);
      list.push(13);
      list.push(52);
    });

    it('should return false', () => {
      const result: boolean = list.insert(-2, 'bla');

      expect(result).toEqual(false);
    });

    it('should use the push method', () => {
      jest.spyOn(list, 'push');

      const result: boolean = list.insert(3, 34);

      expect(result).toEqual(true);
      expect(list.push).toHaveBeenCalledWith(34);
    });

    it('should use the unshift method', () => {
      jest.spyOn(list, 'unshift');

      const result: boolean = list.insert(0, 69);

      expect(result).toEqual(true);
      expect(list.unshift).toHaveBeenCalledWith(69);
    });

    it('should insert new node in second position', () => {
      expect(list).toMatchSnapshot();

      const result: boolean = list.insert(2, 34);

      expect(result).toEqual(true);
      expect(list).toMatchSnapshot();

      const secondNode: Node = list.get(2);

      expect(secondNode.val).toEqual(34);
      expect(secondNode.next.val).toEqual(52);
    });
  });
});
