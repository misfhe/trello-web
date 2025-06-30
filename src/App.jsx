import { Routes, Route, Navigate } from 'react-router-dom'

import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'

function App() {
  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element = {
        <Navigate to='/boards/6751cedbfb4ee19a1fff35e8' replace = { true }/>
      }/>

      <Route path='/boards/:boardId' element={<Board />} />

      {/* authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      {/* 404 */}
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
