import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './components/AuthContext.js'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import MostLiked from './screens/MostLiked'
import UserProfileScreen from './screens/UserProfileScreen/UserProfileScreen.js'
import RestrictedRoutes from './components/CustomRouters/RestrictedRoutes'

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} exact />

              <Route
                path='/mostliked'
                element={
                  <RestrictedRoutes>
                    <MostLiked></MostLiked>
                  </RestrictedRoutes>
                }
              ></Route>

              <Route
                path='/userProfile'
                element={
                  <RestrictedRoutes>
                    <UserProfileScreen></UserProfileScreen>
                  </RestrictedRoutes>
                }
              ></Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
