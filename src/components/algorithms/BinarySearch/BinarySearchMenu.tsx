import { useAutoMode } from '@/hooks/useAutoMode'
import { Mode, useOperatingMode } from '@/hooks/useOperatingMode'
import { generateRandomSortedArray } from '@/lib/random'
import { useBinarySearch } from '@/stores/binarySearchStore'
import { Button, Group, NumberInput, Radio, Stack, Textarea } from '@mantine/core'
import { useEffect } from 'react'

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

  const { mode, setMode } = useOperatingMode()
  const { stepTimeout, setStepTimeout } = useAutoMode({
    isFound,
    isWorking,
    mode,
    timeout: 1000,
    nextStep,
  })

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

  useEffect(() => {
    setRandomData()

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
        {!isWorking ? (
          <Button onClick={setIsWorking}>Запуск</Button>
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

      <Textarea
        label='Массив для поиска'
        placeholder='Введите массив в формате 1,2,3,4...'
        disabled={isWorking}
        value={array.join(',')}
        onChange={onChangeArray}
        autosize
      />
      <NumberInput
        label='Число для поиска'
        placeholder='Введите число...'
        disabled={isWorking}
        value={target || ''}
        onChange={(num) => setTarget(num.toString())}
        hideControls={true}
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
          hideControls={true}
        />
      )}
    </Stack>
  )
}

export default BinarySearchMenu
