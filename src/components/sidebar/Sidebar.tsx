import { ActionIcon, Box, Flex, Group, ScrollArea, Title } from '@mantine/core'
import { useState } from 'react'
import styles from './sidebar.module.css'
import { TbArrowNarrowLeft, TbSortAscendingNumbers, TbListSearch, TbBinaryTree } from 'react-icons/tb'

const ALGORITHMS = [
  {
    title: 'Бинарный поиск',
    icon: <TbListSearch />,
    value: 'binary-search',
  },
  {
    title: 'Сортировка',
    icon: <TbSortAscendingNumbers />,
    value: 'sort',
  },
  {
    title: 'DFS',
    icon: <TbBinaryTree />,
    value: 'dfs',
  },
  {
    title: 'BFS',
    icon: <TbBinaryTree />,
    value: 'bfs',
  },
] as const

type AlgoValues = (typeof ALGORITHMS)[number]['value']

const AlgoList = ({ setActiveAlgo }: { setActiveAlgo: (name: AlgoValues) => void }) => {
  return ALGORITHMS.map((algo) => (
    <Group key={algo.value} mt='sm' p='sm' onClick={() => setActiveAlgo(algo.value)} className={styles.sidebar_item}>
      {algo.icon}
      {algo.title}
    </Group>
  ))
}

const CurrentMenuPage = ({
  activeAlgo,
  setActiveAlgo,
}: {
  activeAlgo: AlgoValues | null
  setActiveAlgo: (name: AlgoValues) => void
}) => {
  switch (activeAlgo) {
    case 'binary-search':
      return <div>Бинарный поиск</div>

    case 'sort':
      return <div>Сортировка</div>

    case 'dfs':
      return <div>DFS</div>

    case 'bfs':
      return <div>BFS</div>

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

const Sidebar = () => {
  const [activeAlgo, setActiveAlgo] = useState<AlgoValues | null>(null)

  return (
    <>
      <SidebarTitle activeAlgo={activeAlgo} goBack={() => setActiveAlgo(null)} />
      <Flex direction='column' my='md' component={ScrollArea} style={{ flex: '1' }}>
        <CurrentMenuPage activeAlgo={activeAlgo} setActiveAlgo={setActiveAlgo} />
      </Flex>
      <div>Футер...</div>
    </>
  )
}

export default Sidebar
