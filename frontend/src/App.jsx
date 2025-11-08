import React, { useState } from 'react'
import GenerateQuizTab from './tabs/GenerateQuizTab'
import HistoryTab from './tabs/HistoryTab'

export default function App() {
  const [active, setActive] = useState('generate')

  return (
    <div className="container py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">AI Wiki Quiz Generator</h1>
        <p className="text-gray-600">Turn Wikipedia articles into structured quizzes.</p>
      </header>

      <div className="mb-4 flex gap-2">
        <button className={`btn ${active==='generate'?'btn-primary':'btn-secondary'}`} onClick={()=>setActive('generate')}>Generate Quiz</button>
        <button className={`btn ${active==='history'?'btn-primary':'btn-secondary'}`} onClick={()=>setActive('history')}>History</button>
      </div>

      {active === 'generate' ? <GenerateQuizTab/> : <HistoryTab/>}

      <footer className="mt-10 text-sm text-gray-400">
        Built with FastAPI, React, Tailwind, and LangChain + Gemini.
      </footer>
    </div>
  )
}
