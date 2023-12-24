import { AlgoValues } from '@/constants'
import BFSVisualizer from '../algorithms/BFS/BFSVisualizer'
import BinarySearchVisualizer from '../algorithms/BinarySearch/BinarySearchVisualizer'
import DFSVisualizer from '../algorithms/DFS/DFSVisualizer'
import SortVisualizer from '../algorithms/Sort/SortVisualizer'

const Visualizer = ({
  activeAlgo,
}: {
  activeAlgo: AlgoValues | null
}) => {
  switch (activeAlgo) {
    case 'binary-search':
      return <BinarySearchVisualizer />

    case 'sort':
      return <SortVisualizer />

    case 'dfs':
      return <DFSVisualizer />

    case 'bfs':
      return <BFSVisualizer />

    default:
      break
  }
}

export default Visualizer
