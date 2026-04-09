import { useEffect, useState } from 'react';
import { fetchGreetings } from './api/client';

export default function App() {
  const [greetings, setGreetings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGreetings()
      .then(setGreetings)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 680, margin: '3rem auto' }}>
      <h1>React Frontend + Spring Boot Backend</h1>
      <p>Fetching from <code>http://localhost:8080/api/greetings</code>.</p>

      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      <ul>
        {greetings.map((item) => (
          <li key={item.id}>{item.message}</li>
        ))}
      </ul>
    </main>
  );
}
