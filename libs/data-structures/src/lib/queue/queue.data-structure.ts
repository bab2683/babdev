import { SinglyLinkedList } from '../list/singly-linked-list.data-structure';

export class Queue {
  list: SinglyLinkedList;

  constructor() {
    this.list = new SinglyLinkedList();
  }

  public enqueue(val: any) {
    this.list.push(val);
  }

  public dequeue(): any {
    return this.list.shift().val;
  }

  public get size(): number {
    return this.list.length;
  }
}
