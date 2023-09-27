import Nav from "./components/Nav"
import Router from "./components/Router"
import { AppProvider } from "./components/AppContext"

function App() {
  
  return (
    <AppProvider>
    <Router />
    </AppProvider>
  )
}

export default App
