import { binaryTreeStore } from '@/stores/binaryTreeStore'
import { Center, Flex, Text } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import Tree, { CustomNodeElementProps } from 'react-d3-tree'

const BinaryTreeVisualizer = observer(() => {
  const treeContainer = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }) // ширина и высота для центрирования дерева
  const { array, currentNode } = binaryTreeStore

  const objectTree = arrayToObjectTree(array)

  useEffect(() => {
    // на первом рендере задаем ширину и высоту
    if (treeContainer.current) {
      setDimensions({ width: treeContainer.current.offsetWidth, height: treeContainer.current.offsetHeight })
    }

    // при ресайзе окна задаем новые значения ширины и высоты
    window.onresize = () => {
      if (treeContainer.current) {
        setDimensions({ width: treeContainer.current.offsetWidth, height: treeContainer.current.offsetHeight })
      }
    }
  }, [treeContainer])

  return (
    <Flex align='center' justify='center' h='100%' w='100%' ref={treeContainer}>
      <Tree
        data={objectTree}
        orientation='vertical'
        translate={{ x: dimensions.width / 2, y: dimensions.height / 4 }}
        zoomable={false}
        pathFunc='straight'
        collapsible={false}
        nodeSize={{ x: 100, y: 100 }}
        renderCustomNodeElement={(props) => <CircleNode {...props} target={currentNode} />}
        draggable={false}
      />
    </Flex>
  )
})

export default BinaryTreeVisualizer

type CircleNodeProps = CustomNodeElementProps & { target: string | null }

const CircleNode = ({ target, nodeDatum, toggleNode }: CircleNodeProps) => {
  const circleBorderColor =
    nodeDatum.name === target ? 'var(--mantine-color-green-light-color)' : 'var(--mantine-color-blue-light-color)'

  const circleBackgroundColor =
    nodeDatum.name === target ? 'var(--mantine-color-green-light)' : 'var(--mantine-color-blue-light)'

  return (
    <g>
      <circle r='1.2em' onClick={toggleNode} fill='#fff' stroke={circleBorderColor} strokeWidth='2'></circle>
      <foreignObject width='2.4em' height='2.4em' x='-1.2em' y='-1.2em'>
        <Center w='100%' h='100%' bg={circleBackgroundColor} style={{ color: 'black', borderRadius: '50%' }}>
          <Text fw='bold'>{nodeDatum.name}</Text>
        </Center>
      </foreignObject>
    </g>
  )
}

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
