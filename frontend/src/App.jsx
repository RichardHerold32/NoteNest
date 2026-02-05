import {Route, Routes} from 'react-router'
import HomePage from './Pages/HomePage.jsx'
import NoteDetailPage from './Pages/NoteDetailPage.jsx'
import CreatePage from './Pages/CreatePage.jsx'
import Navbar from './components/Navbar.jsx'

const App = () => {
  return (
    <div data-theme="lofi" className="app-gradient">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
    
  )
}

export default App
