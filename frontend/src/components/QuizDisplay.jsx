import React from 'react'

function Difficulty({ level }) {
  const color = level === 'easy' ? 'bg-green-100' : level === 'medium' ? 'bg-yellow-100' : 'bg-red-100'
  return <span className={`badge ${color}`}>{level}</span>
}

export default function QuizDisplay({ data }) {
  if (!data) return null
  const { title, summary, key_entities, sections, quiz, related_topics } = data

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-gray-700">{summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {sections?.slice(0, 8).map((s,i) => (
            <span key={i} className="badge">{s}</span>
          ))}
        </div>
      </section>

      <section className="card">
        <h3 className="mb-2 text-xl font-semibold">Key Entities</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <div className="font-medium">People</div>
            <ul className="mt-1 list-disc pl-5 text-gray-700">
              {(key_entities?.people||[]).map((p,i)=>(<li key={i}>{p}</li>))}
            </ul>
          </div>
          <div>
            <div className="font-medium">Organizations</div>
            <ul className="mt-1 list-disc pl-5 text-gray-700">
              {(key_entities?.organizations||[]).map((p,i)=>(<li key={i}>{p}</li>))}
            </ul>
          </div>
          <div>
            <div className="font-medium">Locations</div>
            <ul className="mt-1 list-disc pl-5 text-gray-700">
              {(key_entities?.locations||[]).map((p,i)=>(<li key={i}>{p}</li>))}
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h3 className="mb-4 text-xl font-semibold">Quiz</h3>
        <ol className="space-y-6">
          {quiz?.map((q, idx) => (
            <li key={idx} className="rounded-xl border border-gray-200 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">Q{idx+1}. {q.question}</span>
                <Difficulty level={q.difficulty} />
              </div>
              <ul className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                {q.options.map((opt,i)=> (
                  <li key={i} className="rounded-lg border border-gray-200 px-3 py-2">{String.fromCharCode(65+i)}. {opt}</li>
                ))}
              </ul>
              <div className="mt-2 text-sm">
                <span className="font-semibold">Answer:</span> {q.answer}
              </div>
              <div className="text-sm text-gray-600">{q.explanation}</div>
            </li>
          ))}
        </ol>
      </section>

      {related_topics?.length ? (
        <section className="card">
          <h3 className="mb-2 text-xl font-semibold">Related Topics</h3>
          <div className="flex flex-wrap gap-2">
            {related_topics.map((t,i)=> (<span key={i} className="badge">{t}</span>))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
