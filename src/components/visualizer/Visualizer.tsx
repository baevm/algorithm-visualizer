import { AlgoValues } from '@/constants'
import BinarySearchVisualizer from '../algorithms/BinarySearch/BinarySearchVisualizer'
import BinaryTreeVisualizer from '../algorithms/BinaryTree/BinaryTreeVisualizer'
import DijkstraVisualizer from '../algorithms/Dijkstra/DijkstraVisualizer'
import SortVisualizer from '../algorithms/Sort/SortVisualizer'

const Visualizer = ({ activeAlgo }: { activeAlgo: AlgoValues | null }) => {
  switch (activeAlgo) {
    case 'binary-search':
      return <BinarySearchVisualizer />

    case 'sort':
      return <SortVisualizer />

    case 'binary-tree':
      return <BinaryTreeVisualizer />

    case 'dijkstra':
      return <DijkstraVisualizer />

    default:
      break
  }
}

export default Visualizer
