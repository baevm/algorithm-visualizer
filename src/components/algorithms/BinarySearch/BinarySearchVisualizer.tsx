import { useBinarySearch } from '@/stores/binarySearchStore'
import { Box, Flex, Group } from '@mantine/core'
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
      alert('found')
    }

    if (isNotExist) {
      alert('target not exist')
    }
  }, [isFound, isNotExist])

  return (
    <Flex align='center' justify='center' h='100%' w='100%'>
      <Group>
        {array.map((item, index) => (
          <Box style={{ position: 'relative' }} key={index}>
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
                fontWeight: 'bold',
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
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <TbArrowNarrowUp />
                  left
                </Box>
              )}
              {index == mid && (
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <TbArrowNarrowUp />
                  mid
                </Box>
              )}
              {index == right && (
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <TbArrowNarrowUp />
                  right
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Group>
    </Flex>
  )
}

export default BinarySearchVisualizer
