import { create } from 'zustand'

interface BinarySearchStore {
  array: number[]
  target: number | null

  left: number
  right: number
  mid: number

  isWorking: boolean
  isFound: boolean
  isNotExist: boolean

  setArray: (searchArray: string[]) => void
  setTarget: (target: string) => void
  setIsWorking: () => void
  nextStep: () => void
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

  setArray: (array) =>
    set(() => {
      const left = 0
      const right = array.length - 1
      const mid = Math.floor((left + right) / 2)

      const parsedArray: number[] = []
      for (let i = 0; i < array.length; i++) {
        const element = parseInt(array[i])

        if (!isNaN(element)) {
          parsedArray.push(element)
        }
      }

      return { array: parsedArray, left, right, mid, isFound: false }
    }),

  setTarget: (target) => set({ target: parseInt(target) }),
  setIsWorking: () => set((state) => ({ isWorking: !state.isWorking })),

  nextStep: () =>
    set((state) => {
      const { array, target, left, right, mid } = state

      if (!target || isNaN(target) || array.length === 0) {
        return {}
      }

      if (array[mid] === target) {
        return { isFound: true }
      }

      if (left >= right) {
        return { isNotExist: true }
      }

      if (array[mid] < target) {
        const newLeft = mid + 1
        const newMid = Math.floor((newLeft + right) / 2)

        return { left: newLeft, mid: newMid }
      }

      if (array[mid] > target) {
        const newRight = mid - 1
        const newMid = Math.floor((left + newRight) / 2)

        return { right: newRight, mid: newMid }
      }

      return {}
    }),

  reset: () =>
    set((state) => {
      const left = 0
      const right = state.array.length - 1
      const mid = Math.floor((left + right) / 2)

      return { left, right, mid, isFound: false, isWorking: false, isNotExist: false }
    }),
}))
