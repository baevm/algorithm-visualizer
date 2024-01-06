export function validateArray(arr: string[]) {
  for (const num of arr) {
    if (isNaN(parseInt(num))) {
      return false
    }
  }

  return true
}
