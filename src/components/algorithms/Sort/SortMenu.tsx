import { generateUnsortedArray } from '@/lib/random'
import { useSortStore } from '@/stores/sortStore'
import { Button, Group, NumberInput, Radio, Stack, Switch, Textarea } from '@mantine/core'
import { useEffect, useState } from 'react'

const modes = ['auto-mode', 'steps-mode'] as const
type Mode = (typeof modes)[number]

const algorithms = ['bubble-sort', 'insertion-sort', 'selection-sort', 'merge-sort', 'quick-sort'] as const
type Algorithm = (typeof algorithms)[number]

const SortMenu = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>('bubble-sort')
  const [mode, setMode] = useState<Mode>('auto-mode')
  const [stepTimeout, setStepTimeout] = useState(500)
  const [arraySize, setArraySize] = useState('20')

  const {
    array,
    isWorking,
    isShowNumbers,
    isSorted,
    setIsShowNumbers,
    setArray,
    startWorking,
    nextStepBubbleSort,
    reset,
    pause,
  } = useSortStore((state) => ({
    array: state.array,
    isWorking: state.isWorking,
    isShowNumbers: state.isShowNumbers,
    isSorted: state.isSorted,
    pause: state.pause,
    setArray: state.setArray,
    startWorking: state.startWorking,
    setIsShowNumbers: state.setIsShowNumbers,
    nextStepBubbleSort: state.nextStepBubbleSort,
    reset: state.reset,
  }))

  const setRandomData = () => {
    const array = generateUnsortedArray(+arraySize).map((item) => item.toString())

    setArray(array)
  }

  const onChangeArray = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const arr = e.currentTarget.value.split(',')

    setArray(arr)
  }

  const onStart = () => {
    startWorking()
  }

  // react... but atleast it works
  // auto-mode steps
  useEffect(() => {
    if (isWorking && mode === 'auto-mode') {
      const timer = setInterval(() => {
        nextStepBubbleSort()

        if (isSorted) {
          clearInterval(timer)
        }
      }, stepTimeout)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isWorking, mode, stepTimeout, nextStepBubbleSort, isSorted])

  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  return (
    <Stack>
      <Group justify='space-between' grow>
        <Button onClick={setRandomData}>Рандом</Button>
        <Button onClick={reset}>Сбросить</Button>
      </Group>

      <Group justify='space-between' grow>
        {!isWorking && <Button onClick={onStart}>Запуск</Button>}

        {isWorking && mode === 'steps-mode' && (
          <>
            <Button>Шаг назад</Button>
            <Button onClick={nextStepBubbleSort}>Шаг вперед</Button>
          </>
        )}

        {isWorking && mode === 'auto-mode' && <Button onClick={pause}>Пауза</Button>}
      </Group>

      <Textarea
        label='Массив для сортировки'
        autosize
        placeholder='Введите массив в формате 1,2,3,4...'
        value={array.join(',')}
        onChange={onChangeArray}
        disabled={isWorking}
      />

      <NumberInput
        label='Размер массива'
        placeholder='Введите размер...'
        description='Для случайной генерации'
        value={arraySize || ''}
        onChange={(v) => setArraySize(v.toString())}
        hideControls={true}
        disabled={isWorking}
      />

      <Switch
        label='Показывать числа'
        checked={isShowNumbers}
        onChange={(e) => setIsShowNumbers(e.currentTarget.checked)}
        disabled={isWorking}
      />

      <Radio.Group
        label='Алгоритм'
        defaultValue={algorithm}
        value={algorithm}
        onChange={(v) => setAlgorithm(v as Algorithm)}>
        <Stack>
          <Radio label='Сортировка пузырьком' value='bubble-sort' disabled={isWorking} />
          <Radio label='Сортировка вставками' value='insertion-sort' disabled={true} />
          <Radio label='Сортировка выбором' value='selection-sort' disabled={true} />
          <Radio label='Сортировка слиянием' value='merge-sort' disabled={true} />
          <Radio label='Быстрая сортировка' value='quick-sort' disabled={true} />
        </Stack>
      </Radio.Group>

      <Radio.Group label='Режим работы' defaultValue={mode} value={mode} onChange={(v) => setMode(v as Mode)}>
        <Stack>
          <Radio label='Автоматически' value='auto-mode' disabled={isWorking} />
          <Radio label='По шагам' value='steps-mode' disabled={isWorking} />
        </Stack>
      </Radio.Group>

      {mode === 'auto-mode' && (
        <NumberInput
          label='Задержка (мс)'
          description='Задержка между шагами алгоритма'
          placeholder='Введите число...'
          value={stepTimeout}
          onChange={(num) => setStepTimeout(+num)}
          disabled={isWorking}
        />
      )}
    </Stack>
  )
}

export default SortMenu
