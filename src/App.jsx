import { Routes, Route, Navigate } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'


function App() {
  return (
    <Routes>
      <Route path='/' element={ <Navigate to='/boards/26603603-4019-4b87-856e-acb515a20cc2'/> }/>
      <Route path='/boards/:boardId' element={ <Board/> } replace = {true} />

      {/* 404 NotFound Page */}

      {/* Authentication */}
      <Route path='login' element = {<Auth/>} />
      <Route path='register' element = {<Auth/>}/>

      <Route path ='*' element ={ <NotFound/>} />
    </Routes>
  )
}

export default App

