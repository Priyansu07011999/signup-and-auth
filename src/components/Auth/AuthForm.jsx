import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../../store/AuthContext';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory()
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setFeedbackMessage('');
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;
    if (isLogin) {
      // Login URL
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[firebaseApi]';
    } else {
      // Sign up URL
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[firebase_api]';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then(data => {
        authCtx.login(data.idToken);
        history.replace('/')
        setFeedbackMessage('Authentication successful!');
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
      })
      .catch((error) => {
        setFeedbackMessage(error.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Sending request...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
            disabled={isLoading}
          >
            {isLogin
              ? 'Create new account'
              : 'Login with existing account'}
          </button>
        </div>
        {feedbackMessage && <p className={classes.feedback}>{feedbackMessage}</p>}
      </form>
    </section>
  );
};

export default AuthForm;
