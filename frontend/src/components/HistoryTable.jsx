import React from 'react'

export default function HistoryTable({ rows, onDetails }) {
  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Past Quizzes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">URL</th>
              <th className="p-3">Generated</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="border-b last:border-0">
                <td className="p-3">{row.id}</td>
                <td className="p-3 font-medium">{row.title}</td>
                <td className="p-3 max-w-[320px] truncate"><a className="text-indigo-600 hover:underline" href={row.url} target="_blank" rel="noreferrer">{row.url}</a></td>
                <td className="p-3">{new Date(row.date_generated).toLocaleString()}</td>
                <td className="p-3">
                  <button className="btn btn-primary" onClick={()=>onDetails(row.id)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
