import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

export default function ConsultationModal({ isOpen, onClose }) {
  const [f, sf] = useState({ name:'',email:'',phone:'',projectType:'',meetingFormat:'',message:'' })
  const submit = e => { e.preventDefault(); alert('Thank you! We will get back to you soon.'); onClose(); sf({ name:'',email:'',phone:'',projectType:'',meetingFormat:'',message:'' }) }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}/>
          <motion.div className="relative w-full max-w-lg bg-white rounded-2xl p-8 md:p-10 max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ opacity:0, y:40, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:40, scale:0.95 }}
            transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}>
            <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 grid place-items-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all"><FiX size={16}/></button>

            <span className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-gold mb-2 block">Get Started</span>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Book A Consultation</h2>
            <p className="text-sm text-gray-400 mb-8">Tell us about your project and we'll schedule a conversation.</p>

            <form onSubmit={submit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <I label="Name" value={f.name} onChange={v=>sf({...f,name:v})} required placeholder="Your name"/>
                <I label="Email" type="email" value={f.email} onChange={v=>sf({...f,email:v})} required placeholder="your@email.com"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <I label="Phone" type="tel" value={f.phone} onChange={v=>sf({...f,phone:v})} required placeholder="+91-XXXXXXXXXX"/>
                <S label="Project Type" value={f.projectType} onChange={v=>sf({...f,projectType:v})} options={['Residential','Commercial','Villa','Hospitality','Retail','Others']} required/>
              </div>
              <S label="Meeting Format" value={f.meetingFormat} onChange={v=>sf({...f,meetingFormat:v})} options={['In-Person','Virtual','Site Visit']} required/>
              <div><label className="block text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">Message (Optional)</label><textarea value={f.message} onChange={e=>sf({...f,message:e.target.value})} placeholder="Tell us about your vision..." rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:border-gold/50 focus:outline-none transition-colors resize-none"/></div>
              <button type="submit" className="w-full py-3.5 bg-gold text-white text-[0.75rem] font-bold tracking-[0.13em] uppercase rounded-lg hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/20 transition-all duration-300">Submit Request</button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function I({label,value,onChange,...p}){return<div><label className="block text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">{label}</label><input value={value} onChange={e=>onChange(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:border-gold/50 focus:outline-none transition-colors" {...p}/></div>}
function S({label,value,onChange,options,required}){return<div><label className="block text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">{label}</label><select value={value} onChange={e=>onChange(e.target.value)} required={required} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:border-gold/50 focus:outline-none transition-colors appearance-none"><option value="">Select</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select></div>}
