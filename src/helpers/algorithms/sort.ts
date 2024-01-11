export class Sort {
  private array: string[]
  private algorithm: SortAlgorithm
  static readonly sortAlgorithms = [
    'bubble-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',
    'selection-sort',
  ] as const

  constructor(array: string[], algorithm: SortAlgorithm) {
    this.array = array
    this.algorithm = algorithm
  }

  public makeGenerator() {
    switch (this.algorithm) {
      case 'bubble-sort':
        return this.bubbleSort(this.array)

      case 'insertion-sort':
        return this.insertionSort(this.array)

      case 'merge-sort':
        return this.mergeSort(this.array, 0, this.array.length - 1)

      case 'quick-sort':
        return this.quickSort(this.array, 0, this.array.length - 1)

      case 'selection-sort':
        return this.selectionSort(this.array)

      default:
        return null
    }
  }

  //----------------------------------------------------------------
  // SORT FUNCTIONS GENERATORS

  // Bubble sort - O(n^2)
  private *bubbleSort(array: string[]) {
    let comparsionCount = 0
    let arrayAccessCount = 0

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        arrayAccessCount += 2
        comparsionCount += 1

        if (parseInt(array[j]) > parseInt(array[j + 1])) {
          yield { array, activeIndexes: [j, j + 1], comparsionCount, arrayAccessCount }

          const temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp

          arrayAccessCount += 4
        }
      }
    }
  }

  // Selection sort - O(n^2)
  private *selectionSort(array: string[]) {
    let comparsionCount = 0
    let arrayAccessCount = 0

    // Проходим по всему массиву
    for (let i = 0; i < array.length; i++) {
      let min = i

      // Ищем минимальный элемент в оставшейся части массива
      for (let j = i + 1; j < array.length; j++) {
        if (parseInt(array[j]) < parseInt(array[min])) {
          min = j
        }

        comparsionCount += 1
        arrayAccessCount += 2

        yield { array, activeIndexes: [i, j, min], comparsionCount, arrayAccessCount }
      }

      // Если минимальный элемент не равен текущему, то меняем их местами
      if (min != i) {
        const temp = array[i]
        array[i] = array[min]
        array[min] = temp

        arrayAccessCount += 4
      }
    }
  }

  // Insertion sort - O(n^2)
  private *insertionSort(array: string[]) {
    let comparsionCount = 0
    let arrayAccessCount = 0

    for (let i = 1; i < array.length; i++) {
      let current = parseInt(array[i])
      let j = i - 1
      arrayAccessCount += 1

      while (j >= 0 && parseInt(array[j]) > current) {
        comparsionCount += 1
        arrayAccessCount += 1

        // Used for animation
        let copyarr = [...array]
        copyarr[j + 1] = current.toString()
        yield { array: copyarr, activeIndexes: [i, j + 1], comparsionCount, arrayAccessCount }
        //

        array[j + 1] = array[j]

        arrayAccessCount += 1

        // Used for animation
        copyarr = [...array]
        copyarr[j + 1] = current.toString()
        yield { array: copyarr, activeIndexes: [i, j + 1], comparsionCount, arrayAccessCount }
        //

        j -= 1
      }

      array[j + 1] = current.toString()
      arrayAccessCount += 1

      yield { array, activeIndexes: [j + 1], comparsionCount, arrayAccessCount }
    }
  }

  // Merge sort - O(n log n)
  private *mergeSort(
    arr: string[],
    left: number,
    right: number,
    counter = { comparsionCount: 0, arrayAccessCount: 0 },
  ): SortGenerator {
    // if (l + 1 >= r) return

    if (left < right) {
      // Разбиваем массив на две части до тех пор пока не останется по одному элементу
      // каждый из которых сортируется рекурсивно
      const mid = Math.floor((left + right) / 2)
      yield* this.mergeSort(arr, left, mid, counter)
      yield* this.mergeSort(arr, mid + 1, right, counter)

      // Производим операцию слияния двух частей массива
      yield* this.mergeArrayInplace(arr, left, mid, right, counter)
    }
  }

  // function* mergeArrayWithTemp(arr: string[], left: number, mid: number, right: number) {
  //   let p1 = 0
  //   let p2 = 0

  //   let temp = Array(right - left).fill('')

  //   while (left + p1 < mid && mid + p2 < right) {
  //     if (parseInt(arr[left + p1]) <= parseInt(arr[mid + p2])) {
  //       temp[p1 + p2] = arr[left + p1]
  //       p1 += 1
  //     } else {
  //       temp[p1 + p2] = arr[mid + p2]
  //       p2 += 1
  //     }
  //   }

  //   // Если один из массивов закончился, то копируем оставшиеся элементы из другого массива
  //   while (left + p1 < mid) {
  //     temp[p1 + p2] = arr[left + p1]
  //     p1 += 1
  //   }

  //   while (mid + p2 < right) {
  //     temp[p1 + p2] = arr[mid + p2]
  //     p2 += 1
  //   }

  //   // Копируем временный массив в основной
  //   for (let i = 0; i < p1 + p2; i++) {
  //     arr[left + i] = temp[i]

  //     yield { array: arr, activeIndexes: [left + i] }
  //   }
  // }

  private *mergeArrayInplace(
    arr: string[],
    left: number,
    mid: number,
    right: number,
    counter: { comparsionCount: number; arrayAccessCount: number },
  ) {
    let start2 = mid + 1

    counter.arrayAccessCount += 2
    counter.comparsionCount += 1

    if (parseInt(arr[mid]) <= parseInt(arr[start2])) {
      return
    }

    while (left <= mid && start2 <= right) {
      counter.arrayAccessCount += 2
      counter.comparsionCount += 1

      if (parseInt(arr[left]) <= parseInt(arr[start2])) {
        left++
      } else {
        const value = arr[start2]
        let index = start2

        while (index != left) {
          arr[index] = arr[index - 1]
          index--

          counter.arrayAccessCount += 2
        }

        arr[left] = value

        left++
        mid++
        start2++

        counter.arrayAccessCount += 2

        yield {
          array: arr,
          activeIndexes: [left, mid, right],
          comparsionCount: counter.comparsionCount,
          arrayAccessCount: counter.arrayAccessCount,
        }
      }
    }
  }

  // Quick sort - O(n log n)
  private *quickSort(
    array: string[],
    left: number,
    right: number,
    counter = { comparsionCount: 0, arrayAccessCount: 0 },
  ): SortGenerator {
    let index = yield* this.partition(array, left, right, counter)

    if (left < index - 1) {
      yield* this.quickSort(array, left, index - 1, counter)
    }
    if (index < right) {
      yield* this.quickSort(array, index, right, counter)
    }
  }

  private *partition(
    array: string[],
    left: number,
    right: number,
    counter: { comparsionCount: number; arrayAccessCount: number },
  ) {
    // Опорный элемент по центру массива
    const mid = Math.floor((left + right) / 2)
    const pivot = parseInt(array[mid])

    counter.arrayAccessCount += 1

    let i = left
    let j = right

    while (i <= j) {
      while (parseInt(array[i]) < pivot) {
        i++

        counter.comparsionCount += 1
        counter.arrayAccessCount += 1
      }

      while (parseInt(array[j]) > pivot) {
        j--

        counter.comparsionCount += 1
        counter.arrayAccessCount += 1
      }

      if (i <= j) {
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp

        i++
        j--

        counter.arrayAccessCount += 4

        yield {
          array,
          activeIndexes: [i, j],
          comparsionCount: counter.comparsionCount,
          arrayAccessCount: counter.arrayAccessCount,
        }
      }
    }

    return i
  }
}

export type SortGenerator = Generator<
  {
    array: string[]
    activeIndexes: number[]
    comparsionCount: number
    arrayAccessCount: number
  },
  void,
  unknown
>

export type SortAlgorithm = (typeof Sort.sortAlgorithms)[number]
