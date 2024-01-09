import { useAutoMode } from '@/hooks/useAutoMode'
import { Mode, useOperatingMode } from '@/hooks/useOperatingMode'
import { useDijkstraStore } from '@/stores/dijkstraStore'
import { Button, Group, NumberInput, Radio, Stack, TextInput, Textarea } from '@mantine/core'
import { useEffect, useState } from 'react'
import { GraphEdge, GraphNode } from 'reagraph'

const defaultNodes: GraphNode[] = [
  {
    id: 'n-0',
    label: '0',
  },
  {
    id: 'n-1',
    label: '1',
  },
  {
    id: 'n-2',
    label: '2',
  },
  {
    id: 'n-3',
    label: '3',
  },
  {
    id: 'n-4',
    label: '4',
  },
]

const defaultEdges: GraphEdge[] = [
  {
    id: '0->1',
    source: 'n-0',
    target: 'n-1',
    label: '',
  },
  {
    id: '0->2',
    source: 'n-0',
    target: 'n-2',
    label: '',
  },
  {
    id: '0->3',
    source: 'n-0',
    target: 'n-3',
    label: '',
  },
  {
    id: '0->4',
    source: 'n-0',
    target: 'n-4',
    label: '',
  },
  {
    id: '3->2',
    source: 'n-3',
    target: 'n-2',
    label: '',
  },
]

function formatEdgesToText(edges: GraphEdge[]) {
  return edges.map((edge) => `${edge.source[2]}->${edge.target[2]}`).join('\n')
}

function formatTextToEdges(text: string) {
  return text.split('\n').map((line) => {
    const [source, target] = line.split('->')

    const edge: GraphEdge = {
      id: `${source}->${target}`,
      source: `n-${source}`,
      target: `n-${target}`,
      label: '',
    }

    return edge
  })
}

function getNodesFromEdges(edges: GraphEdge[]) {
  return edges.reduce((acc, edge) => {
    const node: GraphNode = {
      id: edge.source,
      label: edge.source[2],
    }

    if (!acc.find((n) => n.id === node.id)) {
      acc.push(node)
    }

    const node2: GraphNode = {
      id: edge.target,
      label: edge.target[2],
    }

    if (!acc.find((n) => n.id === node2.id)) {
      acc.push(node2)
    }

    return acc
  }, [] as GraphNode[])
}

const DijkstraMenu = () => {
  const [textAreaEdges, setTextAreaEdges] = useState(formatEdgesToText(defaultEdges))
  const { mode, setMode } = useOperatingMode()
  const { edges, nodes, isWorking, isFound, startWorking, nextStep, reset, pause, setEdges, setNodes } =
    useDijkstraStore((state) => ({
      edges: state.edges,
      nodes: state.nodes,
      isWorking: state.isWorking,
      isFound: state.isFound,
      pause: state.pause,
      startWorking: state.startWorking,
      nextStep: state.nextStep,
      reset: state.reset,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
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

  const onChangeArray = () => {
    const text = textAreaEdges.trim()

    if (!text) {
      setEdges([])
      setNodes([])
      return
    }

    const edges = formatTextToEdges(text)
    const nodes = getNodesFromEdges(edges)

    console.log({ edges, nodes })

    setEdges(edges)
    setNodes(nodes)
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
      <Button onClick={onChangeArray}>Сохранить</Button>

      <TextInput label='Начальная вершина' disabled={isWorking} placeholder='Введите начальную вершину...' />
      <TextInput label='Конечная вершина' disabled={isWorking} placeholder='Введите конечную вершину...' />

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
