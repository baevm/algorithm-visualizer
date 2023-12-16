import { ActionIcon, Burger, Group, Text, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { TbBulb, TbBulbOff } from 'react-icons/tb';

const Header = ({ opened, toggle }: { opened: boolean; toggle: () => void }) => {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  return (
    <Group h='100%' px='md' align='center' justify='space-between'>
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='md' />
        <Group gap='1px'>
          <Text
            pl='xs'
            size='28px'
            component='h1'
            variant='gradient'
            gradient={{ from: 'blue', to: 'teal', deg: 90 }}
            style={{ fontFamily: 'Rubik Doodle Shadow', letterSpacing: '2px', lineHeight: '1.3', fontWeight: 'bold' }}>
            AlgoHub
          </Text>
        </Group>
      </Group>
      <Group>
        <ActionIcon variant='subtle' onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}>
          {computedColorScheme === 'dark' ? <TbBulb /> : <TbBulbOff />}
        </ActionIcon>
      </Group>
    </Group>
  )
}

export default Header
