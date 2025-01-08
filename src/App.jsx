import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from '~pages/Settings/Settings'
const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to='/login' replace={true}/>
  }
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      <Route path='/' element={ <Navigate to='/boards/26603603-4019-4b87-856e-acb515a20cc2'/> }/>

      {/* Outlet of react-route-dom will  */}
      {/* protected route */}
      <Route element= {<ProtectedRoute user={currentUser} />}>
        <Route path='/boards/:boardId' element={ <Board/> } replace = {true} />
        {/* User Setting */}
        <Route path='/settings/account' element = {<Settings/>}/>
        <Route path='/settings/security' element = {<Settings/>}/>
      </Route>
      {/* 404 NotFound Page */}

      {/* Authentication */}
      <Route path='login' element = {<Auth/>} />
      <Route path='register' element = {<Auth/>}/>

      <Route path ='*' element ={ <NotFound/>} />
    </Routes>
  )
}

export default App

