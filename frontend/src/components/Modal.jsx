import React from 'react'

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="card max-h-[90vh] w-full max-w-3xl overflow-y-auto">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </div>
  )
}
