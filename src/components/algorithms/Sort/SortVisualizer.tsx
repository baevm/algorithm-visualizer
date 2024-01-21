import { sortStore } from '@/stores/sortStore'
import { Flex } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import SortBoxes from './SortBoxes'
import SortStats from './SortStats'

const SortVisualizer = observer(() => {
  const { isShowStats } = sortStore

  return (
    <Flex align='center' justify='center' h='100%' w='100%' direction='column'>
      {isShowStats && <SortStats />}
      <SortBoxes />
    </Flex>
  )
})

export default SortVisualizer
