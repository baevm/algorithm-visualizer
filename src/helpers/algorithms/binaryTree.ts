export type TreeAlgorithmType = (typeof BinaryTree.treeAlgorithms)[number]
export type DFSTechnique = (typeof BinaryTree.dfsTechniques)[number]

export type BinaryTreeAlgortihm = {
  type: TreeAlgorithmType
  technique: DFSTechnique
}

export type TreeGenerator = Generator<
  {
    isFound: boolean
    target: string | undefined
  },
  void,
  unknown
>

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

export class BinaryTree {
  private algorithm: BinaryTreeAlgortihm
  private nodes: (string | 'null')[]
  private target: any
  static readonly treeAlgorithms = ['bfs', 'dfs'] as const
  static readonly dfsTechniques = ['preorder', 'inorder', 'postorder'] as const

  constructor(algorithm: BinaryTreeAlgortihm, array: (string | 'null')[], target: any) {
    this.algorithm = algorithm
    this.nodes = array
    this.target = target
  }

  public makeGenerator(): TreeGenerator | null {
    switch (this.algorithm.type) {
      case 'bfs':
        return this.bfsGenerator(this.nodes, this.target)

      case 'dfs':
        return this.dfsGenerator(this.nodes, this.target, this.algorithm.technique)

      default:
        return null
    }
  }

  private *bfsGenerator(array: (string | 'null')[], target: string) {
    const queue: (string | 'null')[] = [...array]

    while (queue.length > 0) {
      const current = queue.shift()

      if (current !== 'null') {
        yield { isFound: false, target: current }
      }

      if (current === target) {
        yield { isFound: true, target: current }
        return
      }

      const left = array[2 * queue.length + 1]
      const right = array[2 * queue.length + 2]

      if (left !== 'null') {
        queue.push(left)
      }

      if (right !== 'null') {
        queue.push(right)
      }
    }
  }

  private *dfsGenerator(array: (string | 'null')[], target: string, algoTechnique: DFSTechnique) {
    const root = this.arrayToTree(array)

    switch (algoTechnique) {
      case 'preorder':
        for (const { isFound, current } of this.dfsPreorder(root, target)) {
          yield { isFound, target: current }

          if (isFound) {
            return
          }
        }
        break

      case 'inorder':
        for (const { isFound, current } of this.dfsInorder(root, target)) {
          yield { isFound, target: current }

          if (isFound) {
            return
          }
        }
        break

      case 'postorder':
        for (const { isFound, current } of this.dfsPostorder(root, target)) {
          yield { isFound, target: current }

          if (isFound) {
            return
          }
        }
        break

      default:
        break
    }
  }

  private *dfsPreorder(root: TreeNode | null, target: string): any {
    if (!root) return

    yield { isFound: root.value === target, current: root.value }

    if (root.left && root.left.value !== 'null') yield* this.dfsPreorder(root.left, target)

    if (root.right && root.right.value !== 'null') yield* this.dfsPreorder(root.right, target)
  }

  private *dfsInorder(root: TreeNode | null, target: string): any {
    if (!root) return

    if (root.left && root.left.value !== 'null') yield* this.dfsInorder(root.left, target)

    yield { isFound: root.value === target, current: root.value }

    if (root.right && root.right.value !== 'null') yield* this.dfsInorder(root.right, target)
  }

  private *dfsPostorder(root: TreeNode | null, target: string): any {
    if (!root) return

    if (root.left && root.left.value !== 'null') yield* this.dfsPostorder(root.left, target)

    if (root.right && root.right.value !== 'null') yield* this.dfsPostorder(root.right, target)

    yield { isFound: root.value === target, current: root.value }
  }

  private arrayToTree(arr: (string | 'null')[]) {
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
}
