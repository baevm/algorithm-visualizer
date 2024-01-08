import { ActionIcon, Flex, Stack } from '@mantine/core'
import { useRef } from 'react'
import { TbFocusCentered, TbZoomIn, TbZoomOut } from 'react-icons/tb'
import { GraphCanvas, GraphCanvasRef } from 'reagraph'

const nodes = [
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

const edges = [
  {
    id: '0->1',
    source: 'n-0',
    target: 'n-1',
    label: 'Edge 0-1',
  },
  {
    id: '0->2',
    source: 'n-0',
    target: 'n-2',
    label: 'Edge 0-2',
  },
  {
    id: '0->3',
    source: 'n-0',
    target: 'n-3',
    label: 'Edge 0-3',
  },
  {
    id: '0->4',
    source: 'n-0',
    target: 'n-4',
    label: 'Edge 0-4',
  },
  {
    id: '3->2',
    source: 'n-3',
    target: 'n-2',
    label: 'Edge 0-4',
  },
]

const actives = ['n-4']

const theme = {
  canvas: {
    background: '#fff',
  },
  node: {
    fill: '#7CA0AB',
    activeFill: '#1DE9AC',
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.2,
    label: {
      color: '#2A6475',
      stroke: '#fff',
      activeColor: '#1DE9AC',
    },
    subLabel: {
      color: '#ddd',
      stroke: 'transparent',
      activeColor: '#1DE9AC',
    },
  },
  lasso: {
    border: '1px solid #55aaff',
    background: 'rgba(75, 160, 255, 0.1)',
  },
  ring: {
    fill: '#D8E6EA',
    activeFill: '#1DE9AC',
  },
  edge: {
    fill: '#D8E6EA',
    activeFill: '#1DE9AC',
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      stroke: '#fff',
      color: '#2A6475',
      activeColor: '#1DE9AC',
      fontSize: 6,
    },
  },
  arrow: {
    fill: '#D8E6EA',
    activeFill: '#1DE9AC',
  },
  cluster: {
    stroke: '#D8E6EA',
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      stroke: '#fff',
      color: '#2A6475',
    },
  },
}

const DijkstraVisualizer = () => {
  const canvasRef = useRef<GraphCanvasRef | null>(null)

  return (
    <Flex align='center' justify='center' h='100%' w='100%' pos='relative'>
      <Stack pos='absolute' top='0' right='0' style={{ zIndex: '10' }}>
        <ActionIcon onClick={() => canvasRef.current?.centerGraph()}>
          <TbFocusCentered color='white' />
        </ActionIcon>
        <ActionIcon onClick={() => canvasRef.current?.zoomIn()}>
          <TbZoomIn color='white' />
        </ActionIcon>
        <ActionIcon onClick={() => canvasRef.current?.zoomOut()}>
          <TbZoomOut color='white' />
        </ActionIcon>
      </Stack>
      <GraphCanvas nodes={nodes} edges={edges} actives={actives} theme={theme} ref={canvasRef} draggable={false} />
    </Flex>
  )
}

export default DijkstraVisualizer
