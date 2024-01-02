import { useBinarySearch } from '@/stores/binarySearchStore'
import { Box, Flex, Group, Stack } from '@mantine/core'
import { useEffect } from 'react'
import { TbArrowNarrowUp } from 'react-icons/tb'

const BinarySearchVisualizer = () => {
  const { array, left, mid, right, isFound, isNotExist } = useBinarySearch((state) => ({
    array: state.array,
    target: state.target,
    left: state.left,
    right: state.right,
    mid: state.mid,
    isFound: state.isFound,
    isNotExist: state.isNotExist,
  }))

  useEffect(() => {
    if (isFound) {
      alert(`Число найдено. Индекс: ${mid}.`)
    }

    if (isNotExist) {
      alert(`Число не найдено.`)
    }
  }, [isFound, isNotExist])

  return (
    <Flex align='center' justify='center' h='100%' w='100%'>
      <Group>
        {array.map((item, index) => (
          <Box className='item' py='30px' style={{ position: 'relative' }} key={index}>
            <Box
              style={{
                minWidth: '60px',
                minHeight: '60px',
                padding: '12px',
                border: '1px solid var(--mantine-color-blue-light-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                fontWeight: index < left || index > right ? 'normal' : 'bold',
                backgroundColor:
                  index < left || index > right ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-body)',
              }}>
              {item}
            </Box>

            <Box
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
              {index == left && (
                <Stack gap='0' align='center'>
                  <TbArrowNarrowUp />
                  left
                </Stack>
              )}
              {index == mid && (
                <Stack gap='0' align='center'>
                  <TbArrowNarrowUp />
                  mid
                </Stack>
              )}
              {index == right && (
                <Stack gap='0' align='center'>
                  <TbArrowNarrowUp />
                  right
                </Stack>
              )}
            </Box>
          </Box>
        ))}
      </Group>
    </Flex>
  )
}

export default BinarySearchVisualizer
