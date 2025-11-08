const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export async function generateQuiz(url) {
  const res = await fetch(`${API_BASE}/generate_quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
  if (!res.ok) throw new Error((await res.json()).detail || 'Failed')
  return res.json()
}

export async function getHistory() {
  const res = await fetch(`${API_BASE}/history`)
  if (!res.ok) throw new Error('Failed to load history')
  return res.json()
}

export async function getQuizById(id) {
  const res = await fetch(`${API_BASE}/quiz/${id}`)
  if (!res.ok) throw new Error('Quiz not found')
  return res.json()
}
