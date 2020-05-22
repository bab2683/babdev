import { BinarySearchTree } from '../binary-search-tree.data-structure';

describe('Binary Search Tree', () => {
  let tree: BinarySearchTree;

  it('should have root set as null when initialised', () => {
    tree = new BinarySearchTree();

    expect(tree.root).toBeNull();
  });

  describe('insert', () => {
    beforeEach(() => {
      tree = new BinarySearchTree();
    });

    it('should insert first value as root', () => {
      tree.insert(24);

      expect(tree.root.val).toEqual(24);
    });

    it('should insert values in order', () => {
      tree.insert(24);
      tree.insert(22);
      tree.insert(34);

      expect(tree.root.val).toEqual(24);
      expect(tree.root.left.val).toEqual(22);
      expect(tree.root.right.val).toEqual(34);
    });

    it('should not add a value that already exists', () => {
      tree.insert(24);
      tree.insert(22);
      tree.insert(34);

      const result = tree.insert(22);

      expect(result).toEqual(null);
      expect(tree.breadthFirstSearch()).toEqual([24, 22, 34]);
    });
  });

  describe('find', () => {
    it('should return false if there is no values', () => {
      tree = new BinarySearchTree();
      const result = tree.find(100);

      expect(result).toEqual(false);
    });

    describe('values present', () => {
      beforeEach(() => {
        tree = new BinarySearchTree();
        tree.insert(24);
        tree.insert(22);
        tree.insert(34);
        tree.insert(23);
        tree.insert(19);
        tree.insert(55);
      });

      it('should find and return the node', () => {
        const result = tree.find(23);

        expect(result).toEqual({ val: 23, left: null, right: null });
      });

      it('should find and return the node', () => {
        const result = tree.find(55);

        expect(result).toEqual({ val: 55, left: null, right: null });
      });

      it('should return null', () => {
        const result = tree.find(68);

        expect(result).toEqual(null);
      });

      it('should return null', () => {
        const result = tree.find(2);

        expect(result).toEqual(null);
      });
    });
  });

  describe('tree traversal', () => {
    beforeEach(() => {
      tree = new BinarySearchTree();
      tree.insert(24);
      tree.insert(22);
      tree.insert(34);
      tree.insert(23);
      tree.insert(19);
      tree.insert(55);
    });

    it('should return all the nodes with breadthFirstSearch', () => {
      const result = tree.breadthFirstSearch();

      expect(result).toEqual([24, 22, 34, 19, 23, 55]);
    });

    it('should return all the nodes with depthFirstSearchPreOrder', () => {
      const result = tree.depthFirstSearchPreOrder();

      expect(result).toEqual([24, 22, 19, 23, 34, 55]);
    });

    it('should return all the nodes with depthFirstSearchPostOrder', () => {
      const result = tree.depthFirstSearchPostOrder();

      expect(result).toEqual([19, 23, 22, 55, 34, 24]);
    });

    it('should return all the nodes with depthFirstSearchInOrder', () => {
      const result = tree.depthFirstSearchInOrder();

      expect(result).toEqual([19, 22, 23, 24, 34, 55]);
    });
  });
});
