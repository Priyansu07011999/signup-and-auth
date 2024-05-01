import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import './App.css'
import AuthContext from './store/AuthContext';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const athctx = useContext(AuthContext)
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          {!athctx.isLoggedIn && (<Route path='/auth'>
            <AuthPage />
          </Route>)}
          <Route path='/profile'>
            {athctx.isLoggedIn && <UserProfile />}
            {!athctx.isLoggedIn && <Redirect to = '/auth'/>}
          </Route>
          <Route path='*'>
            <Redirect to = '/'/>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
