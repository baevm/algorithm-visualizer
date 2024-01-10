import { useDijkstraStore } from '@/stores/dijkstraStore'
import { ActionIcon, Flex, Stack } from '@mantine/core'
import { useRef } from 'react'
import { TbFocusCentered, TbZoomIn, TbZoomOut } from 'react-icons/tb'
import { GraphCanvas, GraphCanvasRef } from 'reagraph'

const theme = {
  node: {
    fill: '#7CA0AB',
    activeFill: '#1DE9AC',
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.2,
    label: {
      color: '#2A6475',
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
  const { edges, nodes, actives } = useDijkstraStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    actives: state.actives,
  }))
  const canvasRef = useRef<GraphCanvasRef | null>(null)
  // edges on graph not updated without this ???
  const copyEdges = [...edges]

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
      <GraphCanvas
        nodes={nodes}
        edges={copyEdges}
        actives={actives}
        theme={theme}
        ref={canvasRef}
        labelType='all'
        edgeLabelPosition='above'
        draggable={false}
      />
    </Flex>
  )
}

export default DijkstraVisualizer
