import { Graph } from '../graphs.data-structure';

describe('Graphs', () => {
  let g: Graph;

  it('should be defined', () => {
    g = new Graph();

    expect(g).toBeDefined();
  });

  describe('addVertex', () => {
    beforeEach(() => {
      g = new Graph();
    });

    it('should add a new vertex', () => {
      g.addVertex('Rome');

      expect(g.adjacencyList).toHaveProperty('Rome');
      expect(g.adjacencyList['Rome']).toEqual([]);
    });

    it('should not add a new vertex if vertex exist', () => {
      g.addVertex('Rome');
      g.addVertex('Milan');

      g.addEdge('Rome', 'Milan');

      g.addVertex('Rome');

      expect(g.adjacencyList).toHaveProperty('Rome');
      expect(g.adjacencyList['Rome']).toEqual(['Milan']);
    });
  });

  describe('addEdge', () => {
    beforeEach(() => {
      g = new Graph();
    });

    it('should not add a new edge if a vertex is missing', () => {
      g.addVertex('Rome');

      g.addEdge('Rome', 'Milan');

      expect(g.adjacencyList['Rome']).toEqual([]);
    });

    it('should add a new edge', () => {
      g.addVertex('Rome');
      g.addVertex('Milan');

      g.addEdge('Rome', 'Milan');

      expect(g.adjacencyList['Rome']).toEqual(['Milan']);
      expect(g.adjacencyList['Milan']).toEqual(['Rome']);
    });
  });

  describe('removeEdge', () => {
    beforeEach(() => {
      g = new Graph();
    });

    it('should not remove edge if a vertex is missing', () => {
      g.addVertex('Rome');

      g.removeEdge('Rome', 'Milan');

      expect(g.adjacencyList['Rome']).toEqual([]);
    });

    it('should remove edge', () => {
      g.addVertex('Rome');
      g.addVertex('Milan');
      g.addEdge('Rome', 'Milan');

      expect(g.adjacencyList['Rome']).toEqual(['Milan']);
      expect(g.adjacencyList['Milan']).toEqual(['Rome']);

      g.removeEdge('Rome', 'Milan');

      expect(g.adjacencyList['Rome']).toEqual([]);
      expect(g.adjacencyList['Milan']).toEqual([]);
    });
  });

  describe('removeVertex', () => {
    beforeEach(() => {
      g = new Graph();
    });

    it('should not remove vertex if missing', () => {
      g.addVertex('Rome');

      g.removeVertex('Milan');

      expect(g.adjacencyList['Rome']).toEqual([]);
    });

    it('should remove vertex', () => {
      g.addVertex('Rome');

      expect(g.adjacencyList['Rome']).toEqual([]);

      g.removeVertex('Rome');

      expect(g.adjacencyList.hasOwnProperty('Rome')).toEqual(false);
    });

    it('should remove vertex and all its references', () => {
      g.addVertex('Rome');
      g.addVertex('Milan');
      g.addEdge('Rome', 'Milan');

      expect(g.adjacencyList['Milan']).toEqual(['Rome']);

      g.removeVertex('Rome');

      expect(g.adjacencyList.hasOwnProperty('Rome')).toEqual(false);
      expect(g.adjacencyList['Milan']).toEqual([]);
    });
  });
});
