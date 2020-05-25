class Node {
  public val: any;
  public next: Node;

  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

export class SinglyLinkedList {
  public head: Node;
  public tail: Node;
  public length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /* Adds new node at the end of the list */
  public push(val: any): SinglyLinkedList {
    const node: Node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  /* Removes last node from list */
  public pop(): Node {
    if (!this.tail) {
      return;
    }
    const currentTail: Node = this.tail;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    } else {
      let temp: Node = this.head;
      while (temp.next !== this.tail) {
        temp = temp.next;
      }
      this.tail = temp;
      this.tail.next = null;
    }
    return currentTail;
  }

  /* Assigns new head to second node */
  public shift(): Node {
    if (!this.head) {
      return;
    }
    const currentHead: Node = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }

  /* Adds new node as head */
  public unshift(val: any): SinglyLinkedList {
    const newHead: Node = new Node(val);
    if (!this.head) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      newHead.next = this.head;
      this.head = newHead;
    }
    this.length++;
    return this;
  }

  /* Retrieves node by it's position */
  public get(index: number): Node {
    if (index < 0 || index >= this.length) {
      return null;
    }
    return this.returnNodeAtIndex(index);
  }

  /* Sets new value to node given an index */
  public set(val: any, index: number): boolean {
    const selectedNode: Node = this.get(index);
    if (selectedNode) {
      selectedNode.val = val;
      return true;
    }
    return false;
  }

  /* Adds new node in a given position */
  public insert(index: number, val: any): boolean {
    if (index < 0 || index > this.length) {
      return false;
    } else if (index === this.length) {
      this.push(val);
    } else if (index === 0) {
      this.unshift(val);
    } else {
      const newNode: Node = new Node(val);
      const previousNode: Node = this.get(index - 1);
      newNode.next = previousNode.next;
      previousNode.next = newNode;
      this.length++;
    }
    return true;
  }

  /* Remove node at index */
  public remove(index: number): any {
    if (index < 0 || index > this.length) {
      return undefined;
    } else if (index === this.length) {
      return this.pop().val;
    } else if (index === 0) {
      return this.shift().val;
    } else {
      const node = this.get(index - 1);
      const tempVal = node.next.val;
      node.next = node.next.next;
      this.length--;
      return tempVal;
    }
  }

  public reverse(): SinglyLinkedList {
    let currentNode: Node = this.head;
    this.head = this.tail;
    this.tail = currentNode;

    let nextNode: Node;
    let prevNode: Node = null;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }

    return this;
  }

  private returnNodeAtIndex(index: number): Node {
    let counter: number = 0;
    let currentNode: Node = this.head;
    while (counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }
}
