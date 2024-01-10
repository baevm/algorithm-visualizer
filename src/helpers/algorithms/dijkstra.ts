import { GraphEdge, GraphNode } from 'reagraph'

export class Dijkstra {
  private nodes: GraphNode[]
  private edges: GraphEdge[]
  private startNodeId: string
  private targetNodeId: string

  constructor(nodes: GraphNode[], edges: GraphEdge[], startNodeId: string, targetNodeId: string) {
    this.nodes = nodes
    this.edges = edges
    this.startNodeId = startNodeId
    this.targetNodeId = targetNodeId
  }

  public *FindDistances() {
    const distances: DistanceMap = {}
    const visited: Record<string, boolean> = {}

    this.nodes.forEach((node) => {
      distances[node.id] = Infinity
      visited[node.id] = false
    })

    distances[this.startNodeId] = 0

    while (true) {
      let minDistance = Infinity
      let currentId: string | null = null

      // Find the unvisited node with the smallest distance
      for (const node of this.nodes) {
        if (!visited[node.id] && distances[node.id] < minDistance) {
          minDistance = distances[node.id]
          currentId = node.id
        }
      }

      // All nodes visited
      if (currentId === null) {
        break
      }

      // Found the target node, stop the algorithm
      if (currentId === this.targetNodeId) {
        break
      }

      // Mark the current node as visited
      visited[currentId] = true

      // Update distances for neighboring nodes
      const neighbors = this.edges.filter((edge) => edge.source === currentId).map((edge) => edge.target)

      // Get visited nodes to display them in the graph visualization
      const actives = this.getActives(distances)
      yield { distances, currentId, actives, edges: this.edges }

      for (const neighborId of neighbors) {
        const edge = this.edges.find((e) => e.source === currentId && e.target === neighborId)

        if (edge && currentId) {
          const totalDistance = distances[currentId] + 1

          if (totalDistance < distances[neighborId]) {
            distances[neighborId] = totalDistance

            // Update the distance in the edges
            // to display it in the graph visualization
            const edgeIndex = this.edges.findIndex((e) => e.source === currentId && e.target === neighborId)
            this.edges[edgeIndex].label = `${totalDistance}`
          }
        }

        if (neighborId === this.targetNodeId) {
          const actives = this.getActives(distances)

          yield { distances, currentId, actives, edges: this.edges }

          return distances
        }
      }
    }

    return distances
  }

  private getActives(distances: DistanceMap) {
    return Object.entries(distances)
      .filter((item) => item[1] !== Infinity)
      .map((item) => item[0])
  }

  public static formatEdgesToText(edges: GraphEdge[]) {
    return edges.map((edge) => `${edge.source[2]}->${edge.target[2]}`).join('\n')
  }

  public static formatTextToEdges(text: string) {
    return text.split('\n').map((line) => {
      const [source, target] = line.split('->')

      const edge: GraphEdge = {
        id: `${source}->${target}`,
        source: `n-${source}`,
        target: `n-${target}`,
        label: '',
      }

      return edge
    })
  }

  public static getNodesFromEdges(edges: GraphEdge[]) {
    return edges.reduce((acc, edge) => {
      const node: GraphNode = {
        id: edge.source,
        label: edge.source[2],
      }

      if (!acc.find((n) => n.id === node.id)) {
        acc.push(node)
      }

      const node2: GraphNode = {
        id: edge.target,
        label: edge.target[2],
      }

      if (!acc.find((n) => n.id === node2.id)) {
        acc.push(node2)
      }

      return acc
    }, [] as GraphNode[])
  }
}

type DistanceMap = Record<string, number>

export type DijkstraGenerator = Generator<
  {
    distances: any
    actives: string[]
    edges: GraphEdge[]
  },
  any,
  unknown
>

export const defaultNodes: GraphNode[] = [
  {
    id: 'n-0',
    label: '0',
  },
  {
    id: 'n-1',
    label: '1',
  },
  {
    id: 'n-2',
    label: '2',
  },
  {
    id: 'n-3',
    label: '3',
  },
  {
    id: 'n-4',
    label: '4',
  },
  {
    id: 'n-5',
    label: '5',
  },
  {
    id: 'n-6',
    label: '6',
  },
  {
    id: 'n-7',
    label: '7',
  },
]

export const defaultEdges: GraphEdge[] = [
  {
    id: '0->1',
    source: 'n-0',
    target: 'n-1',
    label: '',
  },
  {
    id: '0->2',
    source: 'n-0',
    target: 'n-2',
    label: '',
  },
  {
    id: '0->3',
    source: 'n-0',
    target: 'n-3',
    label: '',
  },
  {
    id: '0->4',
    source: 'n-0',
    target: 'n-4',
    label: '',
  },
  {
    id: '3->2',
    source: 'n-3',
    target: 'n-2',
    label: '',
  },
  {
    id: '2->5',
    source: 'n-2',
    target: 'n-5',
    label: '',
  },
  {
    id: '5->6',
    source: 'n-5',
    target: 'n-6',
    label: '',
  },
  {
    id: '3->6',
    source: 'n-3',
    target: 'n-6',
    label: '',
  },
  {
    id: '5->7',
    source: 'n-5',
    target: 'n-7',
    label: '',
  },
]
