import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import Visualizer from '../visualizer/Visualizer'
import { AlgoValues } from '@/constants'
import { useState } from 'react'

const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure()
  const [activeAlgo, setActiveAlgo] = useState<AlgoValues | null>(null)

  return (
    <AppShell
      header={{ height: { base: 40, md: 50, lg: 50 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding='md'>
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <Sidebar activeAlgo={activeAlgo} setActiveAlgo={setActiveAlgo} />
      </AppShell.Navbar>
      <AppShell.Main mih='100vh' h='1px'>
        <Visualizer activeAlgo={activeAlgo} />
      </AppShell.Main>
    </AppShell>
  )
}

export default AppLayout
