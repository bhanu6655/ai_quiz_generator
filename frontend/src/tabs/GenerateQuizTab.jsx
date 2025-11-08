import React, { useState } from 'react'
import { generateQuiz } from '../services/api'
import QuizDisplay from '../components/QuizDisplay'

export default function GenerateQuizTab() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  async function onSubmit(e){
    e.preventDefault()
    setError('')
    setData(null)
    if(!/^https?:\/\//.test(url)) { setError('Enter a valid URL (https://...)'); return }
    try {
      setLoading(true)
      const res = await generateQuiz(url)
      setData(res)
    } catch (err) {
      setError(err.message || 'Failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="card">
        <label className="block text-sm font-medium text-gray-700">Wikipedia URL</label>
        <div className="mt-2 flex gap-2">
          <input className="input" placeholder="https://en.wikipedia.org/wiki/Alan_Turing" value={url} onChange={e=>setUrl(e.target.value)} />
          <button className="btn btn-primary" disabled={loading}>{loading? 'Generating...' : 'Generate'}</button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>

      {data && (
        <QuizDisplay data={data} />
      )}
    </div>
  )
}
