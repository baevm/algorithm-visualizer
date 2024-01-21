import { BinarySearch } from '@/helpers/algorithms/binarySearch'
import { validateArray } from '@/lib/validator'
import { makeAutoObservable } from 'mobx'

class BinarySearchStore {
  array: string[] = []
  target: string | null = null
  left = 0
  right = 0
  mid = 0
  isWorking = false
  isFound = false
  isNotExist = false
  generator: BinarySearchGenerator | null = null
  history: HistoryStep[] = []
  step = 0

  constructor() {
    makeAutoObservable(this)
  }

  setArray = (array: string[]) => {
    this.array = array

    this.reset()
  }

  setTarget = (target: string) => {
    this.target = target
  }

  setIsWorking = () => {
    const isValidArray = validateArray(this.array)

    if (!isValidArray || this.target == null) {
      return false
    }

    if (this.generator != null) {
      this.isWorking = false
      return false
    }

    const searcher = new BinarySearch(this.array, this.target)

    this.generator = searcher.makeGenerator()
    this.isWorking = true

    return true
  }

  nextStep = () => {
    if (!this.isWorking || !this.generator) {
      return
    }

    const { value, done } = this.generator.next()

    if (done) {
      this.isWorking = false
      this.isFound = false
      this.isNotExist = true

      return
    }

    if (value.isFound) {
      this.isWorking = false
      this.isFound = true

      return
    }

    this.left = value.left
    this.right = value.right
    this.mid = value.mid
    this.history = value.history
    this.step = this.step + 1
  }

  beforeStep = () => {
    if (this.step === 0) {
      return
    }

    const newStep = this.step - 1

    if (newStep >= history.length) {
      return
    }

    const { left, right, mid, isFound, isNotExist } = this.history[newStep]

    const newHistory = this.history.slice(0, newStep + 1)

    this.left = left
    this.right = right
    this.mid = mid
    this.isFound = isFound
    this.isNotExist = isNotExist
    this.step = newStep
    this.history = newHistory
  }

  reset = () => {
    const left = 0
    const right = this.array.length - 1
    const mid = Math.floor((left + right) / 2)

    const history = [{ left, right, mid, isFound: false, isNotExist: false }]

    this.left = left
    this.right = right
    this.mid = mid
    this.isFound = false
    this.isWorking = false
    this.isNotExist = false
    this.history = history
    this.step = 0
    this.generator = null
  }
}

export const binarySearchStore = new BinarySearchStore()

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
