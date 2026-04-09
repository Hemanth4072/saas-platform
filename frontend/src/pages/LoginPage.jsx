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

export default function LoginPage({ email, password, onEmailChange, onPasswordChange, onSubmit, isSubmitting, onNavigateToSignup, error, statusMessage }) {
  return (
    <>
      <h1>Login</h1>
      <p>Use your account to access protected greetings.</p>

      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {statusMessage && <p style={{ color: 'green' }}>{statusMessage}</p>}

      <form onSubmit={onSubmit} style={formStyle}>
        <label>
          Email
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Don't have an account?{' '}
        <button type="button" onClick={onNavigateToSignup}>
          Sign up
        </button>
      </p>
    </>
  );
}
