export class BinarySearch {
  private array: string[]
  private target: string
  constructor(array: string[], target: string) {
    this.array = array
    this.target = target
  }

  public makeGenerator(): BinarySearchGenerator {
    return this.binarySearch(this.array, this.target)
  }

  // TODO: add history
  private *binarySearch(array: string[], target: string) {
    let left = 0
    let right = array.length - 1

    const targetValue = parseInt(target)
    const midStart = Math.floor((left + right) / 2)

    const history: HistoryStep[] = []

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const midValue = parseInt(array[mid])

      if (midValue === targetValue) {
        yield { left, right, mid, history, isFound: true }
        return
      } else if (midValue < targetValue) {
        left = mid + 1
        const newMid = Math.floor((left + right) / 2)

        yield { left, right, mid: newMid, history, isFound: false }
      } else {
        right = mid - 1
        const newMid = Math.floor((left + right) / 2)

        yield { left, right, mid: newMid, history, isFound: false }
      }
    }

    return
  }
}

type HistoryStep = {
  left: number
  right: number
  mid: number
  isFound: boolean
  isNotExist: boolean
}

export type BinarySearchGenerator = Generator<
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
