import { ToastContainer } from 'react-toastify'
import TasksPage from './pages/TasksPage'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <div className="app">
      <TasksPage />
      <ToastContainer position="bottom-right" autoClose={2500} />
    </div>
  )
}

export default App
