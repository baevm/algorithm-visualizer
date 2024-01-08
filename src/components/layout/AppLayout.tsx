import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure()

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
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main h='1px' w='100%'>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}

export default AppLayout
