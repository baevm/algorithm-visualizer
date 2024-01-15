import { Sort } from '@/helpers/algorithms/sort'
import { useSortStore } from '@/stores/sortStore'
import { Group, Text } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'

const SortStats = () => {
  const [time, setTime] = useState(0)
  const { algorithm, arrayAccessCount, comparsionCount, isWorking } = useSortStore((state) => ({
    algorithm: state.algorithm,

    comparsionCount: state.comparsionCount,
    arrayAccessCount: state.arrayAccessCount,
    isWorking: state.isWorking,
  }))

  const currentAlgoritmTranslation = useMemo(() => {
    return Sort.sortAlgorithms.find((item) => item.value === algorithm)!.translation
  }, [algorithm])

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
      <Text fw='bold'>{currentAlgoritmTranslation}:</Text>
      <Text>Сравнений: {comparsionCount}</Text>
      <Text>Обращений к массиву: {arrayAccessCount}</Text>
      <Text>Время: {time} с.</Text>
    </Group>
  )
}

export default SortStats
