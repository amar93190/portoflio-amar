import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import KatanaSlash from './components/KatanaSlash'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useSiteStore } from './store/siteStore'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const isReady = useSiteStore((s) => s.isReady)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Refresh ScrollTrigger once the loader exits so all scroll positions are correct
  useEffect(() => {
    if (!isReady) return
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 300)
    return () => clearTimeout(t)
  }, [isReady])

  return (
    <>
      <Loader />
      <Cursor />
      <KatanaSlash />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
