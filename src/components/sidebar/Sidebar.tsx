import { ALGORITHMS, AlgoValues } from '@/constants'
import { ActionIcon, Box, Flex, Group, ScrollArea, Title } from '@mantine/core'
import { useState } from 'react'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import BFSMenu from '../algorithms/BFS/BFSMenu'
import BinarySearchMenu from '../algorithms/BinarySearch/BinarySearchMenu'
import DFSMenu from '../algorithms/DFS/DFSMenu'
import SortMenu from '../algorithms/Sort/SortMenu'
import styles from './sidebar.module.css'

const AlgoList = ({ setActiveAlgo }: { setActiveAlgo: (name: AlgoValues) => void }) => {
  return ALGORITHMS.map((algo) => (
    <Group key={algo.value} mt='sm' p='sm' onClick={() => setActiveAlgo(algo.value)} className={styles.sidebar_item}>
      {algo.icon}
      {algo.title}
    </Group>
  ))
}

const CurrentAlgoMenu = ({
  activeAlgo,
  setActiveAlgo,
}: {
  activeAlgo: AlgoValues | null
  setActiveAlgo: (name: AlgoValues) => void
}) => {
  switch (activeAlgo) {
    case 'binary-search':
      return <BinarySearchMenu />

    case 'sort':
      return <SortMenu />

    case 'dfs':
      return <DFSMenu />

    case 'bfs':
      return <BFSMenu />

    default:
      return <AlgoList setActiveAlgo={setActiveAlgo} />
  }
}

const SidebarTitle = ({ activeAlgo, goBack }: { activeAlgo: AlgoValues | null; goBack: () => void }) => {
  if (activeAlgo === null) {
    return (
      <Box>
        <Title order={3}>Алгоритмы</Title>
      </Box>
    )
  }

  return (
    <Group>
      <ActionIcon variant='subtle' onClick={goBack}>
        <TbArrowNarrowLeft />
      </ActionIcon>
      <Title order={3}>{ALGORITHMS.find((a) => a.value === activeAlgo)!.title}</Title>
    </Group>
  )
}

const Sidebar = ({
  activeAlgo,
  setActiveAlgo,
}: {
  activeAlgo: AlgoValues | null
  setActiveAlgo: (v: AlgoValues | null) => void
}) => {
  return (
    <>
      <SidebarTitle activeAlgo={activeAlgo} goBack={() => setActiveAlgo(null)} />
      <Flex direction='column' my='md' component={ScrollArea} style={{ flex: '1' }}>
        <CurrentAlgoMenu activeAlgo={activeAlgo} setActiveAlgo={setActiveAlgo} />
      </Flex>
      <div>TODO Футер...</div>
    </>
  )
}

export default Sidebar
