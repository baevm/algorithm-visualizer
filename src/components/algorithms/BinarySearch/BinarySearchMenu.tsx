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

const BinarySearchMenu = () => {
  const [array, setArray] = useState<string[]>([])
  const [target, setTarget] = useState('')
  const [mode, setMode] = useState('auto-mode')
  const [timeout, setTimeout] = useState(1000)
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [isWorking, setIsWorking] = useState(false)

  const setRandomData = () => {
    const min = 1
    const max = 100
    const size = 10

    const rndArr = generateRandomArray(size, min, max)
    const rndTargetFromArr = rndArr[Math.floor(Math.random() * rndArr.length)]

    setArray(rndArr)
    setTarget(rndTargetFromArr)
  }

  const onChangeArray = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const arr = e.currentTarget.value.split(',')

    setArray(arr)
  }

  const onStart = () => {
    const arrOfNums = []

    for (let i = 0; i < array.length; i++) {
      if (isNaN(parseInt(array[i]))) {
        setError('Массив должен состоять из чисел')
        return
      }

      arrOfNums.push(parseInt(array[i]))
    }

    setIsWorking(true)
  }

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
        value={target}
        onChange={(num) => setTarget(num.toString())}
      />

      <Radio.Group label='Режим работы' defaultValue={mode} value={mode} onChange={setMode}>
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
        <Button onClick={onStart}>Запуск</Button>
        <Button>Сбросить</Button>
      </Group>

      {/* <Group grow>
        <Button>Назад</Button>
        <Button>Дальше</Button>
      </Group> */}
    </Stack>
  )
}

export default BinarySearchMenu
