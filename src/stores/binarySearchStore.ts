import { BinarySearch } from '@/helpers/algorithms/binarySearch'
import { validateArray } from '@/lib/validator'
import { create } from 'zustand'

type HistoryStep = {
  left: number
  right: number
  mid: number
  isFound: boolean
  isNotExist: boolean
}

type BinarySearchGenerator = Generator<
  {
    left: number
    right: number
    mid: number
    history: HistoryStep[]
    isFound: boolean
  },
  void,
  unknown
>

interface BinarySearchStore {
  array: string[]
  target: string | null

  left: number
  right: number
  mid: number

  isWorking: boolean
  isFound: boolean
  isNotExist: boolean

  generator: BinarySearchGenerator | null

  history: HistoryStep[]
  step: number

  setArray: (searchArray: string[]) => void
  setTarget: (target: string) => void
  setIsWorking: () => void

  nextStep: () => void
  beforeStep: () => void
  reset: () => void
}

export const useBinarySearch = create<BinarySearchStore>((set) => ({
  array: [],
  target: null,
  left: 0,
  right: 0,
  mid: 0,
  isWorking: false,
  isFound: false,
  isNotExist: false,
  generator: null,
  history: [],
  step: 0,

  setArray: (array) =>
    set(() => {
      const left = 0
      const right = array.length - 1
      const mid = Math.floor((left + right) / 2)

      const history = [{ left, right, mid, isFound: false, isNotExist: false }]

      return { array: array, left, right, mid, history, isFound: false, step: 0 }
    }),

  setTarget: (target) => set({ target }),
  setIsWorking: () =>
    set((state) => {
      const isValidArray = validateArray(state.array)

      if (!isValidArray || state.target == null) {
        return {}
      }

      if (state.generator != null) {
        return { isWorking: false }
      }

      const searcher = new BinarySearch(state.array, state.target)
      const generator = searcher.makeGenerator()

      return { isWorking: true, generator }
    }),

  // FIXME: refactor binary search to use generators
  nextStep: () =>
    set((state) => {
      if (!state.isWorking || !state.generator) {
        return {}
      }

      const { value, done } = state.generator.next()

      if (done) {
        return { isWorking: false, isFound: false, isNotExist: true }
      }

      if (value.isFound) {
        return { isWorking: false, isFound: true }
      }

      return { left: value.left, right: value.right, mid: value.mid, history: value.history, step: state.step + 1 }
    }),

  beforeStep: () =>
    set((state) => {
      const { history, step } = state

      if (step === 0) {
        return {}
      }

      const newStep = step - 1

      if (newStep >= history.length) {
        return {}
      }

      const { left, right, mid, isFound, isNotExist } = history[newStep]

      const newHistory = history.slice(0, newStep + 1)

      return {
        left,
        right,
        mid,
        isFound,
        isNotExist,
        step: newStep,
        history: newHistory,
      }
    }),

  reset: () =>
    set((state) => {
      const left = 0
      const right = state.array.length - 1
      const mid = Math.floor((left + right) / 2)

      const history = [{ left, right, mid, isFound: false, isNotExist: false }]

      return {
        left,
        right,
        mid,
        isFound: false,
        isWorking: false,
        isNotExist: false,
        history,
        step: 0,
        generator: null,
      }
    }),
}))
