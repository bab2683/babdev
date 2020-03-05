# Array

An Array is a collection of items (preferrable of the same type) stored at contiguois memory locations.

Each item stored in an array is called an **element**. Each location of an _element_ in an array has a numerical **index**.

## Time complexity

| Operation | Average Case | Worst case |
| --------- | :----------: | :--------: |
| Read      |     O(1)     |    O(1)    |
| Insert    |     O(n)     |    O(n)    |
| Delete    |     O(n)     |    O(n)    |
| Search    |     O(n)     |    O(n)    |

## Advantages
- Reading an element is simple and efficitient. This is because the elemnt can be instantly read using its index.
- Array is the foundation of other data structures (LinkedList, Stack, Queue, etc).
- All elements can be accessed using a single name and an index, which is readable, user-friendly.

## Disadvantages
- Elements of an array are stored in consecutive memory locations, so insertions and deletions are time consuming. 

## Common operations:

```typescript
// Check if variable is array
Array.isArray(myArray); // true/false

// Map: returns a new array starting from another one
const myArray = [2, 4];
const mySecondArray = myArray.map(val => val * 2); // [4, 8]

// Reduce: returns whatever you want starting from an Array
const myArray = [2, 4];
const atLeastOneHigherThan3 = myArray.reduce(
  (result, currentItem) => currentItem > 3,
  false
); // true
const atLeastOneHigherThan5 = myArray.reduce(
  (result, currentItem) => currentItem > 5,
  false
); // false
```