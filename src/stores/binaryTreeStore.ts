import { BinaryTree, BinaryTreeAlgortihm, TreeGenerator } from '@/helpers/algorithms/binaryTree'
import { makeAutoObservable } from 'mobx'

class BinaryTreeStore {
  array: (string | 'null')[] = []
  target: string | null = null
  isWorking = false
  isFound = false
  algorithm: BinaryTreeAlgortihm = {
    type: 'bfs',
    technique: 'preorder',
  }
  generator: TreeGenerator | null = null
  currentNode: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setArray = (array: string[]) => {
    this.array = array
  }

  setTarget = (target: string) => {
    this.target = target
  }

  setAlgorithm = (algorithm: BinaryTreeAlgortihm) => {
    this.algorithm = algorithm
  }

  startWorking = () => {
    // Если генератор не равен null, то значит
    // пользователь поставил на паузу сортировку и хочет продолжить
    if (this.generator != null) {
      this.isWorking = true
      return
    }

    const binaryTreer = new BinaryTree(this.algorithm, this.array, this.target)

    this.generator = binaryTreer.makeGenerator()
    this.isWorking = true

    return
  }

  nextStep = () => {
    if (!this.isWorking || !this.generator) {
      return
    }

    const { value, done } = this.generator.next()

    if (done) {
      this.isWorking = false
      this.isFound = true

      return
    }

    this.currentNode = value.target || null
  }

  reset = () => {
    this.isWorking = false
    this.isFound = false
    this.currentNode = null
    this.generator = null
  }
}

export const binaryTreeStore = new BinaryTreeStore()
