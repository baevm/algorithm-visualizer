import { ALGORITHMS, AlgoValues } from '@/constants'
import { ActionIcon, Box, Flex, Group, ScrollArea, Title } from '@mantine/core'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import CurrentAlgoMenu from './Menu'

const SidebarTitle = ({ activeAlgo, goBack }: { activeAlgo: AlgoValues | null; goBack: () => void }) => {
  if (activeAlgo === null) {
    return (
      <Box>
        <Title order={3}>Алгоритмы</Title>
      </Box>
    )
  }

  const title = ALGORITHMS.find((a) => a.value === activeAlgo)!.title

  return (
    <Group>
      <ActionIcon variant='subtle' onClick={goBack}>
        <TbArrowNarrowLeft />
      </ActionIcon>
      <Title order={3}>{title}</Title>
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
      <Flex
        direction='column'
        my='md'
        renderRoot={(props) => <ScrollArea {...props} offsetScrollbars={true} type='auto' />}
        style={{ flex: '1' }}>
        <CurrentAlgoMenu activeAlgo={activeAlgo} setActiveAlgo={setActiveAlgo} />
      </Flex>
      {/* <div>TODO Футер...</div> */}
    </>
  )
}

export default Sidebar
