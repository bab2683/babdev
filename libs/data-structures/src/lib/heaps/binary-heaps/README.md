# Binary Heap

Rules:

- Each parent has max 2 nodes
- In the case of MaxBinaryHeap each parent is greater than its children
- A binary heap is as compact as possible and left children are filled out first
- There is no relationship between siblings apart from the fact that they are both less than the parent

## Usages:

- Priority queues
- Graph traversal

## Big O

| Operation | Time     |
| --------- | -------- |
| Insertion | O(log N) |
| Deletion  | O(log N) |
| Searching | O(n)     |
