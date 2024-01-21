import { sortStore } from '@/stores/sortStore'
import { Box, Group, Stack } from '@mantine/core'
import { observer } from 'mobx-react-lite'

const SortBoxes = observer(() => {
  const { isShowNumbers, array, activeIndexes } = sortStore

  const max = Math.max(...array.map((item) => +item))
  const len = array.length

  return (
    <Stack justify='center' w='100%' h='100%'>
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
              width: `${(100 / len) * 10}%`,
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
    </Stack>
  )
})

export default SortBoxes
