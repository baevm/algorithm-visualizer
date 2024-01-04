import { create } from 'zustand'

type HistoryStep = {
  left: number
  right: number
  mid: number
  isFound: boolean
  isNotExist: boolean
}

interface BinarySearchStore {
  array: string[]
  target: string | null

  left: number
  right: number
  mid: number

  isWorking: boolean
  isFound: boolean
  isNotExist: boolean

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
      // check if array is valid
      for (const num of state.array) {
        if (isNaN(parseInt(num))) {
          return {}
        }
      }

      return { isWorking: !state.isWorking }
    }),

  // FIXME: refactor binary search to use generators
  nextStep: () =>
    set((state) => {
      const { array, target, left, right, mid, history, step } = state

      if (!target || isNaN(parseInt(target)) || array.length === 0) {
        return {}
      }

      // Array contains string, first convert to number
      // Same with target
      const midValue = parseInt(array[mid])
      const targetValue = parseInt(target)

      if (midValue === targetValue) {
        return { isFound: true, isWorking: false }
      }

      if (left >= right) {
        return { isNotExist: true }
      }

      if (midValue < targetValue) {
        const newLeft = mid + 1
        const newMid = Math.floor((newLeft + right) / 2)

        history.push({ left: newLeft, right, mid: newMid, isFound: false, isNotExist: false })

        return { left: newLeft, mid: newMid, history, step: step + 1 }
      }

      if (midValue > targetValue) {
        const newRight = mid - 1
        const newMid = Math.floor((left + newRight) / 2)

        history.push({ left, right: newRight, mid: newMid, isFound: false, isNotExist: false })

        return { right: newRight, mid: newMid, history, step: step + 1 }
      }

      return {}
    }),

  beforeStep: () =>
    set((state) => {
      const { history, step } = state

      if (step === 0) {
        return {}
      }

      const newStep = step - 1

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

      return { left, right, mid, isFound: false, isWorking: false, isNotExist: false, history, step: 0 }
    }),
}))
