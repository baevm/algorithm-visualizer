import { Sort, SortAlgorithm, SortGenerator } from '@/helpers/algorithms/sort'
import { validateArray } from '@/lib/validator'
import { makeAutoObservable } from 'mobx'

class SortStore {
  algorithm: SortAlgorithm = 'bubble-sort'
  array: string[] = []
  activeIndexes: number[] = []
  isWorking = false
  isSorted = false
  generator: SortGenerator | null = null
  isShowNumbers = false
  isShowStats = false
  comparsionCount = 0
  arrayAccessCount = 0

  constructor() {
    makeAutoObservable(this)
  }

  setArray = (array: string[]) => {
    this.array = array
    this.activeIndexes = []
    this.isWorking = false
    this.isSorted = false
    this.generator = null
    this.comparsionCount = 0
    this.arrayAccessCount = 0
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

    const sorter = new Sort(this.array, this.algorithm)

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
    this.comparsionCount = value.comparsionCount
    this.arrayAccessCount = value.arrayAccessCount
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
    this.comparsionCount = 0
    this.arrayAccessCount = 0
  }
}

export const sortStore = new SortStore()
