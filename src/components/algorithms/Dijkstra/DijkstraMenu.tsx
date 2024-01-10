import { Dijkstra, defaultEdges, defaultNodes } from '@/helpers/algorithms/dijkstra'
import { useAutoMode } from '@/hooks/useAutoMode'
import { Mode, useOperatingMode } from '@/hooks/useOperatingMode'
import { useDijkstraStore } from '@/stores/dijkstraStore'
import { Button, Group, NumberInput, Radio, Stack, TextInput, Textarea } from '@mantine/core'
import { useEffect, useState } from 'react'

const DijkstraMenu = () => {
  const [textAreaEdges, setTextAreaEdges] = useState(Dijkstra.formatEdgesToText(defaultEdges))
  const [sourceTarget, setSourceTarget] = useState<{ source: string; target: string }>({ source: '0', target: '6' })
  const { mode, setMode } = useOperatingMode()
  const { isWorking, isFound, startWorking, setSource, setTarget, nextStep, reset, pause, setEdges, setNodes } =
    useDijkstraStore((state) => ({
      isWorking: state.isWorking,
      isFound: state.isFound,
      pause: state.pause,
      startWorking: state.startWorking,
      nextStep: state.nextStep,
      reset: state.reset,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      setSource: state.setSource,
      setTarget: state.setTarget,
    }))

  const { stepTimeout, setStepTimeout } = useAutoMode({
    isFound,
    isWorking,
    mode,
    timeout: 1000,
    nextStep,
  })

  const setRandomData = () => {
    setNodes(defaultNodes)
    setEdges(defaultEdges)
  }

  const onSave = () => {
    const text = textAreaEdges.trim()

    if (!text || !sourceTarget.source || !sourceTarget.target) {
      setEdges([])
      setNodes([])
      return
    }

    const edges = Dijkstra.formatTextToEdges(text)
    const nodes = Dijkstra.getNodesFromEdges(edges)

    const formattedTarget = 'n-' + sourceTarget.target
    const formattedSource = 'n-' + sourceTarget.source

    setEdges(edges)
    setNodes(nodes)
    setSource(formattedSource)
    setTarget(formattedTarget)
  }

  useEffect(() => {
    setRandomData()

    return () => reset()
  }, [])

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
        placeholder={'Введите список рёбер в формате:\n0->1\n0->2\n0->3\n0->4\n3->2'}
        value={textAreaEdges}
        onChange={(e) => setTextAreaEdges(e.currentTarget.value)}
        disabled={isWorking}
        minRows={6}
      />
      <TextInput
        label='Начальная вершина'
        onChange={(e) => setSourceTarget((prev) => ({ ...prev, source: e.target.value }))}
        value={sourceTarget.source}
        disabled={isWorking}
        placeholder='Введите начальную вершину...'
      />
      <TextInput
        label='Конечная вершина'
        onChange={(e) => setSourceTarget((prev) => ({ ...prev, target: e.target.value }))}
        value={sourceTarget.target}
        disabled={isWorking}
        placeholder='Введите конечную вершину...'
      />

      <Button onClick={onSave}>Сохранить</Button>

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
