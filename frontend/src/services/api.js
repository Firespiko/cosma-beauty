const API_BASE_URL = 'http://localhost:5000';

export async function searchConcerns(concern) {
  const response = await fetch(`${API_BASE_URL}/search?concern=${encodeURIComponent(concern)}`);
  if (!response.ok) throw new Error('Search API error');
  return response.json();
}

export async function submitEnquiry(data) {
  const response = await fetch(`${API_BASE_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Submit enquiry failed');
  }
  return response.json();
}

export async function getEnquiries() {
  const response = await fetch(`${API_BASE_URL}/admin/enquiries`);
  if (!response.ok) throw new Error('Admin enquiries API error');
  return response.json();
}
