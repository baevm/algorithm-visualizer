import { Sort } from '@/helpers/algorithms/sort'
import { sortStore } from '@/stores/sortStore'
import { Group, Text } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

const SortStats = observer(() => {
  const [time, setTime] = useState(0)
  const { algorithm, stats, isWorking } = sortStore

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
      <Text>Сравнений: {stats.comparsionCount}</Text>
      <Text>Обращений к массиву: {stats.arrayAccessCount}</Text>
      <Text>Время: {time} с.</Text>
    </Group>
  )
})

export default SortStats
