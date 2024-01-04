import { create } from 'zustand'

export const sortAlgorithms = ['bubble-sort', 'insertion-sort', 'selection-sort', 'merge-sort', 'quick-sort'] as const
export type SortAlgorithm = (typeof sortAlgorithms)[number]

type SortGenerator = Generator<
  {
    array: string[]
    activeIndexes: number[]
  },
  void,
  unknown
>

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
  algorithm: sortAlgorithms[0],
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
      // check if array is valid
      for (const num of state.array) {
        if (isNaN(parseInt(num))) {
          return {}
        }
      }

      // Если генератор не равен null, то значит
      // пользователь поставил на паузу сортировку и хочет продолжить
      if (state.generator != null) {
        return { isWorking: true }
      } else {
        let generator

        switch (state.algorithm) {
          case 'bubble-sort':
            generator = bubbleSort(state.array)
            break

          case 'insertion-sort':
            generator = insertionSort(state.array)
            break

          case 'merge-sort':
            generator = mergeSort(state.array, 0, state.array.length - 1)
            break

          case 'quick-sort':
            generator = quickSort(state.array, 0, state.array.length - 1)
            break

          case 'selection-sort':
            generator = selectionSort(state.array)
            break

          default:
            break
        }

        return { isWorking: true, generator }
      }
    }),

  setIsShowNumbers: (val) => set(() => ({ isShowNumbers: val })),

  nextStep: () => {
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

  reset: () => set(() => ({ array: [], activeIndexes: [], isWorking: false, isSorted: false, generator: null })),
}))

//----------------------------------------------------------------
// SORT FUNCTIONS

// Bubble sort - O(n^2)
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

// Selection sort - O(n^2)
function* selectionSort(array: string[]) {
  // Проходим по всему массиву
  for (let i = 0; i < array.length; i++) {
    let min = i

    // Ищем минимальный элемент в оставшейся части массива
    for (let j = i + 1; j < array.length; j++) {
      if (parseInt(array[j]) < parseInt(array[min])) {
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
function* insertionSort(array: string[]) {
  for (let i = 1; i < array.length; i++) {
    let current = parseInt(array[i])
    let j = i - 1

    while (j >= 0 && parseInt(array[j]) > current) {
      // Used for animation
      let copyarr = [...array]
      copyarr[j + 1] = current.toString()
      yield { array: copyarr, activeIndexes: [i, j + 1] }
      //

      array[j + 1] = array[j]

      // Used for animation
      copyarr = [...array]
      copyarr[j + 1] = current.toString()
      yield { array: copyarr, activeIndexes: [i, j + 1] }
      //

      j -= 1
    }

    array[j + 1] = current.toString()
    yield { array, activeIndexes: [j + 1] }
  }
}

// Merge sort - O(n log n)
function* mergeSort(arr: string[], l: number, r: number): SortGenerator {
  // if (l + 1 >= r) return

  if (l < r) {
    // Разбиваем массив на две части до тех пор пока не останется по одному элементу
    // каждый из которых сортируется рекурсивно
    const mid = Math.floor((l + r) / 2)
    yield* mergeSort(arr, l, mid)
    yield* mergeSort(arr, mid + 1, r)

    // Производим операцию слияния двух частей массива
    yield* mergeArrayInplace(arr, l, mid, r)
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

function* mergeArrayInplace(arr: string[], left: number, mid: number, right: number) {
  let start2 = mid + 1

  if (parseInt(arr[mid]) <= parseInt(arr[start2])) {
    return
  }

  while (left <= mid && start2 <= right) {
    if (parseInt(arr[left]) <= parseInt(arr[start2])) {
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

      yield { array: arr, activeIndexes: [left, mid, right] }
    }
  }
}

// Quick sort - O(n log n)
function* quickSort(array: string[], left: number, right: number): SortGenerator {
  let index = yield* partition(array, left, right)

  if (left < index - 1) {
    yield* quickSort(array, left, index - 1)
  }
  if (index < right) {
    yield* quickSort(array, index, right)
  }
}

function* partition(array: string[], left: number, right: number) {
  // Опорный элемент по центру массива
  const mid = Math.floor((left + right) / 2)
  const pivot = parseInt(array[mid])

  let i = left
  let j = right

  while (i <= j) {
    while (parseInt(array[i]) < pivot) {
      i++
    }

    while (parseInt(array[j]) > pivot) {
      j--
    }

    if (i <= j) {
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp

      i++
      j--

      yield { array, activeIndexes: [i, j] }
    }
  }

  return i
}
