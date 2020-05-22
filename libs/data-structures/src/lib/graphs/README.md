# Graphs

A graph is a collection of nodes and connections between those nodes

## Usages
- Social networks
- Location / Mapping
- Routing algorithms
- Visual hierarchy
- Recommendation engines
- File system optimizations

## Terminology
- Vertex = a node
- Edge = connection between nodes
- Undirected = connection work two ways (For example in facebook, you see your friend's content and at the same time your friend can see your content)	
- Directed = usually represented with arrows, the connections are assigned a direction (For example instagram, you can follow someone to his content but he cannot see your content until he follows you)
- Weighted = when you assing value to the edges
- Unweighted = when edges has no values of their own

## Storing

### Adjacency list
Pros:
- Can take up less space (in sparse graphs)
- Faster to iterate over all edges

Cons:
- Can be slower to lookup specific edge

### Adjacency matrix
Pros:
- Faster to lookup specific edge

Const:
- Takes up more space (in sparse graphs)
- Slower to iterate over all edges


## Grapsh traversal usages
- Peer to peer networking
- Web crawlers
- Finding "closest" (matches / recommendations)
- Shortest path problems:
  - GPS navigation
  - Solving mazes
  - AI (shortest path to win the game)
