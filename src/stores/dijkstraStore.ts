import { Dijkstra, DijkstraGenerator } from '@/helpers/algorithms/dijkstra'
import { GraphEdge, GraphNode } from 'reagraph'
import { create } from 'zustand'

interface DijkstraStore {
  nodes: GraphNode[]
  edges: GraphEdge[]
  actives: any[]
  source: string
  target: string

  isWorking: boolean
  isFound: boolean
  generator: DijkstraGenerator | null

  setNodes(nodes: GraphNode[]): void
  setEdges(edges: GraphEdge[]): void
  setSource(source: string): void
  setTarget(target: string): void

  startWorking(): void
  nextStep(): void
  reset(): void
  pause(): void
}

export const useDijkstraStore = create<DijkstraStore>((set) => ({
  nodes: [],
  edges: [],
  source: 'n-0',
  target: 'n-6',
  isWorking: false,
  isFound: false,
  generator: null,
  actives: [],

  setNodes: (nodes) =>
    set(() => {
      return { nodes }
    }),
  setEdges: (edges) =>
    set(() => {
      return { edges }
    }),
  setSource: (source) => set({ source }),
  setTarget: (target) => set({ target }),

  startWorking: () =>
    set((state) => {
      const dijsktraCl = new Dijkstra(state.nodes, state.edges, state.source, state.target)
      const generator = dijsktraCl.FindDistances()

      return { isWorking: true, generator }
    }),

  nextStep: () =>
    set((state) => {
      if (!state.isWorking || !state.generator) {
        return {}
      }

      const { value, done } = state.generator.next()

      if (done) {
        return { isWorking: false, isFound: true }
      }

      console.log({ value })

      return { isWorking: true, actives: value.actives, edges: value.edges }
    }),

  reset: () =>
    set((state) => {
      const edgesWithoutLabels = state.edges.map((edge) => ({ ...edge, label: '' }))

      return { isWorking: false, isFound: false, actives: [], edges: edgesWithoutLabels }
    }),

  pause: () => set({ isWorking: false }),
}))
