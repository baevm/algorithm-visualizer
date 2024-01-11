import { SortAlgorithm } from '@/helpers/algorithms/sort'
import { useSortStore } from '@/stores/sortStore'
import { Group, Text } from '@mantine/core'
import { useEffect, useState } from 'react'

// TODO: refactor to array. use in menu
const algorithmTranslate: Record<SortAlgorithm, string> = {
  'bubble-sort': 'Сортировка пузырьком',
  'insertion-sort': 'Сортировка вставками',
  'selection-sort': 'Сортировка выбором',
  'merge-sort': 'Сортировка слиянием',
  'quick-sort': 'Быстрая сортировка',
}

const SortStats = () => {
  const [time, setTime] = useState(0)
  const { algorithm, arrayAccessCount, comparsionCount, isWorking } = useSortStore((state) => ({
    algorithm: state.algorithm,

    comparsionCount: state.comparsionCount,
    arrayAccessCount: state.arrayAccessCount,
    isWorking: state.isWorking,
  }))

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isWorking) {
      // Clear previous time
      setTime(0)

      timer = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    } else {
      timer && clearInterval(timer)
    }

    return () => {
      timer && clearInterval(timer)
    }
  }, [isWorking])

  return (
    <Group w='100%' style={{ justifySelf: '' }}>
      <Text fw='bold'>{algorithmTranslate[algorithm]}:</Text>
      <Text>Сравнений: {comparsionCount}</Text>
      <Text>Обращений к массиву: {arrayAccessCount}</Text>
      <Text>Время: {time} с.</Text>
    </Group>
  )
}

export default SortStats
