export function generateRandomSortedArray(size: number, min: number, max: number) {
  const arr = []

  for (let i = 0; i < size; i++) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    arr.push(num)
  }

  return arr.sort((a, b) => a - b).map((n) => n.toString())
}
