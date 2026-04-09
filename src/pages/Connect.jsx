import { useState } from 'react'
import { FiUpload, FiSend } from 'react-icons/fi'
import PageBanner from '../components/PageBanner'
import Reveal from '../components/Reveal'
import { DotGrid, CornerArc, FloatingCircle } from '../components/Decorations'

export default function Connect(){
  const [tab,setTab]=useState('careers')
  const [career,setCr]=useState({name:'',phone:'',email:'',address:'',resume:null,portfolio:null})
  const [vendor,setVn]=useState({name:'',phone:'',email:'',companyName:'',address:'',productDescription:'',productType:'',website:'',brochure:null})

  const subCr=e=>{e.preventDefault();alert('Thank you for your application!');setCr({name:'',phone:'',email:'',address:'',resume:null,portfolio:null})}
  const subVn=e=>{e.preventDefault();alert('Thank you for your interest!');setVn({name:'',phone:'',email:'',companyName:'',address:'',productDescription:'',productType:'',website:'',brochure:null})}

  return(
    <>
      <PageBanner label="Work With Us" title="Connect" subtitle="Careers & Vendor Opportunities" img="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"/>

      <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <CornerArc position="top-right" size={300} />
        <CornerArc position="bottom-left" size={250} color="green" />
        <FloatingCircle size={400} top="-8%" right="-5%" color="gold" opacity={0.025} />
        <div className="max-w-[900px] mx-auto px-5 lg:px-10">
          <Reveal>
            <div className="flex gap-1 bg-section-cream rounded-xl p-1 mb-12 max-w-xs">
              {['careers','vendors'].map(t=>(
                <button key={t} onClick={()=>setTab(t)} className={`flex-1 py-3 px-6 text-[0.78rem] font-semibold rounded-lg transition-all duration-300 capitalize ${tab===t?'bg-dark-green text-white shadow-md':'text-gray-400 hover:text-gray-600'}`}>{t}</button>
              ))}
            </div>
          </Reveal>

          {tab==='careers'&&(
            <Reveal direction="up" delay={0.1}>
              <div className="mb-10">
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Join Our Team</h2>
                <div className="w-10 h-[2px] bg-gold mb-5"/>
                <p className="text-gray-500 leading-[1.9]">Looking for a career in interior design and architecture? Join us and be a part of our team! We're always looking for talented individuals who share our passion for design excellence.</p>
              </div>
              <form onSubmit={subCr} className="p-8 lg:p-10 bg-section-cream rounded-2xl border border-gray-100 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FI label="Full Name" value={career.name} onChange={v=>setCr({...career,name:v})} required placeholder="Your full name"/>
                  <FI label="Email" type="email" value={career.email} onChange={v=>setCr({...career,email:v})} required placeholder="your@email.com"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FI label="Phone" type="tel" value={career.phone} onChange={v=>setCr({...career,phone:v})} required placeholder="+91-XXXXXXXXXX"/>
                  <FI label="Address" value={career.address} onChange={v=>setCr({...career,address:v})} placeholder="Your address"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FU label="Upload Resume" id="resume" file={career.resume} onChange={f=>setCr({...career,resume:f})} accept=".pdf,.doc,.docx"/>
                  <FU label="Upload Portfolio" id="portfolio" file={career.portfolio} onChange={f=>setCr({...career,portfolio:f})} accept=".pdf,.doc,.docx,.zip"/>
                </div>
                <Btn>Submit Application</Btn>
              </form>
            </Reveal>
          )}

          {tab==='vendors'&&(
            <Reveal direction="up" delay={0.1}>
              <div className="mb-10">
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Become Our Vendor</h2>
                <div className="w-10 h-[2px] bg-gold mb-5"/>
                <p className="text-gray-500 leading-[1.9]">We are looking for partners to fulfill our requirements. Connect here and become our vendor! We value reliable partnerships that help us deliver excellence to our clients.</p>
              </div>
              <form onSubmit={subVn} className="p-8 lg:p-10 bg-section-cream rounded-2xl border border-gray-100 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FI label="Contact Name" value={vendor.name} onChange={v=>setVn({...vendor,name:v})} required placeholder="Your name"/>
                  <FI label="Company Name" value={vendor.companyName} onChange={v=>setVn({...vendor,companyName:v})} required placeholder="Company name"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FI label="Email" type="email" value={vendor.email} onChange={v=>setVn({...vendor,email:v})} required placeholder="company@email.com"/>
                  <FI label="Phone" type="tel" value={vendor.phone} onChange={v=>setVn({...vendor,phone:v})} required placeholder="+91-XXXXXXXXXX"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FI label="Product Type" value={vendor.productType} onChange={v=>setVn({...vendor,productType:v})} required placeholder="e.g., Furniture, Tiles"/>
                  <FI label="Website" type="url" value={vendor.website} onChange={v=>setVn({...vendor,website:v})} placeholder="https://yourcompany.com"/>
                </div>
                <FI label="Address" value={vendor.address} onChange={v=>setVn({...vendor,address:v})} placeholder="Company address"/>
                <div><label className="block text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">Product Description</label><textarea value={vendor.productDescription} onChange={e=>setVn({...vendor,productDescription:e.target.value})} required placeholder="Describe your products/services..." rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-gold/50 focus:outline-none transition-colors resize-none"/></div>
                <FU label="Upload Brochure" id="brochure" file={vendor.brochure} onChange={f=>setVn({...vendor,brochure:f})} accept=".pdf,.doc,.docx"/>
                <Btn>Submit Application</Btn>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}

function FI({label,value,onChange,...p}){return<div><label className="block text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">{label}</label><input value={value} onChange={e=>onChange(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-gold/50 focus:outline-none transition-colors" {...p}/></div>}

function FU({label,id,file,onChange,accept}){return<div><label className="block text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">{label}</label><div className="relative"><input type="file" id={id} onChange={e=>onChange(e.target.files[0])} accept={accept} className="absolute w-0 h-0 opacity-0"/><label htmlFor={id} className="flex items-center gap-3 px-4 py-3 border border-dashed border-gray-200 rounded-xl cursor-pointer text-sm text-gray-500 hover:border-gold/40 hover:text-gold/60 transition-all bg-white"><FiUpload size={15} className="shrink-0"/><span className="truncate">{file?file.name:'Choose file'}</span></label></div></div>}

function Btn({children}){return<button type="submit" className="group flex items-center gap-2 px-8 py-3.5 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.13em] uppercase rounded hover:bg-green hover:shadow-lg transition-all duration-300">{children} <FiSend size={13} className="group-hover:translate-x-1 transition-transform"/></button>}
