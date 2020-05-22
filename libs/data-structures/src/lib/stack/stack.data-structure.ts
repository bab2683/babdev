import { SinglyLinkedList } from '../list/singly-linked-list.data-structure';

export class Stack {
  private list: SinglyLinkedList;

  constructor() {
    this.list = new SinglyLinkedList();
  }

  public add(val: any) {
    this.list.unshift(val);
  }

  public remove(): any {
    return this.list.shift().val;
  }

  public get length(): number {
    return this.list.length;
  }
}
