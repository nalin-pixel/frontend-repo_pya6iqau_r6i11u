import { Upload, ScanLine, ListChecks, HelpCircle } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    { icon: Upload, title: 'Foto hochladen', desc: 'Ziehe dein Foto rein oder wähle es aus.' },
    { icon: ScanLine, title: 'KI analysiert Inhalte', desc: 'Wir erkennen Themen & Begriffe.' },
    { icon: ListChecks, title: 'Lernplan + Erklärungen', desc: 'Strukturiert & personalisiert.' },
    { icon: HelpCircle, title: 'Quiz starten', desc: 'Teste dein Wissen live.' },
  ]

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">So funktioniert's</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl bg-slate-800/60 border border-white/10 p-5 text-slate-200 backdrop-blur">
              <s.icon className="w-7 h-7 text-sky-300" />
              <h3 className="mt-3 font-semibold text-white">{s.title}</h3>
              <p className="text-slate-300 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
