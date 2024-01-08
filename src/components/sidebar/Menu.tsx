import { ALGORITHMS, AlgoValues } from '@/constants'
import { Group } from '@mantine/core'
import BinarySearchMenu from '../algorithms/BinarySearch/BinarySearchMenu'
import BinaryTreeMenu from '../algorithms/BinaryTree/BinaryTreeMenu'
import DijkstraMenu from '../algorithms/Dijkstra/DijkstraMenu'
import SortMenu from '../algorithms/Sort/SortMenu'
import styles from './sidebar.module.css'

const AlgoList = ({ setActiveAlgo }: { setActiveAlgo: (name: AlgoValues) => void }) => {
  return ALGORITHMS.map((algo) => (
    <Group key={algo.value} mt='sm' p='sm' onClick={() => setActiveAlgo(algo.value)} className={styles.sidebar_item}>
      {algo.icon}
      {algo.title}
    </Group>
  ))
}

const CurrentAlgoMenu = ({
  activeAlgo,
  setActiveAlgo,
}: {
  activeAlgo: AlgoValues | null
  setActiveAlgo: (name: AlgoValues) => void
}) => {
  switch (activeAlgo) {
    case 'binary-search':
      return <BinarySearchMenu />

    case 'sort':
      return <SortMenu />

    case 'binary-tree':
      return <BinaryTreeMenu />

    case 'dijkstra':
      return <DijkstraMenu />

    default:
      return <AlgoList setActiveAlgo={setActiveAlgo} />
  }
}

export default CurrentAlgoMenu
