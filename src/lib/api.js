export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

async function handle(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  async test() {
    const res = await fetch(`${API_BASE}/test`);
    return handle(res);
  },
  async seedDemo() {
    const res = await fetch(`${API_BASE}/seed/demo`, { method: 'POST' });
    return handle(res);
  },
  async listPredictions(params = {}) {
    const url = new URL(`${API_BASE}/predictions`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
    });
    const res = await fetch(url.toString());
    return handle(res);
  },
  async listBlogs(limit = 6) {
    const res = await fetch(`${API_BASE}/blogs?limit=${limit}`);
    return handle(res);
  },
  async getPlans() {
    const res = await fetch(`${API_BASE}/plans`);
    return handle(res);
  },
  async subscribe(email, locale = 'en', source = 'landing') {
    const res = await fetch(`${API_BASE}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, locale, source })
    });
    return handle(res);
  },
  async contact(payload) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handle(res);
  },
  async adminTestimonials(limit = 10) {
    const res = await fetch(`${API_BASE}/admin/testimonials?limit=${limit}`);
    return handle(res);
  }
};
