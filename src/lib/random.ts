export function generateRandomArray(size: number, min: number, max: number) {
  const arr = []

  for (let i = 0; i < size; i++) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    arr.push(num)
  }

  return arr.map((n) => n.toString())
}

export function generateRandomSortedArray(size: number, min: number, max: number) {
  const arr = generateRandomArray(size, min, max)

  return arr.sort((a, b) => parseInt(a) - parseInt(b))
}

export function generateUnsortedArray(size: number) {
  const sortedArray = Array.from({ length: size }, (_, index) => index + 1)

  shuffleArray(sortedArray)

  return sortedArray
}

function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
