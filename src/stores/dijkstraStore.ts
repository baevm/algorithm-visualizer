import { create } from 'zustand'

type GNode = {
  id: string
  label: string
}

type GEdge = {
  id: string
  source: string
  target: string
  label: string
}

interface DijkstraStore {
  nodes: GNode[]
  edges: GEdge[]
  source: string
  target: string

  isWorking: boolean
  isFound: boolean

  setNodes(nodes: GNode[]): void
  setEdges(edges: GEdge[]): void
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

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSource: (source) => set({ source }),
  setTarget: (target) => set({ target }),

  startWorking: () => set({ isWorking: true }),
  nextStep: () => set({ isWorking: true }),
  reset: () => set({ isWorking: false }),
  pause: () => set({ isWorking: false }),
}))
