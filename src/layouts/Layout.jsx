import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ConsultationModal from '../components/ConsultationModal'

export default function Layout({ onConsultationClick, consultationOpen, onCloseConsultation }) {
  return (
    <>
      <Navbar onConsultationClick={onConsultationClick} />
      <main>
        <Outlet />
      </main>
      <Footer onConsultationClick={onConsultationClick} />
      <ConsultationModal isOpen={consultationOpen} onClose={onCloseConsultation} />
    </>
  )
}
