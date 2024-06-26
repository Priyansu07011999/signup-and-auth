import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/AuthContext';

const MainNavigation = () => {
  const athctx= useContext(AuthContext)
  const history = useHistory()
  const isLoggedIn = athctx.isLoggedIn

  const logoutHandler = () => {
    athctx.logout()
    history.replace('/auth')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (<li>
            <Link to='/auth'>Login</Link>
          </li>)}
          
          {isLoggedIn && (<li>
            <Link to='/profile'>Profile</Link>
          </li>)}
          
          {isLoggedIn && (<li>
            <button onClick={logoutHandler}>Logout</button>
          </li>)}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
