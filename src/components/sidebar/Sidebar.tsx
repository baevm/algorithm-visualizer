import { ALGORITHMS } from '@/constants'
import { ActionIcon, Box, Flex, Group, ScrollArea, Title } from '@mantine/core'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom'
import CurrentAlgoMenu from './Menu'

const SidebarTitle = () => {
  const navigate = useNavigate()
  const algoRoute = useLocation().pathname.split('/')[1]
  const currentAlgo = ALGORITHMS.find((a) => a.value === algoRoute)

  if (!currentAlgo) {
    return (
      <Box>
        <Title order={3}>Алгоритмы</Title>
      </Box>
    )
  }

  function goBack() {
    navigate('/')
  }

  const title = currentAlgo.title

  return (
    <Group>
      <ActionIcon variant='subtle' onClick={goBack}>
        <TbArrowNarrowLeft />
      </ActionIcon>
      <Title order={3}>{title}</Title>
    </Group>
  )
}

const Sidebar = () => {
  return (
    <>
      <SidebarTitle />
      <Flex
        direction='column'
        my='md'
        renderRoot={(props) => <ScrollArea {...props} offsetScrollbars={true} type='auto' />}
        style={{ flex: '1' }}>
        <CurrentAlgoMenu />
      </Flex>
      {/* <div>TODO Футер...</div> */}
    </>
  )
}

export default Sidebar
