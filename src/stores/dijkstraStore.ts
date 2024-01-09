import { DijkstraGenerator } from '@/helpers/algorithms/dijkstra'
import { GraphEdge, GraphNode } from 'reagraph'
import { create } from 'zustand'

interface DijkstraStore {
  nodes: GraphNode[]
  edges: GraphEdge[]
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
  source: '',
  target: '',
  isWorking: false,
  isFound: false,
  generator: null,

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
      const generator = DijkstraMinDistance(state.nodes, state.edges, +state.source, +state.target)

      return { isWorking: true, generator }
    }),

  nextStep: () =>
    set((state) => {
      if (!state.isWorking || !state.generator) {
        return {}
      }

      const { value, done } = state.generator.next()

      if (done) {
        return { isWorking: false, isSorted: true }
      }

      console.log({ value })

      return { isWorking: true }
    }),
  reset: () => set({ isWorking: false }),
  pause: () => set({ isWorking: false }),
}))

function* DijkstraMinDistance(nodes: GraphNode[], edges: GraphEdge[], source: number, target: number) {}
