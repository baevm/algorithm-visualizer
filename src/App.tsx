import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import { IconContext } from 'react-icons'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BinarySearchVisualizer from './components/algorithms/BinarySearch/BinarySearchVisualizer'
import BinaryTreeVisualizer from './components/algorithms/BinaryTree/BinaryTreeVisualizer'
import DijkstraVisualizer from './components/algorithms/Dijkstra/DijkstraVisualizer'
import SortVisualizer from './components/algorithms/Sort/SortVisualizer'
import AppLayout from './components/layout/AppLayout'
import { colorSchemeManager } from './lib/colorSchemeManager'

const theme = createTheme({
  fontFamily: 'Nunito, sans-serif',
})

function App() {
  return (
    <MantineProvider colorSchemeManager={colorSchemeManager} theme={theme}>
      <IconContext.Provider value={{ size: '22px', color: 'var(--mantine-color-blue-light-color)' }}>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path='/' element={<div />} />
              <Route path='*' element={<div>404</div>} />
              <Route path='/binary-search' element={<BinarySearchVisualizer />} />
              <Route path='/sort' element={<SortVisualizer />} />
              <Route path='/binary-tree' element={<BinaryTreeVisualizer />} />
              <Route path='/dijkstra' element={<DijkstraVisualizer />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </IconContext.Provider>
    </MantineProvider>
  )
}

export default App
