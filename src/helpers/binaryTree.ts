export class TreeNode {
  value: any
  left: TreeNode | null
  right: TreeNode | null
  constructor(value: any) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export function arrayToTree(arr: (string | 'null')[]) {
  if (arr.length === 0) {
    return null
  }

  const root = new TreeNode(arr[0])
  const queue = [root]

  let index = 1
  while (index < arr.length) {
    const current = queue.shift()

    if (!current) {
      continue
    }

    const leftValue = arr[index++]
    if (leftValue !== null && leftValue !== undefined) {
      current.left = new TreeNode(leftValue)
      queue.push(current.left)
    }

    const rightValue = arr[index++]
    if (rightValue !== null && rightValue !== undefined) {
      current.right = new TreeNode(rightValue)
      queue.push(current.right)
    }
  }

  return root
}
