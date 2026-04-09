import { useEffect, useState } from 'react';
import {
  clearStoredToken,
  fetchGreetings,
  getStoredToken,
  login,
  register,
  storeToken,
} from './api/client';
import GreetingsPage from './pages/GreetingsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const layoutStyle = {
  fontFamily: 'sans-serif',
  maxWidth: 680,
  margin: '3rem auto',
  padding: '0 1rem',
};

const LOGIN_PATH = '/login';
const SIGNUP_PATH = '/signup';
const HOME_PATH = '/';

function getCurrentPath() {
  return window.location.pathname;
}

function navigate(path) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
}

export default function App() {
  const [path, setPath] = useState(() => getCurrentPath());
  const [authToken, setAuthToken] = useState(() => getStoredToken());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [greetings, setGreetings] = useState([]);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(getCurrentPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (authToken && (path === LOGIN_PATH || path === SIGNUP_PATH)) {
      navigate(HOME_PATH);
      setPath(HOME_PATH);
      return;
    }

    if (!authToken && path === HOME_PATH) {
      navigate(LOGIN_PATH);
      setPath(LOGIN_PATH);
    }
  }, [authToken, path]);

  useEffect(() => {
    if (!authToken) {
      setGreetings([]);
      return;
    }

    fetchGreetings(authToken)
      .then(setGreetings)
      .catch((err) => {
        clearStoredToken();
        setAuthToken(null);
        setError(err.message);
        navigate(LOGIN_PATH);
        setPath(LOGIN_PATH);
      });
  }, [authToken]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatusMessage('');
    setIsSubmitting(true);

    try {
      const response = await login(email, password);
      storeToken(response.token);
      setAuthToken(response.token);
      setStatusMessage('Logged in successfully.');
      setPassword('');
      navigate(HOME_PATH);
      setPath(HOME_PATH);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatusMessage('');
    setIsSubmitting(true);

    try {
      const response = await register(name, email, password);
      storeToken(response.token);
      setAuthToken(response.token);
      setStatusMessage('Account created successfully.');
      setPassword('');
      navigate(HOME_PATH);
      setPath(HOME_PATH);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearStoredToken();
    setAuthToken(null);
    setEmail('');
    setPassword('');
    setName('');
    setStatusMessage('You have been logged out.');
    setError('');
    navigate(LOGIN_PATH);
    setPath(LOGIN_PATH);
  };

  return (
    <main style={layoutStyle}>
      {path === SIGNUP_PATH ? (
        <SignupPage
          name={name}
          email={email}
          password={password}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSignupSubmit}
          isSubmitting={isSubmitting}
          onNavigateToLogin={() => {
            setError('');
            setStatusMessage('');
            navigate(LOGIN_PATH);
            setPath(LOGIN_PATH);
          }}
          error={error}
          statusMessage={statusMessage}
        />
      ) : path === LOGIN_PATH || !authToken ? (
        <LoginPage
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleLoginSubmit}
          isSubmitting={isSubmitting}
          onNavigateToSignup={() => {
            setError('');
            setStatusMessage('');
            navigate(SIGNUP_PATH);
            setPath(SIGNUP_PATH);
          }}
          error={error}
          statusMessage={statusMessage}
        />
      ) : (
        <GreetingsPage
          greetings={greetings}
          error={error}
          statusMessage={statusMessage}
          onLogout={handleLogout}
        />
      )}
    </main>
  );
}
