import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import PageBanner from '../components/PageBanner'
import { DotGrid, CornerArc, FloatingCircle, DiagonalLines } from '../components/Decorations'
import Reveal, { Stagger, StaggerChild } from '../components/Reveal'
import { sendEmail } from '../utils/sendEmail'

const cards = [
  { icon: FiPhone, label:'Call Us', value:'+91-7498388944', href:'tel:+917498388944' },
  { icon: FaWhatsapp, label:'WhatsApp', value:'Chat with us', href:'https://wa.me/7498388944' },
  { icon: FiMail, label:'Email', value:'info@shrishtirealty.com', href:'mailto:info@shrishtirealty.com' },
  { icon: FiMapPin, label:'Location', value:'Mumbai, MH India', href:null },
]

export default function Contact() {
  const [f,setF]=useState({name:'',email:'',phone:'',inquiryType:'',subject:'',message:''})
  const [sending,setSending]=useState(false)
  const s=(k,v)=>setF({...f,[k]:v})
  const submit=async(e)=>{e.preventDefault();setSending(true);const r=await sendEmail('contact',f);setSending(false);alert(r.success?'Thank you! We will get back to you soon.':'Something went wrong. Please try again.');if(r.success)setF({name:'',email:'',phone:'',inquiryType:'',subject:'',message:''})}

  return (
    <>
      <PageBanner label="Get In Touch" title="Contact Us" subtitle="We'd love to hear from you" img="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" />

      {/* Cards */}
      <section className="relative z-10 -mt-14">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <Stagger gap={0.06} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((c,i)=>(
              <StaggerChild key={i}>
                <div className="group p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-black/[0.04] text-center shadow-lg shadow-black/5 hover:border-gold/30 hover:shadow-xl transition-all duration-500">
                  <div className="w-12 h-12 rounded-full bg-green-pale grid place-items-center mx-auto mb-4 group-hover:bg-gold/10 transition-colors">
                    <c.icon className="text-green group-hover:text-gold transition-colors" size={16}/>
                  </div>
                  <h3 className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-gray-400 mb-2">{c.label}</h3>
                  {c.href?<a href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" className="text-[0.85rem] text-gray-600 hover:text-gold transition-colors">{c.value}</a>:<p className="text-[0.85rem] text-gray-600">{c.value}</p>}
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Form */}
      <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <CornerArc position="top-right" size={350} />
        <CornerArc position="bottom-left" size={250} color="green" />
        <FloatingCircle size={450} top="-10%" right="-8%" color="gold" opacity={0.025} />
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">
          <Reveal direction="left">
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-4 block">Send A Message</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-5">Let's Start A Conversation</h2>
            <div className="w-14 h-[2px] bg-gold mb-6"/>
            <p className="text-gray-500 leading-[1.9] mb-10">Whether you have a question about our services, want to discuss a project, or simply want to learn more — we're here to help.</p>
            <div>
              <h3 className="text-[0.68rem] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Global Offices</h3>
              {['Mumbai, India','Dubai, UAE','Doha, Qatar','London, UK'].map(loc=>(
                <div key={loc} className="flex items-center gap-3 mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-gold"/>
                  <span className="text-[0.88rem] text-gray-500">{loc}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <form onSubmit={submit} className="p-8 lg:p-10 bg-section-cream rounded-2xl border border-gray-100 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FI label="Name" value={f.name} onChange={v=>s('name',v)} required placeholder="Your name"/>
                <FI label="Email" type="email" value={f.email} onChange={v=>s('email',v)} required placeholder="your@email.com"/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FI label="Phone" type="tel" value={f.phone} onChange={v=>s('phone',v)} placeholder="+91-XXXXXXXXXX"/>
                <FS label="Inquiry Type" value={f.inquiryType} onChange={v=>s('inquiryType',v)} options={['General Inquiry','Partnership','Career','Support','Media']} required/>
              </div>
              <FI label="Subject" value={f.subject} onChange={v=>s('subject',v)} required placeholder="What's this about?"/>
              <div><label className="block text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">Message</label><textarea value={f.message} onChange={e=>s('message',e.target.value)} required placeholder="Tell us more..." rows={5} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-gold/50 focus:outline-none transition-colors resize-none"/></div>
              <button type="submit" className="group flex items-center gap-2 px-8 py-3.5 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.13em] uppercase rounded hover:bg-green hover:shadow-lg transition-all duration-300">
                Send Message <FiSend size={13} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function FI({label,value,onChange,...p}){return<div><label className="block text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">{label}</label><input value={value} onChange={e=>onChange(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-gold/50 focus:outline-none transition-colors" {...p}/></div>}
function FS({label,value,onChange,options,required}){return<div><label className="block text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">{label}</label><select value={value} onChange={e=>onChange(e.target.value)} required={required} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:border-gold/50 focus:outline-none transition-colors appearance-none"><option value="">Select</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select></div>}
