import { useRef, useState } from 'react'
import { UploadCloud, FileDown, RefreshCcw } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AppUI() {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [expLevel, setExpLevel] = useState('kurz')

  const onFiles = async (files) => {
    if (!files || !files[0]) return
    const file = files[0]
    const form = new FormData()
    form.append('file', file)
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/analyze`, { method: 'POST', body: form })
      if (!res.ok) throw new Error('Upload fehlgeschlagen')
      const json = await res.json()
      setData(json)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  const exportPlan = () => {
    if (!data) return
    const lines = []
    lines.push('StudySnap Lernplan')
    data.plan.items.forEach((it) => {
      lines.push(`Tag ${it.day}: ${it.title} | Priorität: ${it.priority} | ~${it.suggested_minutes} Min`)
      it.micro_goals.forEach((m) => lines.push(`  - ${m}`))
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'studysnap-plan.txt' // simple export; could be upgraded to PDF
    a.click()
    URL.revokeObjectURL(url)
  }

  const regenerate = () => {
    if (data) setData({ ...data })
  }

  return (
    <section id="app" className="bg-slate-950 text-slate-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Upload */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); onFiles(e.dataTransfer.files) }}
          className={`rounded-3xl border-2 border-dashed p-10 flex flex-col items-center justify-center text-center transition-colors ${dragOver ? 'border-teal-300 bg-teal-900/10' : 'border-white/15 bg-slate-900/60'}`}
        >
          <UploadCloud className="w-10 h-10 text-teal-300" />
          <p className="mt-3 text-slate-200 font-medium">Ziehe dein Foto hier rein oder klicke zum Hochladen</p>
          <button onClick={() => inputRef.current?.click()} className="mt-4 rounded-full bg-teal-400 text-slate-900 font-semibold px-5 py-2">Datei wählen</button>
          <input ref={inputRef} type="file" accept="image/*,.pdf,.txt" className="hidden" onChange={(e) => onFiles(e.target.files)} />
          {loading && <p className="mt-3 text-sky-300">Analysiere...</p>}
        </div>

        {/* Output */}
        {data && (
          <div className="mt-10 grid lg:grid-cols-2 gap-6">
            {/* Zusammenfassung */}
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
              <h3 className="text-xl font-semibold">Zusammenfassung</h3>
              <p className="mt-2 text-slate-300">{data.study.summary}</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <div>
                  <h4 className="font-semibold text-teal-300">Themen</h4>
                  <ul className="list-disc list-inside text-slate-300 text-sm">
                    {data.study.topics.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sky-300">Unterthemen</h4>
                  <ul className="list-disc list-inside text-slate-300 text-sm">
                    {data.study.subtopics.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold text-violet-300">Wichtige Begriffe</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.study.key_terms.map((k, i) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-white/10 text-slate-200 text-xs">{k}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Lernplan */}
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Lernplan</h3>
                <button onClick={exportPlan} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-violet-400 text-slate-900 font-semibold px-4 py-2">
                  <FileDown className="w-4 h-4" /> Plan exportieren
                </button>
              </div>
              <ul className="mt-3 space-y-3">
                {data.plan.items.map((it, i) => (
                  <li key={i} className="rounded-xl bg-slate-800/60 border border-white/10 p-3">
                    <div className="text-sm text-slate-300">Tag {it.day} • Priorität: {it.priority} • ~{it.suggested_minutes} Min</div>
                    <div className="font-medium">{it.title}</div>
                    <ul className="list-disc list-inside text-slate-300 text-sm mt-1">
                      {it.micro_goals.map((m, j) => <li key={j}>{m}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            {/* Erklärungen */}
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
              <div className="flex items-center gap-2">
                {['kurz','normal','tief'].map(l => (
                  <button key={l} onClick={() => setExpLevel(l)} className={`px-3 py-1.5 rounded-full text-sm ${expLevel===l ? 'bg-teal-400 text-slate-900' : 'bg-white/10 text-slate-200'}`}>{l}</button>
                ))}
              </div>
              <div className="mt-3 text-slate-300">
                {data.explanations.find(e => e.level === expLevel)?.content}
              </div>
            </div>

            {/* Tipps */}
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
              <h3 className="text-xl font-semibold">Tipps & Hacks ({data.tips.subject})</h3>
              <ul className="mt-2 list-disc list-inside text-slate-300">
                {data.tips.tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>

            {/* Quiz */}
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Quiz</h3>
                <button onClick={regenerate} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-slate-200">
                  <RefreshCcw className="w-4 h-4" /> Neue Fragen generieren
                </button>
              </div>
              <div className="mt-3 space-y-4">
                {data.quiz.map((q, i) => (
                  <QuizItem key={i} q={q} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function QuizItem({ q }) {
  const [selected, setSelected] = useState(null)
  return (
    <div className="rounded-xl bg-slate-800/60 border border-white/10 p-4">
      <div className="font-medium">{q.question}</div>
      <div className="mt-2 grid gap-2">
        {q.options.map((o, i) => (
          <button key={i} onClick={() => setSelected(i)} className={`text-left px-3 py-2 rounded-lg border ${selected===i ? (o.correct ? 'bg-teal-400 text-slate-900 border-teal-300' : 'bg-red-400/30 border-red-300/40') : 'bg-white/5 border-white/10 text-slate-200'}`}>
            {o.text}
          </button>
        ))}
      </div>
      {selected!==null && (
        <div className={`mt-2 text-sm ${q.options[selected].correct ? 'text-teal-300' : 'text-red-300'}`}>
          {q.options[selected].correct ? 'Richtig!' : 'Nicht ganz.'} {q.explanation}
        </div>
      )}
    </div>
  )
}
