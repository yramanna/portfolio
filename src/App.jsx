import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail, FileDown, ExternalLink, ArrowRight } from 'lucide-react'

// ------- sample content (replace with yours) -------
const experiences = [
  {
    role: "Graduate Teaching Assistant",
    company: "University of Utah",
    start: "August 2025",
    end: "Present",
    highlights: [
      "CS 6450 - Distributed Systems"
    ],
    // links: [{label:"Org", href:"https://pharmacy.utah.edu/"}]
  },
  {
    role: "Senior Technical Support Engineer",
    company: "VMware",
    start: "December 2021",
    end: "June 2024",
    highlights: [
      "Developed a distributed log-tracing tool to identify networking issues in VMware hypervisors, leading a 6-month project end-to-end with a team of 5, collaborating with multiple engineering teams.",
      "Guided the technical growth of 5-6 engineers throughout a three-year period, consistently driving their development and overcoming blockers to achieve project goals.",
      "Architected and implemented scalable solutions to address networking bottlenecks, resulting in a 20% reduction in latency within virtualized client environments.",
      "Partnered with engineering to resolve over 20 networking bugs in vSphere 7.0, enhancing system stability and achieving a 10% increase in positive customer feedback and a 15% rise in adoption rates for new vSphere releases."
    ]
  },
  {
    role: "Technical Support Engineer II",
    company: "VMware",
    start: "July 2020",
    end: "December 2021",
    highlights: [
      "Automated the Kubernetes resource setup for VMware xLabs SAAS including pods, network configurations, disk mounting, access roles, IAM policies, and upgrade pipelines, with integrated automated tests for release validation.", 
      "Automated software solutions for the delivery, maintenance, and monitoring of VMware Cloud Foundation (VCF) and Software-Defined Data Center (SDDC) platforms.",
      "Developed an auto-triage bot for the networking layer of VMware hypervisors, automating issue detection and resolution, resulting in a 10% reduction in support incidents and 30% improvement in same-day incident resolution.",
      "Optimized virtualized network solutions for over 100 critical accounts, enhancing network performance by 25% and reducing customer escalations by 15%."
    ]
  },
  {
    role: "Technical Support Engineer",
    company: "VMware",
    start: "July 2019",
    end: "July 2020",
    highlights: [
      "Built a randomized simulated testing tool to evaluate runtime performance of various configurations.",
      "Specialized in networking solutions, including NSX-T, NSX Advanced Load Balancer, and Aria Operations for Networks (formerly vRealize Network Insight)."
    ]
  }
  ,
  {
    role: "Associate Technical Support Engineer",
    company: "VMware",
    start: "July 2018",
    end: "July 2019",
    highlights: [
      // "Developed a distributed log-tracing tool to identify networking issues in VMware hypervisors, leading a 6-month project end-to-end with a team of 5, collaborating with multiple engineering teams.",
      // "Guided the technical growth of 5-6 engineers throughout a three-year period, consistently driving their development and overcoming blockers to achieve project goals.",
      // "Architected and implemented scalable solutions to address networking bottlenecks, resulting in a 20% reduction in latency within virtualized client environments.",
      // "Partnered with engineering to resolve over 20 networking bugs in vSphere 7.0, enhancing system stability and achieving a 10% increase in positive customer feedback and a 15% rise in adoption rates for new vSphere releases."
    ]
  }
]

const projects = [
  {
    name:"Woody Woodpecker: Automated Log Analysis Tool",
    summary:"Developed an internal tool to quickly identify known issues with VMware products through automated log analysis.",
    stack:["VMware Cloud Foundation","NSX","Go","Python"],
    // links:{ github:"https://github.com/yourname/renderer" },
    // featured:true
  },
  {
    name:"Project Trinidad: VMware xLabs SAAS",
    summary:"Project Trinidad is an API security and analytics platform that utilizes machine learning models to analyze east-west traffic in modern, Kubernetes-based applications.",
    stack:["Python","OpenAPI","Kubernetes"],
    // links:{ github:"https://github.com/yourname/malware-ml" }
  },
  {
    name:"Packet Capture Automation Script",
    summary:"Developed an auto-triage bot for the networking layer of VMware hypervisors, automating issue detection and resolution, resulting in a 10% reduction in support incidents and 30% improvement in same-day incident resolution.",
    stack:["Python","Shell Script","VMware NSX", "VMware vSphere"]
  },
  {
    name:"GSS Challenge Labs",
    summary:"Designed internal labs to simulate broken configurations supplement onboarding training of new hires.",
    stack:[" VMware Cloud Foundation (VCF)","VMware vSphere","VMware NSX-T", "VMware vSphere"]
  }
]


const skills = {
  "Languages": ["Python","Go","Shell Script"],
  "ML/DS": ["PyTorch","TensorFlow","Numpy","Pandas"],
  "Systems": ["Kubernetes","VMware vSphere","NSX-T"]
}
// ---------------------------------------------------

function useActiveSection(ids){
  const [active, setActive] = useState(ids[0])
  useEffect(()=>{
    const observers = []
    ids.forEach(id=>{
      const el = document.getElementById(id)
      if(!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if(entry.isIntersecting) setActive(id) },
        { rootMargin: "-40% 0px -60% 0px", threshold:[0,0.2,1] }
      )
      obs.observe(el); observers.push(obs)
    })
    return ()=> observers.forEach(o=>o.disconnect())
  }, [ids])
  return active
}

const Section = ({id, title, children})=>{
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px', once: true })
  return (
    <section id={id} className="section">
      <div className="container">
        <motion.h2
          ref={ref}
          initial={{opacity:0, y:12}}
          animate={inView ? {opacity:1, y:0} : {}}
          transition={{duration:0.4}}
          className="section-title"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{opacity:0, y:10}}
          animate={inView ? {opacity:1, y:0} : {}}
          transition={{duration:0.4, delay:0.05}}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

const Navbar = ()=>{
  const ids = ['home','experience','skills','projects','resume','contact']
  const active = useActiveSection(ids)
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#home" className="logo">Yadunandan Ramanna</a>
        <div className="nav-links">
          {ids.slice(1).map(id=>{
            const label = id[0].toUpperCase()+id.slice(1)
            return <a key={id} href={`#${id}`} className={active===id?'active':''}>{label}</a>
          })}
        </div>
      </div>
    </nav>
  )
}

const Hero = ()=>(
  <header id="home" className="section hero">
    <div className="container">
      <div className="grid" style={{gridTemplateColumns:'1.2fr 0.8fr'}}>
        <div>
          <motion.h1
            initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            transition={{duration:0.5}}
            className="hero-title"
          >
            Yadunandan Ramanna
          </motion.h1>
          <p className="hero-tagline">
            Distributed systems + ML — building tools that automate, optimize, and analyze at scale.
          </p>
          <div className="hero-buttons">
            <a className="button primary" href="#projects">View Projects <ArrowRight size={16}/></a>
            <a className="button" href="#resume"><FileDown size={16}/> Resume</a>
            <a className="button" href="#contact"><Mail size={16}/> Contact</a>
          </div>
          <div className="hero-socials">
            <a href="https://www.linkedin.com/in/yadunandan-ramanna" target="_blank" rel="noreferrer"><Linkedin size={18}/></a>
          </div>
        </div>
        <div>
          <div className="card" style={{height:220}}>
            <p style={{color:'var(--muted)'}}>Drop a headshot or graphic here later.</p>
          </div>
        </div>
      </div>
    </div>
  </header>
)

const Experience = ()=>(
  <Section id="experience" title="Experience">
    <div className="grid">
      {experiences.map((e,i)=>(
        <motion.div key={i} className="card"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
          transition={{duration:0.4, delay:i*0.1}}
        >
          <strong>{e.role}</strong> · {e.company}
          <span className="badge">{e.start} — {e.end}</span>
          <ul>{e.highlights.map((h,j)=><li key={j}>{h}</li>)}</ul>
        </motion.div>
      ))}
    </div>
  </Section>
)

const Skills = ()=>(
  <Section id="skills" title="Skills">
    <div className="grid">
      {Object.entries(skills).map(([group,items])=>(
        <div key={group} className="card">
          <div style={{marginBottom:8,fontWeight:600}}>{group}</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
            {items.map((s,idx)=>(
              <motion.span key={s} className="badge"
                initial={{scale:0.8,opacity:0}}
                whileInView={{scale:1,opacity:1}}
                transition={{delay:idx*0.05}}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
)

const ProjectCard = ({p,i})=>(
  <motion.div className="card"
    initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
    transition={{duration:0.4, delay:i*0.1}}
  >
    <strong>{p.name}</strong>
    <p style={{color:'var(--muted)', margin:'8px 0 10px'}}>{p.summary}</p>
    <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
      {p.stack.map(s=> <span className="badge" key={s}>{s}</span>)}
    </div>
  </motion.div>
)

const Projects = ()=>{
  const all = useMemo(()=> projects, [])
  return (
    <Section id="projects" title="Projects">
      <div className="grid">
        {all.map((p,i)=><ProjectCard key={i} p={p} i={i}/>)}
      </div>
    </Section>
  )
}

const Resume = ()=>(
  <Section id="resume" title="Resume">
    <div className="card">
      <p>Your resume PDF goes here (replace <code>/public/resume.pdf</code>).</p>
      <a className="button" href="/resume.pdf" target="_blank"><FileDown size={16}/> View / Download</a>
    </div>
  </Section>
)

const Contact = ()=>(
  <Section id="contact" title="Contact">
    <div className="card">
      <p style={{color:'var(--muted)'}}>Reach out directly via email.</p>
      <a className="button primary" href="mailto:you@example.com"><Mail size={16}/> Email me</a>
    </div>
  </Section>
)

const Footer = ()=>(
  <footer className="footer">
    <div className="container" style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
      <span>© {new Date().getFullYear()} Yadunandan Ramanna</span>
      <div style={{display:'flex', gap:12}}>
        <a href="https://www.linkedin.com/in/yadunandan-ramanna" target="_blank" rel="noreferrer"><Linkedin size={16}/></a>
      </div>
    </div>
  </footer>
)

export default function App(){
  return (
    <>
      <Navbar/>
      <Hero/>
      <Experience/>
      <Skills/>
      <Projects/>
      <Resume/>
      <Contact/>
      <Footer/>
    </>
  )
}