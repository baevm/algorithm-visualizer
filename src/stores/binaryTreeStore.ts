import { create } from 'zustand'

export type TreeAlgorithmType = 'bfs' | 'dfs'
export type DFSTechnique = 'preorder' | 'inorder' | 'postorder'

type BinaryTreeAlgortihm = {
  type: TreeAlgorithmType
  technique: DFSTechnique
}

interface BinaryTreeStore {
  array: (string | 'null')[]
  target: string | null
  isWorking: boolean
  isFound: boolean
  algorithm: BinaryTreeAlgortihm

  setArray: (searchArray: string[]) => void
  setTarget: (target: string) => void
  setIsWorking: () => void
  nextStep: () => void
  reset: () => void
  setAlgorithm: (algorithm: BinaryTreeAlgortihm) => void
}

export const useBinaryTree = create<BinaryTreeStore>((set) => ({
  array: [],
  target: null,
  isWorking: false,
  isFound: false,
  algorithm: {
    type: 'bfs',
    technique: 'preorder',
  },

  setArray: (array) => set({ array }),
  setTarget: (target) => set({ target }),
  setIsWorking: () => set((state) => ({ isWorking: !state.isWorking })),
  setAlgorithm: (algorithm) => set({ algorithm }),

  nextStep: () =>
    set((state) => {
      return {}
    }),

  reset: () => set({ array: [], target: null, isWorking: false, isFound: false }),
}))
