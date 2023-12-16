import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import { IconContext } from 'react-icons'
import AppLayout from './components/layout/Layout'
import { colorSchemeManager } from './lib/colorSchemeManager'

const theme = createTheme({
  fontFamily: 'Nunito, sans-serif',
})

function App() {
  return (
    <MantineProvider colorSchemeManager={colorSchemeManager} theme={theme}>
      <IconContext.Provider value={{ size: '22px', color: 'var(--mantine-color-blue-light-color)' }}>
        <AppLayout />
      </IconContext.Provider>
    </MantineProvider>
  )
}

export default App
