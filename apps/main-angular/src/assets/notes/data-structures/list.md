# Linked list

A linked list is a data structure that contains a **head**, **tail** and **length**.
Linked list is a sequence made up of nodes, and each **node** has a **value** and a **pointer** to another node or `null`.

## Reccommended for

Cases in which insertion and deletions are frequent. For when you have really long datasets and you just need to store it without randomly accessing it.

## Comparisons with Array

- Do not have indexes.
- Connected via nodes with a **next** pointer.
- Random access is not allowed.
- Good at insertion and deletion, opposite to Arrays which can be expensive.

## Code

```typescript
// A List is a sequence of nodes so we need to define what a node is
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /* Adds new node at the end of the list */
  push(val): SinglyLinkedList {
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
  pop(): Node {
    if (!this.tail) return;

    let temp: Node = this.head;
    while (temp.next !== this.tail) {
      temp = temp.next;
    }
    const currentTail = this.tail;
    this.tail = temp;
    this.tail.next = null;

    return currentTail;
  }
}
```
