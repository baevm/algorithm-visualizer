import { Dijkstra, DijkstraGenerator } from '@/helpers/algorithms/dijkstra'
import { makeAutoObservable } from 'mobx'
import { GraphEdge, GraphNode } from 'reagraph'

class DijkstraStore1 {
  nodes: GraphNode[] = []
  edges: GraphEdge[] = []
  source = 'n-0'
  target = 'n-6'
  isWorking = false
  isFound = false
  generator: DijkstraGenerator | null = null
  actives: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setNodes = (nodes: GraphNode[]) => {
    this.nodes = nodes
  }

  setEdges = (edges: GraphEdge[]) => {
    this.edges = edges
  }

  setSource = (source: string) => {
    this.source = source
  }

  setTarget = (target: string) => {
    this.target = target
  }

  startWorking = () => {
    const dijsktraCl = new Dijkstra(this.nodes, this.edges, this.source, this.target)

    this.generator = dijsktraCl.FindDistances()
    this.isWorking = true
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

    this.actives = value.actives
    this.edges = value.edges
  }

  reset = () => {
    const edgesWithoutLabels = this.edges.map((edge) => ({ ...edge, label: '' }))

    this.isWorking = false
    this.isFound = false
    this.actives = []
    this.edges = edgesWithoutLabels
  }

  pause = () => {
    this.isWorking = false
  }
}

export const dijkstraStore = new DijkstraStore1()
