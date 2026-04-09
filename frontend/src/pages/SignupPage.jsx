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

export default function SignupPage({ name, email, password, onNameChange, onEmailChange, onPasswordChange, onSubmit, isSubmitting, onNavigateToLogin, error, statusMessage }) {
  return (
    <>
      <h1>Sign Up</h1>
      <p>Create an account to access protected greetings.</p>

      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {statusMessage && <p style={{ color: 'green' }}>{statusMessage}</p>}

      <form onSubmit={onSubmit} style={formStyle}>
        <label>
          Name
          <input
            style={inputStyle}
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            required
          />
        </label>

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
          {isSubmitting ? 'Submitting...' : 'Create Account'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Already have an account?{' '}
        <button type="button" onClick={onNavigateToLogin}>
          Login
        </button>
      </p>
    </>
  );
}
