import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './components/AuthContext.js'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import MostLiked from './screens/MostLiked'
import UserProfileScreen from './screens/UserProfileScreen/UserProfileScreen.js'
import {useAuth0 } from '@auth0/auth0-react'
import RestrictedRoutes from './components/CustomRouters/RestrictedRoutes'


const App = () => {


  const { user, isAuthenticated} = useAuth0()

  if(isAuthenticated){

    console.log(user);
  }
  return (
    <AuthContextProvider>
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
             
            <Route
             path="/mostliked"
             element={
              <RestrictedRoutes>
                <MostLiked></MostLiked>
              </RestrictedRoutes>
             }
            >
            </Route>

            <Route
             path="/userProfile"
             element={
              <RestrictedRoutes>
                <UserProfileScreen></UserProfileScreen>
              </RestrictedRoutes>
             }
            >
            </Route>
            
          </Routes>
        </Container>
        
        <div>
          <h3> User is {isAuthenticated ? "Logged In": "Not Logged In"}</h3>

        </div>
      </main>
      <Footer />
    </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
