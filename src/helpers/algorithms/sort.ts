import { CompareFn } from '@/lib/comparator'

export class Sort {
  private array: string[]
  private algorithm: SortAlgorithm
  private compareFn: CompareFn

  static readonly sortAlgorithms: Array<{ value: string; translation: string }> = [
    { value: 'bubble-sort', translation: 'Сортировка пузырьком' },
    { value: 'shaker-sort', translation: 'Шейкерная сортировка' },
    { value: 'insertion-sort', translation: 'Сортировка вставками' },
    { value: 'selection-sort', translation: 'Сортировка выбором' },
    { value: 'merge-sort', translation: 'Сортировка слиянием' },
    { value: 'quick-sort', translation: 'Быстрая сортировка' },
  ] as const

  constructor(array: string[], algorithm: SortAlgorithm, compareFn: CompareFn) {
    this.array = array
    this.algorithm = algorithm
    this.compareFn = compareFn
  }

  public makeGenerator() {
    switch (this.algorithm) {
      case 'bubble-sort':
        return this.bubbleSort(this.array)

      case 'shaker-sort':
        return this.shakerSort(this.array)

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
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        if (this.compareFn(array[j], '>', array[j + 1])) {
          yield { array, activeIndexes: [j, j + 1] }

          const temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp
        }
      }
    }
  }

  private *shakerSort(array: string[]) {
    let start = 0
    let end = array.length - 1

    while (start < end) {
      // sort from left to right
      for (let i = start; i < end; i++) {
        if (this.compareFn(array[i], '>', array[i + 1])) {
          yield { array, activeIndexes: [i, i + 1] }

          const temp = array[i]
          array[i] = array[i + 1]
          array[i + 1] = temp
        }
      }

      end -= 1

      // sort from right to left
      for (let i = end; i > start; i--) {
        if (this.compareFn(array[i], '<', array[i - 1])) {
          yield { array, activeIndexes: [i, i - 1] }

          const temp = array[i]
          array[i] = array[i - 1]
          array[i - 1] = temp
        }
      }

      start += 1
    }
  }

  // Selection sort - O(n^2)
  private *selectionSort(array: string[]) {
    // Проходим по всему массиву
    for (let i = 0; i < array.length; i++) {
      let min = i

      // Ищем минимальный элемент в оставшейся части массива
      for (let j = i + 1; j < array.length; j++) {
        if (this.compareFn(array[j], '<', array[min])) {
          min = j
        }

        yield { array, activeIndexes: [i, j, min] }
      }

      // Если минимальный элемент не равен текущему, то меняем их местами
      if (min != i) {
        const temp = array[i]
        array[i] = array[min]
        array[min] = temp
      }
    }
  }

  // Insertion sort - O(n^2)
  private *insertionSort(array: string[]) {
    for (let i = 1; i < array.length; i++) {
      let current = array[i]
      let j = i - 1

      while (j >= 0 && this.compareFn(array[j], '>', current)) {
        // Used for animation
        let copyarr = [...array]
        copyarr[j + 1] = current
        yield { array: copyarr, activeIndexes: [i, j + 1] }
        //

        array[j + 1] = array[j]

        // Used for animation
        copyarr = [...array]
        copyarr[j + 1] = current
        yield { array: copyarr, activeIndexes: [i, j + 1] }
        //

        j -= 1
      }

      array[j + 1] = current

      yield { array, activeIndexes: [j + 1] }
    }
  }

  // Merge sort - O(n log n)
  private *mergeSort(arr: string[], left: number, right: number): SortGenerator {
    // if (l + 1 >= r) return

    if (left < right) {
      // Разбиваем массив на две части до тех пор пока не останется по одному элементу
      // каждый из которых сортируется рекурсивно
      const mid = Math.floor((left + right) / 2)
      yield* this.mergeSort(arr, left, mid)
      yield* this.mergeSort(arr, mid + 1, right)

      // Производим операцию слияния двух частей массива
      yield* this.mergeArrayInplace(arr, left, mid, right)
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

  private *mergeArrayInplace(arr: string[], left: number, mid: number, right: number) {
    let start2 = mid + 1

    if (this.compareFn(arr[mid], '<=', arr[start2])) {
      return
    }

    while (left <= mid && start2 <= right) {
      if (this.compareFn(arr[left], '<=', arr[start2])) {
        left++
      } else {
        const value = arr[start2]
        let index = start2

        while (index != left) {
          arr[index] = arr[index - 1]
          index--
        }

        arr[left] = value

        left++
        mid++
        start2++

        yield {
          array: arr,
          activeIndexes: [left, mid, right],
        }
      }
    }
  }

  // Quick sort - O(n log n)
  private *quickSort(array: string[], left: number, right: number): SortGenerator {
    let index = yield* this.partition(array, left, right)

    if (left < index - 1) {
      yield* this.quickSort(array, left, index - 1)
    }
    if (index < right) {
      yield* this.quickSort(array, index, right)
    }
  }

  private *partition(arr: string[], left: number, right: number) {
    // Опорный элемент по центру массива
    const mid = Math.floor((left + right) / 2)
    const pivot = arr[mid]

    let i = left
    let j = right

    while (i <= j) {
      while (this.compareFn(arr[i], '<', pivot)) {
        i++
      }

      while (this.compareFn(arr[j], '>', pivot)) {
        j--
      }

      if (i <= j) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp

        i++
        j--

        yield {
          array: arr,
          activeIndexes: [i, j],
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
  },
  void,
  unknown
>

export type SortAlgorithm = (typeof Sort.sortAlgorithms)[number]['value']
