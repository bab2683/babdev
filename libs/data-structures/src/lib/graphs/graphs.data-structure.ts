export class Graph {
  public adjacencyList: { [key: string]: string[] };

  constructor() {
    this.adjacencyList = {};
  }

  public addVertex(name: string): void {
    if (!this.adjacencyList.hasOwnProperty(name)) {
      this.adjacencyList[name] = [];
    }
  }

  public addEdge(firstVertex: string, secondVertex: string): void {
    if (this.areVertexesPresent(firstVertex, secondVertex)) {
      this.adjacencyList[firstVertex].push(secondVertex);
      this.adjacencyList[secondVertex].push(firstVertex);
    }
  }

  public removeEdge(firstVertex: string, secondVertex: string): void {
    if (this.areVertexesPresent(firstVertex, secondVertex)) {
      this.adjacencyList[firstVertex] = this.adjacencyList[firstVertex].filter(
        (vertex) => vertex !== secondVertex
      );
      this.adjacencyList[secondVertex] = this.adjacencyList[
        secondVertex
      ].filter((vertex) => vertex !== firstVertex);
    }
  }

  public removeVertex(name: string): void {
    const vertex: string[] = this.adjacencyList[name];

    if (vertex) {
      vertex.forEach((edge) => {
        this.removeEdge(name, edge);
      });

      delete this.adjacencyList[name];
    }
  }

  private areVertexesPresent(
    firstVertex: string,
    secondVertex: string
  ): boolean {
    return (
      this.adjacencyList.hasOwnProperty(firstVertex) &&
      this.adjacencyList.hasOwnProperty(secondVertex)
    );
  }
}
