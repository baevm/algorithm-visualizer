import { Sort, SortAlgorithm, SortGenerator } from '@/helpers/algorithms/sort'
import { validateArray } from '@/lib/validator'
import { create } from 'zustand'

interface SortStore {
  algorithm: SortAlgorithm
  array: string[]
  activeIndexes: number[]

  isWorking: boolean
  isShowNumbers: boolean
  isSorted: boolean

  generator: SortGenerator | null

  setAlgorithm: (algorithm: SortAlgorithm) => void
  setArray: (searchArray: string[]) => void
  startWorking: () => void
  setIsShowNumbers: (val: boolean) => void

  nextStep: () => void
  pause: () => void
  reset: () => void
}

export const useSortStore = create<SortStore>((set) => ({
  algorithm: 'bubble-sort',
  array: [],
  activeIndexes: [],
  isWorking: false,
  isShowNumbers: false,
  isSorted: false,

  generator: null,

  setAlgorithm: (algorithm) => set(() => ({ algorithm })),
  setArray: (array) => set({ array, activeIndexes: [], isWorking: false, isSorted: false, generator: null }),

  startWorking: () =>
    set((state) => {
      const isValidArray = validateArray(state.array)

      if (!isValidArray) {
        return {}
      }

      // Если генератор не равен null, то значит
      // пользователь поставил на паузу сортировку и хочет продолжить
      if (state.generator != null) {
        return { isWorking: true }
      }

      const sorter = new Sort(state.array, state.algorithm)
      const generator = sorter.makeGenerator()

      return { isWorking: true, generator }
    }),

  setIsShowNumbers: (val) => set(() => ({ isShowNumbers: val })),

  nextStep: () => {
    set((state) => {
      if (!state.isWorking || !state.generator) {
        return {}
      }

      const { value, done } = state.generator.next()

      if (done) {
        return { isWorking: false, isSorted: true }
      }

      return { array: value.array, activeIndexes: value.activeIndexes }
    })
  },

  pause: () => set(() => ({ isWorking: false })),

  reset: () => set(() => ({ array: [], activeIndexes: [], isWorking: false, isSorted: false, generator: null })),
}))
