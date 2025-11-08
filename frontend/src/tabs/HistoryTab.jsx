import React, { useEffect, useState } from 'react'
import { getHistory, getQuizById } from '../services/api'
import HistoryTable from '../components/HistoryTable'
import Modal from '../components/Modal'
import QuizDisplay from '../components/QuizDisplay'

export default function HistoryTab(){
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState(null)

  async function load(){
    try {
      setLoading(true)
      const data = await getHistory()
      setRows(data)
    } catch (e) {
      setError(e.message || 'Failed to load history')
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  async function onDetails(id){
    try {
      setError('')
      const rec = await getQuizById(id)
      setDetail(rec.data)
      setOpen(true)
    } catch (e) {
      setError(e.message || 'Failed to load quiz')
    }
  }

  return (
    <div className="space-y-4">
      {loading && <div className="card">Loading...</div>}
      {error && <div className="card text-red-600">{error}</div>}
      {!loading && !error && (
        <HistoryTable rows={rows} onDetails={onDetails} />
      )}

      <Modal open={open} onClose={()=>setOpen(false)} title={detail?.title || 'Quiz Details'}>
        {detail ? <QuizDisplay data={detail} /> : <div>Loading...</div>}
      </Modal>
    </div>
  )
}
