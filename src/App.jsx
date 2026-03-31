import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ConsultationModal from './components/ConsultationModal'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import ReferAndEarn from './pages/ReferAndEarn'
import Connect from './pages/Connect'

export default function App() {
  const [consultationOpen, setConsultationOpen] = useState(false)
  const open = () => setConsultationOpen(true)
  const close = () => setConsultationOpen(false)

  return (
    <Router>
      <ScrollToTop />
      <Navbar onConsultationClick={open} />
      <main>
        <Routes>
          <Route path="/" element={<Home onConsultationClick={open} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects/:category" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/refer-and-earn" element={<ReferAndEarn />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </main>
      <Footer onConsultationClick={open} />
      <ConsultationModal isOpen={consultationOpen} onClose={close} />
    </Router>
  )
}
