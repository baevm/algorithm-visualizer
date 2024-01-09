import { BinaryTree, BinaryTreeAlgortihm, TreeGenerator } from '@/helpers/algorithms/binaryTree'
import { create } from 'zustand'

interface BinaryTreeStore {
  array: (string | 'null')[]
  target: string | null
  isWorking: boolean
  isFound: boolean
  algorithm: BinaryTreeAlgortihm
  generator: TreeGenerator | null
  currentNode: string | null

  setArray: (searchArray: string[]) => void
  setTarget: (target: string) => void
  startWorking: () => void
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
  generator: null,
  currentNode: null,

  setArray: (array) => set({ array }),
  setTarget: (target) => set({ target }),
  setAlgorithm: (algorithm) => set({ algorithm }),

  startWorking: () =>
    set((state) => {
      // Если генератор не равен null, то значит
      // пользователь поставил на паузу сортировку и хочет продолжить
      if (state.generator != null) {
        return { isWorking: true }
      }

      const binaryTreer = new BinaryTree(state.algorithm, state.array, state.target)
      const generator = binaryTreer.makeGenerator()

      return { isWorking: !state.isWorking, generator }
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

      return { currentNode: value.target }
    }),

  reset: () => set({ isWorking: false, isFound: false, currentNode: null, generator: null }),
}))
