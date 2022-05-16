import './styles/App.css';
import MainView from './components/MainView'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <nav className="Nav">
          <h3>Queue System Simulator</h3>
        </nav>
        <Routes>
          <Route path="/" element={<MainView/>} />
          <Route path="/QSimulator" element={<MainView/>} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

/* Palette
dark: #20232a
background: ##282c34
accent: #61dafb
*/

export default App;
