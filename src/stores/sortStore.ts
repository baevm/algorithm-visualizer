import { create } from 'zustand'

interface SortStore {
  array: string[]
  activeIndexes: number[]

  isWorking: boolean
  isShowNumbers: boolean
  isSorted: boolean

  generator: Generator<
    {
      array: string[]
      activeIndexes: number[]
    },
    void,
    unknown
  > | null

  setArray: (searchArray: string[]) => void
  startWorking: () => void
  setIsShowNumbers: (val: boolean) => void

  nextStepBubbleSort: () => void
  pause: () => void

  reset: () => void
}

export const useSortStore = create<SortStore>((set) => ({
  array: [],
  activeIndexes: [0, 1],
  isWorking: false,
  isShowNumbers: true,
  isSorted: false,

  generator: null,

  setArray: (array) => set({ array, activeIndexes: [0, 1], isWorking: false, isSorted: false, generator: null }),

  startWorking: () =>
    set((state) => {
      // check if array is valid
      for (const num of state.array) {
        if (isNaN(parseInt(num))) {
          return {}
        }
      }

      // if state generator is not null, that means
      // that user is paused algorithm and now we need to continue it
      if (state.generator != null) {
        return { isWorking: true }
      } else {
        const generator = bubbleSort(state.array)
        return { isWorking: true, generator }
      }
    }),

  setIsShowNumbers: (val) => set(() => ({ isShowNumbers: val })),

  nextStepBubbleSort: () => {
    set((state) => {
      if (state.isWorking && state.generator) {
        const { value, done } = state.generator.next()

        if (!done) {
          return { array: value.array, activeIndexes: value.activeIndexes }
        } else {
          return { isWorking: false, isSorted: true }
        }
      }

      return {}
    })
  },

  pause: () => set(() => ({ isWorking: false })),

  reset: () => set(() => ({ array: [], activeIndexes: [0, 1], isWorking: false, isSorted: false, generator: null })),
}))

function* bubbleSort(array: string[]) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (parseInt(array[j]) > parseInt(array[j + 1])) {
        const temp = array[j]

        yield { array, activeIndexes: [j, j + 1] }

        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
}
