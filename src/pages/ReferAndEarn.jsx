import { useState } from 'react'
import { FiUserPlus, FiPhoneCall, FiGift, FiSend } from 'react-icons/fi'
import PageBanner from '../components/PageBanner'
import Reveal, { Stagger, StaggerChild } from '../components/Reveal'

const steps=[
  {icon:FiUserPlus,title:'Nominate a Friend',desc:'Share details of someone who might be interested in our projects.'},
  {icon:FiPhoneCall,title:'We Connect & Impress',desc:'Our team reaches out and presents the best options for them.'},
  {icon:FiGift,title:'You Get Rewarded',desc:'Once the deal is closed, you earn your referral reward.'},
]

export default function ReferAndEarn(){
  const [f,sf]=useState({yn:'',ye:'',yp:'',yc:'',fn:'',fe:'',fp:'',fc:''})
  const s=(k,v)=>sf({...f,[k]:v})
  const submit=e=>{e.preventDefault();alert('Thank you for your referral!');sf({yn:'',ye:'',yp:'',yc:'',fn:'',fe:'',fp:'',fc:''})}

  return(
    <>
      <PageBanner label="Ambassador Program" title="Refer And Earn" subtitle="Win for You. Win for Them." img="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"/>

      {/* Steps */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <Reveal className="mb-14">
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">How It Works</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Three Simple Steps</h2>
            <p className="text-gray-500 max-w-xl">Our Ambassador Program rewards existing customers for spreading the word about Shrishti Realty.</p>
          </Reveal>
          <Stagger gap={0.12} className="grid md:grid-cols-3 gap-6">
            {steps.map((st,i)=>(
              <StaggerChild key={i}>
                <div className="group p-8 bg-cream rounded-2xl border border-gray-100 text-center hover:border-gold/30 hover:shadow-lg transition-all duration-500 h-full relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"/>
                  <span className="font-display text-4xl font-bold text-gold/10 block mb-2">0{i+1}</span>
                  <div className="w-16 h-16 rounded-full bg-green-pale grid place-items-center mx-auto mb-5 group-hover:bg-gold/10 transition-colors">
                    <st.icon className="text-green group-hover:text-gold transition-colors" size={22}/>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{st.title}</h3>
                  <p className="text-[0.88rem] text-gray-400 leading-relaxed">{st.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-24 lg:py-32 bg-dark-green">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold/70 mb-4 block">Eligibility</span>
            <h2 className="font-display text-3xl font-bold text-white mb-10">Who Can Participate?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[{t:'Referrer',d:'Must have completed 10% of booking amount with Shrishti Realty.'},{t:'Referred Friend',d:'Eligible once they reach 30% of project value.'}].map((c,i)=>(
                <div key={i} className="p-7 rounded-2xl border border-white/10 bg-white/5 hover:border-gold/20 transition-all duration-500">
                  <h3 className="text-sm font-bold text-gold mb-3">{c.t}</h3>
                  <p className="text-[0.88rem] text-white/50 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[900px] mx-auto px-5 lg:px-10">
          <Reveal>
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">Nominate</span>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-10">Submit Your Referral</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="p-8 lg:p-10 bg-cream rounded-2xl border border-gray-100 space-y-8">
              <div>
                <h3 className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-gray-400 mb-5 pb-3 border-b border-gray-200">Your Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FI label="Your Name" value={f.yn} onChange={v=>s('yn',v)} required placeholder="Full name"/>
                  <FI label="Your Email" type="email" value={f.ye} onChange={v=>s('ye',v)} required placeholder="your@email.com"/>
                  <FI label="Your Phone" type="tel" value={f.yp} onChange={v=>s('yp',v)} required placeholder="+91-XXXXXXXXXX"/>
                  <FI label="Your City" value={f.yc} onChange={v=>s('yc',v)} required placeholder="City"/>
                </div>
              </div>
              <div>
                <h3 className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-gray-400 mb-5 pb-3 border-b border-gray-200">Friend's Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FI label="Friend's Name" value={f.fn} onChange={v=>s('fn',v)} required placeholder="Full name"/>
                  <FI label="Friend's Email" type="email" value={f.fe} onChange={v=>s('fe',v)} required placeholder="friend@email.com"/>
                  <FI label="Friend's Phone" type="tel" value={f.fp} onChange={v=>s('fp',v)} required placeholder="+91-XXXXXXXXXX"/>
                  <FI label="Friend's City" value={f.fc} onChange={v=>s('fc',v)} required placeholder="City"/>
                </div>
              </div>
              <button type="submit" className="group flex items-center gap-2 px-8 py-3.5 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.13em] uppercase rounded hover:bg-green hover:shadow-lg transition-all duration-300">
                Submit Referral <FiSend size={13} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function FI({label,value,onChange,...p}){return<div><label className="block text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">{label}</label><input value={value} onChange={e=>onChange(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-gold/50 focus:outline-none transition-colors" {...p}/></div>}
