import { ALGORITHMS } from '@/constants'
import { Button } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'
import BinarySearchMenu from '../algorithms/BinarySearch/BinarySearchMenu'
import BinaryTreeMenu from '../algorithms/BinaryTree/BinaryTreeMenu'
import DijkstraMenu from '../algorithms/Dijkstra/DijkstraMenu'
import SortMenu from '../algorithms/Sort/SortMenu'
import classes from './sidebar.module.css'

const AlgoList = () => {
  const navigate = useNavigate()

  return ALGORITHMS.map((algo) => (
    <Button
      variant='outline'
      key={algo.value}
      size='md'
      mt='sm'
      fullWidth
      onClick={() => navigate(algo.value)}
      classNames={classes}
      leftSection={algo.icon}>
      {algo.title}
    </Button>
  ))
}

const CurrentAlgoMenu = () => {
  const algoRoute = useLocation().pathname

  switch (algoRoute) {
    case '/binary-search':
      return <BinarySearchMenu />

    case '/sort':
      return <SortMenu />

    case '/binary-tree':
      return <BinaryTreeMenu />

    case '/dijkstra':
      return <DijkstraMenu />

    default:
      return <AlgoList />
  }
}

export default CurrentAlgoMenu
