import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './layouts/Layout'
import ScrollToTop from './components/ScrollToTop'
import ChatBot from './components/ChatBot'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import ReferAndEarn from './pages/ReferAndEarn'
import Connect from './pages/Connect'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import AdminRoute from './components/admin/AdminRoute'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminBlogEditor from './pages/admin/BlogEditor'
import AdminPageMeta from './pages/admin/PageMeta'
import AdminSettings from './pages/admin/Settings'

function ConditionalChatBot() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null
  return <ChatBot />
}

export default function App() {
  const [consultationOpen, setConsultationOpen] = useState(false)
  const open = () => setConsultationOpen(true)
  const close = () => setConsultationOpen(false)

  return (
    <Router>
      <ConditionalChatBot />
      <ScrollToTop />
      <Routes>
        <Route element={<Layout onConsultationClick={open} consultationOpen={consultationOpen} onCloseConsultation={close} />}>
          <Route path="/" element={<Home onConsultationClick={open} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects/:category" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/refer-and-earn" element={<ReferAndEarn />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/blog" element={<Blog />} />
        </Route>

        {/* BlogPost manages its own chrome (hides Navbar/Footer for full-page HTML posts) */}
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Admin — intentionally outside Layout, no public Navbar/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/new" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
        <Route path="/admin/edit/:slug" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
        <Route path="/admin/seo" element={<AdminRoute><AdminPageMeta /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
      </Routes>
    </Router>
  )
}
