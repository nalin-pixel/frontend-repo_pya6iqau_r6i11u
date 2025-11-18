import { useRef } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import AppUI from './components/AppUI'

function App() {
  const appRef = useRef(null)
  const scrollToApp = () => {
    const el = document.getElementById('app')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Hero onStart={scrollToApp} />
      <Features />
      <HowItWorks />
      <AppUI ref={appRef} />
      <footer className="py-10 text-center text-slate-400 bg-slate-900">
        <p>© {new Date().getFullYear()} StudySnap Web</p>
      </footer>
    </div>
  )
}

export default App
