export class MaxBinaryHeap {
  public values: any[];
  constructor(data: any[] = []) {
    this.values = data;
  }

  public insert(value: any): void {
    this.values.push(value);
    const length = this.values.length;

    if (length > 1) {
      let index = length - 1;

      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);

        if (this.values[index] < this.values[parentIndex]) {
          break;
        }
        this.values[index] = this.values[parentIndex];
        this.values[parentIndex] = value;
        index = parentIndex;
      }
    }
  }

  public extractMax(): any {
    const max = this.values[0];
    this.values[0] = this.values[this.values.length - 1];
    this.values.pop();
    let index = 0;

    const replace = (value: any, initialIndex: number, targetIndex: number) => {
      this.values[targetIndex] = this.values[initialIndex];
      this.values[initialIndex] = value;
      return targetIndex;
    };

    while (true) {
      const leftIndex = index * 2 + 1;
      const rightIndex = leftIndex + 1;
      const current = this.values[index];

      if (this.values[rightIndex] !== undefined) {
        const right = this.values[rightIndex];
        const left = this.values[leftIndex];

        if (right > current && left > current) {
          if (right > left) {
            index = replace(right, index, rightIndex);
          } else {
            index = replace(left, index, leftIndex);
          }
        } else if (right > current) {
          index = replace(right, index, rightIndex);
        } else {
          index = replace(left, index, leftIndex);
        }
      } else if (this.values[leftIndex] !== undefined) {
        const left = this.values[leftIndex];
        if (left > current) {
          index = replace(left, index, leftIndex);
        }
      } else {
        return max;
      }
    }
  }
}
