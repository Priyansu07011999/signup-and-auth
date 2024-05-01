import classes from './ProfileForm.module.css';
import { useRef, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';

const ProfileForm = () => {

  const history = useHistory();
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDtdmfJq5vu4R3Hb4pMw-jcjhfkFv1jVWE', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken:true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          history.replace('/');
        } else {
          throw new Error('Password change failed!');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input style={{color: 'black'}} type='password' id='new-password' minLength="7" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
