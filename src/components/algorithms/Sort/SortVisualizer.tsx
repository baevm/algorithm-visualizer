import { useSortStore } from '@/stores/sortStore'
import { Flex } from '@mantine/core'
import SortBoxes from './SortBoxes'
import SortStats from './SortStats'

const SortVisualizer = () => {
  const { isShowStats } = useSortStore((state) => ({
    isShowStats: state.isShowStats,
  }))

  return (
    <Flex align='center' justify='center' h='100%' w='100%' direction='column'>
      {isShowStats && <SortStats />}
      <SortBoxes />
    </Flex>
  )
}

export default SortVisualizer
