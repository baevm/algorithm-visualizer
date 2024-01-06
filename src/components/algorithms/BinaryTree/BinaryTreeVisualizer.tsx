import { useBinaryTree } from '@/stores/binaryTreeStore'
import { Center, Flex } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import Tree from 'react-d3-tree'

function arrayToObjectTree(tree: any[]) {
  const buildTree = (index: number) => {
    if (index >= tree.length || tree[index] === 'null') {
      return { name: '', children: [] }
    }

    const node = { name: tree[index].toString(), children: [] as any }

    const leftChild = buildTree(2 * index + 1)

    if (leftChild.name !== '') {
      node.children.push(leftChild)
    }

    const rightChild = buildTree(2 * index + 2)

    if (rightChild.name !== '') {
      node.children.push(rightChild)
    }

    return node
  }

  return buildTree(0)
}

const BinaryTreeVisualizer = () => {
  const { array } = useBinaryTree((state) => ({
    array: state.array,
  }))

  const mytree = arrayToObjectTree(array)
  const ref = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }) // ширина и высота для центрирования дерева

  useEffect(() => {
    // на первом рендере задаем ширину и высоту
    if (ref.current) {
      setDimensions({ width: ref.current.offsetWidth, height: ref.current.offsetHeight })
    }

    // при ресайзе окна задаем новые значения ширины и высоты
    window.onresize = () => {
      if (ref.current) {
        setDimensions({ width: ref.current.offsetWidth, height: ref.current.offsetHeight })
      }
    }
  }, [ref])

  return (
    <Flex align='center' justify='center' h='100%' w='100%' ref={ref}>
      <Tree
        data={mytree}
        orientation='vertical'
        translate={{ x: dimensions.width / 2, y: dimensions.height / 4 }}
        zoomable={false}
        pathFunc='straight'
        collapsible={false}
        nodeSize={{ x: 100, y: 100 }}
        renderCustomNodeElement={renderRectSvgNode}
        draggable={false}
      />
    </Flex>
  )
}

export default BinaryTreeVisualizer

const renderRectSvgNode = ({ nodeDatum, toggleNode }: any) => (
  <g>
    <circle r='1.2em' onClick={toggleNode} fill='#fff'></circle>
    <foreignObject width='2.4em' height='2.4em' x='-1.2em' y='-1.2em'>
      <Center w='100%' h='100%' style={{ color: 'black' }}>
        {nodeDatum.name}
      </Center>
    </foreignObject>
  </g>
)
