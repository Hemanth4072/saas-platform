export default function GreetingsPage({ greetings, error, statusMessage, onLogout }) {
  return (
    <>
      <h1>Authenticated Greeting Feed</h1>
      <p>Fetching from <code>http://localhost:8080/api/greetings</code>.</p>

      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {statusMessage && <p style={{ color: 'green' }}>{statusMessage}</p>}

      <button type="button" onClick={onLogout}>Logout</button>

      <ul>
        {greetings.map((item) => (
          <li key={item.id}>{item.message}</li>
        ))}
      </ul>
    </>
  );
}
