import { Camera, Brain, BookOpen, FileText, Sparkles } from 'lucide-react'

export default function Features() {
  const items = [
    { icon: Camera, title: 'Foto hochladen & automatisch analysieren' },
    { icon: Brain, title: 'Individuelle Lernpläne im Browser' },
    { icon: BookOpen, title: 'Erklärungen in verschiedenen Schwierigkeitsgraden' },
    { icon: FileText, title: 'Quiz & Aufgaben automatisch generiert' },
    { icon: Sparkles, title: 'Keine Registrierung, keine Installation — läuft komplett im Browser' },
  ]

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Warum StudySnap?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl bg-slate-800/60 border border-white/10 p-5 text-slate-200 backdrop-blur">
              <div className="flex items-center gap-3">
                <it.icon className="w-6 h-6 text-teal-300" />
                <h3 className="font-semibold">{it.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
