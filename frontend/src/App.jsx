import { useEffect, useState } from 'react';
import {
  clearStoredToken,
  fetchGreetings,
  getStoredToken,
  login,
  register,
  storeToken,
} from './api/client';

const layoutStyle = {
  fontFamily: 'sans-serif',
  maxWidth: 680,
  margin: '3rem auto',
  padding: '0 1rem',
};

const formStyle = {
  display: 'grid',
  gap: '0.75rem',
  marginTop: '1rem',
};

const inputStyle = {
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

export default function App() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [authToken, setAuthToken] = useState(() => getStoredToken());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [greetings, setGreetings] = useState([]);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authToken) {
      setGreetings([]);
      return;
    }

    fetchGreetings(authToken)
      .then(setGreetings)
      .catch((err) => {
        setError(err.message);
        handleLogout();
      });
  }, [authToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatusMessage('');
    setIsSubmitting(true);

    try {
      const response = isLoginView
        ? await login(email, password)
        : await register(name, email, password);

      storeToken(response.token);
      setAuthToken(response.token);
      setStatusMessage(isLoginView ? 'Logged in successfully.' : 'Account created successfully.');
      setPassword('');
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
  };

  const toggleView = () => {
    setIsLoginView((previousValue) => !previousValue);
    setError('');
    setStatusMessage('');
  };

  if (!authToken) {
    return (
      <main style={layoutStyle}>
        <h1>{isLoginView ? 'Login' : 'Sign Up'}</h1>
        <p>Use your account to access protected greetings.</p>

        {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
        {statusMessage && <p style={{ color: 'green' }}>{statusMessage}</p>}

        <form onSubmit={handleSubmit} style={formStyle}>
          {!isLoginView && (
            <label>
              Name
              <input
                style={inputStyle}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              style={inputStyle}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : isLoginView ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '1rem' }}>
          {isLoginView ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button type="button" onClick={toggleView}>
            {isLoginView ? 'Sign up' : 'Login'}
          </button>
        </p>
      </main>
    );
  }

  return (
    <main style={layoutStyle}>
      <h1>Authenticated Greeting Feed</h1>
      <p>Fetching from <code>http://localhost:8080/api/greetings</code>.</p>

      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {statusMessage && <p style={{ color: 'green' }}>{statusMessage}</p>}

      <button type="button" onClick={handleLogout}>Logout</button>

      <ul>
        {greetings.map((item) => (
          <li key={item.id}>{item.message}</li>
        ))}
      </ul>
    </main>
  );
}
