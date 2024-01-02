import { Button, Group, NumberInput, Radio, Stack, Textarea } from '@mantine/core'
import { useState } from 'react'

const modes = ['auto-mode', 'steps-mode'] as const
type Mode = (typeof modes)[number]

const algorithms = ['bubble-sort', 'insertion-sort', 'selection-sort', 'merge-sort', 'quick-sort'] as const
type Algorithm = (typeof algorithms)[number]

const SortMenu = () => {
  const [array, setArray] = useState<string[]>([])
  const [algorithm, setAlgorithm] = useState<Algorithm>('bubble-sort')
  const [mode, setMode] = useState<Mode>('auto-mode')
  const [stepTimeout, setStepTimeout] = useState(1000)
  const [isWorking, setIsWorking] = useState(false)

  const onChangeArray = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const arr = e.currentTarget.value.split(',')

    setArray(arr)
  }

  const onStart = () => {
    // setIsWorking()
  }

  return (
    <Stack>
      <Textarea
        label='Массив для сортировки'
        placeholder='Введите массив в формате 1,2,3,4...'
        value={array.join(',')}
        onChange={onChangeArray}
      />

      <Radio.Group
        label='Алгоритм'
        defaultValue={algorithm}
        value={algorithm}
        onChange={(v) => setAlgorithm(v as Algorithm)}>
        <Stack>
          <Radio label='Сортировка пузырьком' value='bubble-sort' />
          <Radio label='Сортировка вставками' value='insertion-sort' />
          <Radio label='Сортировка выбором' value='selection-sort' />
          <Radio label='Сортировка слиянием' value='merge-sort' />
          <Radio label='Быстрая сортировка' value='quick-sort' />
        </Stack>
      </Radio.Group>

      <Radio.Group label='Режим работы' defaultValue={mode} value={mode} onChange={(v) => setMode(v as Mode)}>
        <Stack>
          <Radio label='Автоматически' value='auto-mode' />
          <Radio label='По шагам' value='steps-mode' />
        </Stack>
      </Radio.Group>

      {mode === 'auto-mode' && (
        <NumberInput
          label='Задержка (мс)'
          description='Задержка между шагами алгоритма'
          placeholder='Введите число...'
          value={stepTimeout}
          onChange={(num) => setStepTimeout(+num)}
        />
      )}

      <Group justify='space-between' grow>
        <Button>Рандом</Button>
        <Button>Сбросить</Button>
      </Group>

      <Group justify='space-between' grow>
        {!isWorking ? (
          <Button onClick={onStart}>Запуск</Button>
        ) : (
          <>
            {mode === 'steps-mode' && (
              <>
                <Button>Шаг назад</Button>
                <Button>Шаг вперед</Button>
              </>
            )}
          </>
        )}
      </Group>
    </Stack>
  )
}

export default SortMenu
