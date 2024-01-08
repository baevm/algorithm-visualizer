import { useAutoMode } from '@/hooks/useAutoMode'
import { Mode, useOperatingMode } from '@/hooks/useOperatingMode'
import { useDijkstraStore } from '@/stores/dijkstraStore'
import { Button, Group, NumberInput, Radio, Stack, TextInput, Textarea } from '@mantine/core'

const DijkstraMenu = () => {
  const { mode, setMode } = useOperatingMode()
  const { isWorking, startWorking, nextStep, reset, pause, isFound } = useDijkstraStore((state) => ({
    isWorking: state.isWorking,
    isFound: state.isFound,
    pause: state.pause,
    startWorking: state.startWorking,
    nextStep: state.nextStep,
    reset: state.reset,
  }))
  const { stepTimeout, setStepTimeout } = useAutoMode({
    isFound,
    isWorking,
    mode,
    timeout: 1000,
    nextStep,
  })

  const setRandomData = () => {}

  const onChangeArray = (e: React.ChangeEvent<HTMLTextAreaElement>) => {}

  return (
    <Stack>
      <Group justify='space-between' grow>
        <Button onClick={setRandomData}>Рандом</Button>
        <Button onClick={reset}>Сбросить</Button>
      </Group>
      <Group justify='space-between' grow>
        {!isWorking && <Button onClick={startWorking}>Запуск</Button>}

        {isWorking && mode === 'steps-mode' && (
          <>
            <Button disabled>Шаг назад</Button>
            <Button onClick={nextStep}>Шаг вперед</Button>
          </>
        )}

        {isWorking && mode === 'auto-mode' && <Button onClick={pause}>Пауза</Button>}
      </Group>

      <Textarea
        label='Список рёбер'
        autosize
        placeholder={'Введите список рёбер в формате:\n0-1\n0-2\n0-3\n0-4\n3-2'}
        value={[].join(',')}
        onChange={onChangeArray}
        disabled={isWorking}
        minRows={6}
      />

      <TextInput label='Начальная вершина' disabled={isWorking} />
      <TextInput label='Конечная вершина' disabled={isWorking} />

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
          hideControls={true}
        />
      )}
    </Stack>
  )
}

export default DijkstraMenu
