import { useLocation, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { Image } from '@mui/icons-material'


function Auth() {
  const location = useLocation()

  // console.log(location)
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    return <Navigate to='/' replace={true}/>
  }
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      background: 'rgb(2,0,36)',
      background: 'linear-gradient(45deg, rgba(2,0,36,1) 23%, rgba(11,63,125,1) 60%, rgba(68,0,102,1) 95%)',
      color: 'white'
    }}>
      <Box sx={{
        '@keyframes stars': {
          '0%': { backgroundPosition: 'right top' },
          '100%': { backgroundPosition: 'left bottom' }
        },
        animation: 'stars 12s linear infinite alternate',
        width: '100%',
        height: '100%',
        backgroundImage: 'url("src/assets/404/particles.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{
          position : 'absolute',
          top : '30%',
          left : '10%',
          backgroundImage : 'url("src/assets/auth/person.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '40%',
          height: '40%',
        }}>
        </Box>
        <Box sx={{
          position : 'absolute',
          top : '45%',
          left : '25%',
          transformOrigin: 'center',
          animation: 'moveAround 5s linear infinite',
          '@keyframes moveAround': {
            '0%': { transform: 'rotate(0deg) translateX(200px) rotate(-180deg)' },
            '25%': { transform: 'rotate(90deg) translateX(200px) rotate(-180deg)' },
            '50%': { transform: 'rotate(180deg) translateX(200px) rotate(-180deg)' },
            '75%': { transform: 'rotate(270deg) translateX(200px) rotate(-180deg)' },
            '100%': { transform: 'rotate(360deg) translateX(200px) rotate(-180deg)' }
          },
          backgroundImage : 'url("src/assets/auth/rocket.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '10%',
          height: '10%',
        }}>
        </Box>
        <Box sx={{
          position : 'absolute',
          top : '5%',
          left : '15%',
          transformOrigin: 'center',
          animation: 'Splash 5s linear infinite',
          '@keyframes Splash': {
            '0%': { transform: 'translateX(400px) translateY(-400px)' },
            '100%': { transform: 'translateX(-400px) translateY(400px)' }
          },
          backgroundImage : 'url("src/assets/auth/asteroid.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '5%',
          height: '5%',
        }}>
        </Box>
        <Box sx={{
          position : 'absolute',
          top : '5%',
          left : '0%',
          transformOrigin: 'center',
          animation: 'Splash 10s linear infinite',
          '@keyframes Splash': {
            '0%': { transform: 'translateX(400px) translateY(-400px)' },
            '100%': { transform: 'translateX(-400px) translateY(400px)' }
          },
          backgroundImage : 'url("src/assets/auth/asteroid.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '5%',
          height: '5%',
        }}>
        </Box>
        <Box sx={{
          position : 'absolute',
          top : '5%',
          left : '65%',
          transformOrigin: 'center',
          animation: 'Splash 9s linear infinite',
          '@keyframes Splash': {
            '0%': { transform: 'translateX(750px) translateY(-650px)' },
            '100%': { transform: 'translateX(-500px) translateY(650px)' }
          },
          backgroundImage : 'url("src/assets/auth/asteroid.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '5%',
          height: '5%',
        }}>
        </Box>
        {isLogin && <LoginForm />}
        {isRegister && <RegisterForm />}
      </Box>
    </Box>
  )
}

export default Auth