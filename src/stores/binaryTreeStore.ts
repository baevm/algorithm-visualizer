import { TreeNode, arrayToTree } from '@/helpers/binaryTree'
import { create } from 'zustand'

export type TreeAlgorithmType = 'bfs' | 'dfs'
export type DFSTechnique = 'preorder' | 'inorder' | 'postorder'

type BinaryTreeAlgortihm = {
  type: TreeAlgorithmType
  technique: DFSTechnique
}

type TreeGenerator = Generator<
  {
    isFound: boolean
    target: string | undefined
  },
  void,
  unknown
>

interface BinaryTreeStore {
  array: (string | 'null')[]
  target: string | null
  isWorking: boolean
  isFound: boolean
  algorithm: BinaryTreeAlgortihm
  generator: TreeGenerator | null
  currentNode: string | null

  setArray: (searchArray: string[]) => void
  setTarget: (target: string) => void
  startWorking: () => void
  nextStep: () => void
  reset: () => void
  setAlgorithm: (algorithm: BinaryTreeAlgortihm) => void
}

export const useBinaryTree = create<BinaryTreeStore>((set) => ({
  array: [],
  target: null,
  isWorking: false,
  isFound: false,
  algorithm: {
    type: 'bfs',
    technique: 'preorder',
  },
  generator: null,
  currentNode: null,

  setArray: (array) => set({ array }),
  setTarget: (target) => set({ target }),
  setAlgorithm: (algorithm) => set({ algorithm }),

  startWorking: () =>
    set((state) => {
      // Если генератор не равен null, то значит
      // пользователь поставил на паузу сортировку и хочет продолжить
      if (state.generator != null) {
        return { isWorking: true }
      }

      const generator = makeGenerator(state.algorithm, state.array, state.target)

      return { isWorking: !state.isWorking, generator }
    }),

  nextStep: () =>
    set((state) => {
      if (!state.isWorking || !state.generator) {
        return {}
      }

      const { value, done } = state.generator.next()

      if (done) {
        return { isWorking: false, isFound: true }
      }

      return { currentNode: value.target }
    }),

  reset: () => set({ isWorking: false, isFound: false, currentNode: null, generator: null }),
}))

function makeGenerator(algorithm: BinaryTreeAlgortihm, array: (string | 'null')[], target: any): TreeGenerator | null {
  switch (algorithm.type) {
    case 'bfs':
      return bfsGenerator(array, target)

    case 'dfs':
      return dfsGenerator(array, target, algorithm.technique)

    default:
      return null
  }
}

function* bfsGenerator(array: (string | 'null')[], target: string) {
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

function* dfsGenerator(array: (string | 'null')[], target: string, algoTechnique: DFSTechnique) {
  const root = arrayToTree(array)

  switch (algoTechnique) {
    case 'preorder':
      for (const { isFound, current } of dfsPreorder(root, target)) {
        yield { isFound, target: current }

        if (isFound) {
          return
        }
      }
      break

    case 'inorder':
      for (const { isFound, current } of dfsInorder(root, target)) {
        yield { isFound, target: current }

        if (isFound) {
          return
        }
      }
      break

    case 'postorder':
      for (const { isFound, current } of dfsPostorder(root, target)) {
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

function* dfsPreorder(root: TreeNode | null, target: string): any {
  if (!root) return

  yield { isFound: root.value === target, current: root.value }

  if (root.left && root.left.value !== 'null') yield* dfsPreorder(root.left, target)

  if (root.right && root.right.value !== 'null') yield* dfsPreorder(root.right, target)
}

function* dfsInorder(root: TreeNode | null, target: string): any {
  if (!root) return

  if (root.left && root.left.value !== 'null') yield* dfsInorder(root.left, target)

  yield { isFound: root.value === target, current: root.value }

  if (root.right && root.right.value !== 'null') yield* dfsInorder(root.right, target)
}

function* dfsPostorder(root: TreeNode | null, target: string): any {
  if (!root) return

  if (root.left && root.left.value !== 'null') yield* dfsPostorder(root.left, target)

  if (root.right && root.right.value !== 'null') yield* dfsPostorder(root.right, target)

  yield { isFound: root.value === target, current: root.value }
}

