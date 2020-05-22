import { Queue } from '../../../queue';

class Node {
  val: any;
  left: any;
  right: any;

  constructor(value: any) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  root: Node;

  constructor() {
    this.root = null;
  }

  public insert(val: any) {
    const newNode: Node = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let currentNode: Node = this.root;
    while (currentNode) {
      if (val === currentNode.val) {
        return null;
      }
      if (val > currentNode.val) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      } else if (!currentNode.left) {
        currentNode.left = newNode;
        return this;
      } else {
        currentNode = currentNode.left;
      }
    }
  }

  public find(val: any) {
    if (!this.root) {
      return false;
    }

    let currentNode: Node = this.root;
    while (currentNode) {
      if (currentNode.val === val) {
        return currentNode;
      }
      if (val > currentNode.val) {
        if (currentNode.right === null) {
          return null;
        }
        currentNode = currentNode.right;
      } else if (!currentNode.left) {
        return null;
      } else {
        currentNode = currentNode.left;
      }
    }
  }

  public breadthFirstSearch() {
    const queue: Queue = new Queue();
    queue.enqueue(this.root);

    const list: any[] = [];

    while (queue.size) {
      const node = queue.dequeue();
      list.push(node.val);

      if (node.left) {
        queue.enqueue(node.left);
      }
      if (node.right) {
        queue.enqueue(node.right);
      }
    }

    return list;
  }

  public depthFirstSearchPreOrder() {
    const arr = [];

    function traverse(node) {
      arr.push(node.val);

      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    }

    traverse(this.root);

    return arr;
  }

  public depthFirstSearchPostOrder() {
    const arr = [];

    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
      arr.push(node.val);
    }

    traverse(this.root);

    return arr;
  }

  public depthFirstSearchInOrder() {
    const arr = [];

    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }

      arr.push(node.val);

      if (node.right) {
        traverse(node.right);
      }
    }

    traverse(this.root);

    return arr;
  }
}
