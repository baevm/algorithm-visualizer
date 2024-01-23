import { Sort, SortAlgorithm, SortGenerator } from '@/helpers/algorithms/sort'
import { compare } from '@/lib/comparator'
import { validateArray } from '@/lib/validator'
import { makeAutoObservable, runInAction } from 'mobx'

type Stats = {
  comparsionCount: number
  arrayAccessCount: number
}

class SortStore {
  algorithm: SortAlgorithm = 'bubble-sort'
  array: string[] = []
  activeIndexes: number[] = []
  isWorking = false
  isSorted = false
  generator: SortGenerator | null = null
  isShowNumbers = false
  isShowStats = false
  stats: Stats = {
    comparsionCount: 0,
    arrayAccessCount: 0,
  }

  constructor() {
    makeAutoObservable(this)
  }

  setArray = (array: string[]) => {
    this.array = array
    this.activeIndexes = []
    this.isWorking = false
    this.isSorted = false
    this.generator = null
    this.stats = {
      comparsionCount: 0,
      arrayAccessCount: 0,
    }
  }

  setAlgorithm = (algorithm: SortAlgorithm) => {
    this.algorithm = algorithm
  }

  setIsShowNumbers = (isShowNumbers: boolean) => {
    this.isShowNumbers = isShowNumbers
  }

  setIsShowStats = (isShowStats: boolean) => {
    this.isShowStats = isShowStats
  }

  startWorking = () => {
    const isValidArray = validateArray(this.array)

    if (!isValidArray) {
      return
    }

    // Если генератор не равен null, то значит
    // пользователь поставил на паузу сортировку и хочет продолжить
    if (this.generator != null) {
      this.isWorking = true
      return
    }

    const arrayWithStats = new Proxy(this.array, {
      get: (target, prop) => {
        // ignore mobx calls, map(), join() etc.
        // count only numberic indexes
        if (isNumeric(prop)) {
          runInAction(() => {
            this.stats.arrayAccessCount += 1
          })
        }

        return target[prop as any]
      },
    })

    const compareWithStats = new Proxy(compare, {
      apply: (target, thisArg, argArray: any) => {
        runInAction(() => {
          this.stats.comparsionCount += 1
        })

        return target.apply(thisArg, argArray)
      },
    })

    const sorter = new Sort(arrayWithStats, this.algorithm, compareWithStats)

    this.generator = sorter.makeGenerator()
    this.isWorking = true
  }

  nextStep = () => {
    if (!this.isWorking || !this.generator) {
      return
    }

    const { value, done } = this.generator.next()

    if (done) {
      this.isWorking = false
      this.isSorted = true

      return
    }

    this.array = value.array
    this.activeIndexes = value.activeIndexes
  }

  pause = () => {
    this.isWorking = false
  }

  reset = () => {
    this.array = []
    this.activeIndexes = []
    this.isWorking = false
    this.isSorted = false
    this.generator = null
    this.stats = {
      comparsionCount: 0,
      arrayAccessCount: 0,
    }
  }
}

export const sortStore = new SortStore()

const isNumeric = (num: any) =>
  (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) && !isNaN(num as number)
