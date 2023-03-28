import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import MostLiked from './screens/MostLiked'
import {useAuth0 } from '@auth0/auth0-react'


const App = () => {


  const {loginWithPopup, loginWithRedirect, logout, user, isAuthenticated} = useAuth0()
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/mostliked' element={<MostLiked />} />
           
          </Routes>
        </Container>

        <div>

          <ul>
            <li> <button onClick={loginWithPopup}>log in with pop up</button></li>
          </ul>
            <ul>
            <li> <button onClick={loginWithRedirect}>log in with redirect</button></li>
          </ul>
          <ul>
            <li> <button onClick={logout}>logout</button></li>
          </ul>
         
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
