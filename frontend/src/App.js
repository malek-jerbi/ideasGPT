import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './components/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import MostLiked from './screens/MostLiked';
import { useAuth0 } from '@auth0/auth0-react';
import UserProfileScreen from './screens/UserProfileScreen/UserProfileScreen.js';
import RestrictedRoutes from './components/CustomRouters/RestrictedRoutes';
import { useEffect } from 'react';
import userApi from './api/UserApi';

const fetchUser = async (user, isAuthenticated, setDbUser, getAccessTokenSilently) => {
  if (isAuthenticated) {
    try {
      const { email, name } = user;
      const token = await getAccessTokenSilently();

      const response = await userApi.createUser({ email, name }, token);
      setDbUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
};

const App = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { dbUser, setDbUser } = useAuthContext();

  useEffect(() => {
    fetchUser(user, isAuthenticated, setDbUser, getAccessTokenSilently);
  }, [user, isAuthenticated, setDbUser, getAccessTokenSilently]);

  if (isAuthenticated) {
    console.log(user);
  }

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen dbUser={dbUser} setDbUser={setDbUser} />} exact />
            <Route path="/profile" element={<UserProfileScreen />} />
            {/* ... the rest of the routes ... */}
          </Routes>
        </Container>
        <div>
          <h3>User is {isAuthenticated ? 'Logged In' : 'Not Logged In'}</h3>
          {isAuthenticated && (
            <p style={{ color: 'white', fontFamily: 'Verdana, sans-serif' }}>
              User's Credits: {dbUser && dbUser.credits}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
          }


export default App;
