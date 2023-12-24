import { useBinarySearch } from '@/stores/binarySearchStore'
import { Button, Group, NumberInput, Radio, Stack, Textarea } from '@mantine/core'
import { useState } from 'react'

function generateRandomArray(size: number, min: number, max: number) {
  const arr = []

  for (let i = 0; i < size; i++) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    arr.push(num)
  }

  return arr.sort((a, b) => a - b).map((n) => n.toString())
}

const modes = ['auto-mode', 'steps-mode'] as const
type Mode = (typeof modes)[number]

const BinarySearchMenu = () => {
  const { array, target, isWorking, setArray, setIsWorking, setTarget, nextStep, reset } = useBinarySearch((state) => ({
    array: state.array,
    target: state.target,
    isWorking: state.isWorking,
    setArray: state.setArray,
    setTarget: state.setTarget,
    nextStep: state.nextStep,
    reset: state.reset,
    setIsWorking: state.setIsWorking,
  }))

  const [mode, setMode] = useState<Mode>('auto-mode')
  const [timeout, setTimeout] = useState(1000)

  const setRandomData = () => {
    const min = 1
    const max = 100
    const size = 12

    const rndArr = generateRandomArray(size, min, max)
    const rndTargetFromArr = rndArr[Math.floor(Math.random() * rndArr.length)]

    setArray(rndArr)
    setTarget(rndTargetFromArr)
  }

  const onChangeArray = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const arr = e.currentTarget.value.split(',')

    setArray(arr)
  }

  const onStart = () => {}

  return (
    <Stack>
      <Textarea
        label='Массив для поиска'
        placeholder='Введите массив в формате 1,2,3,4...'
        value={array.join(',')}
        onChange={onChangeArray}
      />
      <NumberInput
        label='Число для поиска'
        placeholder='Введите число...'
        value={target || ''}
        onChange={(num) => setTarget(num.toString())}
      />

      <Radio.Group label='Режим работы' defaultValue={mode} value={mode} onChange={(v) => setMode(v as Mode)}>
        <Group>
          <Radio label='Автоматически' value='auto-mode' />
          <Radio label='По шагам' value='steps-mode' />
        </Group>
      </Radio.Group>

      {mode === 'auto-mode' && (
        <NumberInput
          label='Задержка (мс)'
          description='Задержка между шагами алгоритма'
          placeholder='Введите число...'
          value={timeout}
          onChange={(num) => setTimeout(+num)}
        />
      )}

      <Group justify='space-between' grow>
        <Button onClick={setRandomData}>Рандом</Button>
        <Button onClick={reset}>Сбросить</Button>
      </Group>

      <Group justify='space-between' grow>
        {!isWorking ? (
          <Button onClick={setIsWorking}>Запуск</Button>
        ) : (
          <>
            {mode === 'steps-mode' && (
              <>
                <Button onClick={nextStep}>Шаг вперед</Button>
                <Button>Шаг назад</Button>
              </>
            )}
          </>
        )}
      </Group>
    </Stack>
  )
}

export default BinarySearchMenu
