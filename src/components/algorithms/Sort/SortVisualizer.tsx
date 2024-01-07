import { useSortStore } from '@/stores/sortStore'
import { Box, Flex, Group } from '@mantine/core'

const SortVisualizer = () => {
  const { isShowNumbers, array, activeIndexes } = useSortStore((state) => ({
    array: state.array,
    isShowNumbers: state.isShowNumbers,
    activeIndexes: state.activeIndexes,
  }))

  const max = Math.max(...array.map((item) => +item))
  const len = array.length

  return (
    <Flex align='center' justify='center' h='100%' w='100%'>
      <Group
        align='flex-end'
        wrap='nowrap'
        w='100%'
        h='50%'
        gap='1px'
        style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        {array.map((item, index) => (
          <Box
            key={index}
            style={{
              border: '1px solid var(--mantine-color-blue-light-color)',
              fontWeight: 'bold',
              padding: '5px',
              width: `${100 / len}%`,
              height: `${(+item * 100) / max}%`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: 'var(--mantine-color-bright)',
              backgroundColor: activeIndexes.some((item) => item === index)
                ? 'var(--mantine-color-green-light-color)'
                : 'var(--mantine-color-body)',
            }}>
            {isShowNumbers ? item : ''}
          </Box>
        ))}
      </Group>
    </Flex>
  )
}

export default SortVisualizer
