import { generateRandomSortedArray } from '@/lib/random'
import { useBinarySearch } from '@/stores/binarySearchStore'
import { Button, Group, NumberInput, Radio, Stack, Textarea } from '@mantine/core'
import { useEffect, useState } from 'react'

const modes = ['auto-mode', 'steps-mode'] as const
type Mode = (typeof modes)[number]

const BinarySearchMenu = () => {
  const { array, target, isWorking, isFound, setArray, setIsWorking, setTarget, nextStep, beforeStep, reset } =
    useBinarySearch((state) => ({
      array: state.array,
      target: state.target,
      isWorking: state.isWorking,
      isFound: state.isFound,
      setArray: state.setArray,
      setTarget: state.setTarget,
      nextStep: state.nextStep,
      beforeStep: state.beforeStep,
      reset: state.reset,
      setIsWorking: state.setIsWorking,
    }))

  const [mode, setMode] = useState<Mode>('auto-mode')
  const [stepTimeout, setStepTimeout] = useState(1000)

  const setRandomData = () => {
    const min = 1
    const max = 100
    const size = 12

    const rndArr = generateRandomSortedArray(size, min, max)
    const rndTargetFromArr = rndArr[Math.floor(Math.random() * rndArr.length)]

    setArray(rndArr)
    setTarget(rndTargetFromArr)
  }

  const onChangeArray = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const arr = e.currentTarget.value.split(',')

    setArray(arr)
  }

  const onStart = () => {
    setIsWorking()
  }

  // react... but atleast it works
  // auto-mode steps
  useEffect(() => {
    if (isWorking && mode === 'auto-mode') {
      const timer = setInterval(() => {
        nextStep()

        if (isFound) {
          clearInterval(timer)
        }
      }, stepTimeout)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isWorking, mode, stepTimeout, nextStep, isFound])

  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  return (
    <Stack>
      <Textarea
        label='Массив для поиска'
        placeholder='Введите массив в формате 1,2,3,4...'
        disabled={isWorking}
        value={array.join(',')}
        onChange={onChangeArray}
      />
      <NumberInput
        label='Число для поиска'
        placeholder='Введите число...'
        disabled={isWorking}
        value={target || ''}
        onChange={(num) => setTarget(num.toString())}
      />

      <Radio.Group label='Режим работы' defaultValue={mode} value={mode} onChange={(v) => setMode(v as Mode)}>
        <Stack>
          <Radio disabled={isWorking} label='Автоматически' value='auto-mode' />
          <Radio disabled={isWorking} label='По шагам' value='steps-mode' />
        </Stack>
      </Radio.Group>

      {mode === 'auto-mode' && (
        <NumberInput
          label='Задержка (мс)'
          description='Задержка между шагами алгоритма'
          placeholder='Введите число...'
          disabled={isWorking}
          value={stepTimeout}
          onChange={(num) => setStepTimeout(+num)}
        />
      )}

      <Group justify='space-between' grow>
        <Button onClick={setRandomData}>Рандом</Button>
        <Button onClick={reset}>Сбросить</Button>
      </Group>

      <Group justify='space-between' grow>
        {!isWorking ? (
          <Button onClick={onStart}>Запуск</Button>
        ) : (
          <>
            {mode === 'steps-mode' && (
              <>
                <Button onClick={beforeStep}>Шаг назад</Button>
                <Button onClick={nextStep}>Шаг вперед</Button>
              </>
            )}
          </>
        )}
      </Group>
    </Stack>
  )
}

export default BinarySearchMenu
