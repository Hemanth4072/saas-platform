const API_BASE_URL = 'http://localhost:8080';

export async function fetchGreetings() {
  const response = await fetch(`${API_BASE_URL}/api/greetings`);

  if (!response.ok) {
    throw new Error('Failed to fetch greetings from backend API');
  }

  return response.json();
}
