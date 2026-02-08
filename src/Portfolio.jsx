import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Briefcase, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  HardHat, 
  TrendingUp, 
  FileText, 
  Menu, 
  X, 
  ChevronDown, 
  Linkedin,
  Calendar,
  Target,
  ArrowRight,
  CheckCircle2,
  Globe,
  LayoutDashboard
} from 'lucide-react';

// --- Data Section ---

const PERSONAL_INFO = {
  name: "Eng. Osama Ahmed",
  title: "PMO Director | Civil Engineer",
  tagline: "24+ Years Delivering Billion-Dollar Infrastructure & Construction Visions",
  location: "Saudi Arabia / Middle East",
  email: "eng.o@outlook.com",
  phone: "+966 563772870",
  linkedin: "https://www.linkedin.com/in/osama-ahmed-5b783620",
  biography: `With Over 24 Years of Proven Expertise in Large-Scale Construction and Infrastructure Projects, From Predesign Phase to Closeout While Ensuring Adherence to Timelines, Budgets, And Quality Standards. Aligning with the Organization's Mission, Vision, and Goals across the Middle East and Gulf Area.

  Professional expert in Portfolio, Program, Project & Construction Management. deeply experienced in Planning, Schedules, Contracts, Procurement, Quantity Surveying, Negotiation, Cost Control, Value Engineering, Control Changes, Claims, Variations, Budgeting, Risks, Issues Mitigation, Project Controls Procedures, Reports, and Document Control Organization.
  
  Involved in Construction & Infrastructure Projects, Real Estate, Residential, Touristic, Administration, Towers, High-Rise Buildings, Hotels, Hospitals, Commercial And Shopping Malls, Roads, Bridges, Tunnels, and Utilities.`,
  yearsExp: 24,
  portfolioValue: "2.0B+",
  keySectors: ["Healthcare", "Infrastructure", "High-Rise", "Industrial"]
};

const EXPERIENCE = [
  {
    id: 1,
    role: "PMO Director",
    company: "Saud Consult",
    location: "Saudi Arabia",
    period: "Dec 2023 - Present",
    focus: "Aseer Municipality Program",
    description: "Leading the PMO for all Aseer Region Municipality projects. Developing processes, policies, and directing staff for infrastructure, flood control, and public landscaping projects.",
    highlights: [
      "Directing operational PMO functions.",
      "Establishing governance aligned with company strategy.",
      "Managing executive reporting and dashboards.",
      "Overseeing project managers on budget and quality."
    ]
  },
  {
    id: 2,
    role: "Project Controls Director",
    company: "S OOR Engineering & Project Management",
    location: "Kuwait",
    period: "Jul 2018 - Nov 2023",
    focus: "Mega Healthcare Projects",
    description: "Directed massive healthcare infrastructure projects totaling over $1.2 Billion in value.",
    highlights: [
      "Kuwait Cancer Hospital ($600M): 297,000 m², 618 beds, two high towers.",
      "Sabah General Hospital ($670M): 388,582 m², 627 beds, multi-story complex.",
      "Led design, supervision, planning, and procurement teams.",
      "Managed scope, schedule, budget, and risk registers."
    ]
  },
  {
    id: 3,
    role: "Project Controls Manager",
    company: "El-Eman Construction",
    location: "Kuwait",
    period: "Nov 2014 - Jun 2018",
    focus: "Security & Education Infrastructure",
    description: "Executed critical national infrastructure projects ensuring compliance with government regulations.",
    highlights: [
      "Kuwait Oil Company Security Fence ($120M): 180km security infrastructure.",
      "Educational Complex ($64M): Schools, conference hall, and theater.",
      "Managed budgets, expenditures, and cost-saving initiatives.",
      "Master scheduling using Primavera P6."
    ]
  },
  {
    id: 4,
    role: "Procurement & Contracts Manager",
    company: "DETAC (Dar for Trading & Construction)",
    location: "Egypt",
    period: "Jun 2009 - Oct 2014",
    focus: "Commercial & Industrial Development",
    description: "Managed procurement strategies and contracts for high-profile commercial developments.",
    highlights: [
      "Etisalat Egypt HQ ($175M): Smart Village headquarters.",
      "Mivida Emaar Misr ($142M): Residential EPC.",
      "National Cement Company ($125M): Industrial production line.",
      "Negotiated favorable terms and consolidated suppliers."
    ]
  },
  {
    id: 5,
    role: "Planning & Project Controls Manager",
    company: "PMIS",
    location: "Kuwait",
    period: "Oct 2003 - May 2009",
    focus: "Hospitality & Utilities",
    description: "Oversaw planning and controls for luxury hotels and utility plants.",
    highlights: [
      "Kuwait National Assembly Cooling Plant ($35M).",
      "Al Khiran Resort ($24M) & Twin Pyramids Hotel.",
      "Implemented P6 for time and cost control."
    ]
  }
];

const EDUCATION = [
  { degree: "B.Sc. Civil Engineering", school: "Ain Shams University, Egypt", year: "2000" },
  { degree: "Professional Civil Engineer (PE)", school: "Kuwait University", year: "2005" },
  { degree: "International Arbitrator", school: "Cairo University", year: "2013" }
];

const CERTIFICATIONS = [
  "PMP - Project Management Professional",
  "CCCE (Certified Cost Consultant Engineer)",
  "CCE (Certified Cost Engineer)",
  "Primavera Project Management P6",
  "Member: Saudi Council of Engineering",
  "Member: Kuwait Society of Engineers",
  "Member: Egypt Engineers Syndicate"
];

// --- Utility Components ---

const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionTitle = ({ title, subtitle, dark = false }) => (
  <RevealOnScroll className="mb-12 md:mb-16 text-center">
    <h2 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {/* Using custom hex for divider */}
    <div className="w-16 md:w-24 h-1.5 mx-auto mb-4 md:mb-6 rounded-full" style={{ backgroundColor: '#6A89A7' }}></div>
    {subtitle && <p className={`text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{subtitle}</p>}
  </RevealOnScroll>
);

const StatCard = ({ icon: Icon, value, label, delay }) => (
  <RevealOnScroll delay={delay} className="group">
    <div className="bg-white p-6 shadow-lg border-t-4 transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden" style={{ borderColor: '#6A89A7' }}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full transition-transform group-hover:scale-150 duration-700 z-0 opacity-10" style={{ backgroundColor: '#6A89A7' }}></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-slate-100 rounded-lg transition-colors duration-300 group-hover:text-white" style={{ color: '#6A89A7' }}>
             <Icon size={24} />
          </div>
          <span className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
        </div>
        <p className="text-slate-500 font-medium uppercase tracking-wider text-xs md:text-sm">{label}</p>
      </div>
    </div>
  </RevealOnScroll>
);

const ProjectCard = ({ project, index }) => (
  <RevealOnScroll delay={index * 100}>
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-200 flex flex-col h-full overflow-hidden">
      <div className="bg-slate-900 p-6 md:p-8 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 transition-colors" style={{ color: '#fff' }}>{project.role}</h3>
              <p className="flex items-center gap-2 font-medium text-sm md:text-base" style={{ color: '#6A89A7' }}>
                <Building2 size={16} /> {project.company}
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap border self-start md:self-center" style={{ backgroundColor: 'rgba(106, 137, 167, 0.2)', borderColor: 'rgba(106, 137, 167, 0.3)', color: '#6A89A7' }}>
              {project.period}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-6 font-medium uppercase tracking-wide">
          <MapPin size={14} style={{ color: '#6A89A7' }} /> {project.location}
        </div>
        
        <p className="text-slate-700 mb-6 italic leading-relaxed border-l-4 pl-4 text-sm md:text-base" style={{ borderColor: '#6A89A7' }}>
          "{project.description}"
        </p>
        
        <div className="mt-auto">
          <h4 className="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wide flex items-center gap-2">
            <Award size={16} style={{ color: '#6A89A7' }} /> Key Achievements
          </h4>
          <ul className="space-y-3">
            {project.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm group-hover:text-slate-900 transition-colors">
                <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#6A89A7' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </RevealOnScroll>
);

// --- Main App ---

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define the custom theme color
  const themeColor = '#6A89A7';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Global Styles for Grid Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes grid-pan {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .animate-grid-pan {
          animation: grid-pan 60s linear infinite;
        }
        
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #64748b; }

        .hover-theme-bg:hover { background-color: ${themeColor}; color: white; }
        .text-theme { color: ${themeColor}; }
        .bg-theme { background-color: ${themeColor}; }
        .border-theme { border-color: ${themeColor}; }
      `}} />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3 md:py-4 border-b border-slate-200' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className={`p-2 rounded transition-colors ${isScrolled ? 'bg-slate-100' : 'bg-white/10 text-white'}`} style={{ color: isScrolled ? themeColor : 'white' }}>
              <Building2 size={24} className="md:w-7 md:h-7" />
            </div>
            <div className={`font-bold text-xl md:text-2xl tracking-tighter leading-none ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              ENG.<span style={{ color: themeColor }}>OSAMA</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-8 font-medium ${isScrolled ? 'text-slate-600' : 'text-slate-300'}`}>
            {['Profile', 'Experience', 'Expertise', 'Education'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:opacity-80 transition relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full" style={{ backgroundColor: themeColor }}></span>
              </button>
            ))}
            <button 
              onClick={() => scrollTo('contact')} 
              className={`px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 ${isScrolled ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}
            >
              Contact Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            {isMenuOpen ? <X className={isScrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t border-slate-100 animate-fade-in h-screen">
            <div className="flex flex-col p-6 gap-6 items-center pt-20">
              {['Profile', 'Experience', 'Expertise', 'Education', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-2xl text-slate-800 font-bold border-b-2 border-transparent hover:border-slate-200 pb-2 w-full text-center">
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden pt-20 border-b border-slate-800">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0 opacity-20 animate-grid-pan" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
          backgroundSize: '50px 50px' 
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80 z-10"></div>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            <RevealOnScroll delay={200}>
              <div className="inline-flex items-center gap-2 border text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 mb-6 md:mb-8 rounded-full backdrop-blur-sm" style={{ backgroundColor: 'rgba(106, 137, 167, 0.2)', borderColor: 'rgba(106, 137, 167, 0.4)', color: '#a4c4e0' }}>
                <CheckCircle2 size={14} style={{ color: themeColor }} />
                AVAILABLE FOR CONSULTATION
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={400}>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={600}>
              <h2 className="text-lg sm:text-2xl md:text-4xl text-slate-300 mb-8 font-light flex items-center justify-center gap-4">
                <span className="h-px w-8 md:w-12" style={{ backgroundColor: themeColor }}></span>
                {PERSONAL_INFO.title}
                <span className="h-px w-8 md:w-12" style={{ backgroundColor: themeColor }}></span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={800}>
              <p className="text-slate-400 text-base md:text-xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed px-4">
                {PERSONAL_INFO.tagline}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={1000}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => scrollTo('contact')} 
                  className="text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-3 w-full sm:w-auto"
                  style={{ backgroundColor: themeColor, boxShadow: `0 10px 15px -3px rgba(106, 137, 167, 0.4)` }}
                >
                  Get In Touch <ArrowRight size={20} />
                </button>
                <button onClick={() => window.open(PERSONAL_INFO.linkedin, '_blank')} className="bg-white/5 backdrop-blur border border-white/10 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3 group w-full sm:w-auto">
                  <Linkedin size={20} className="group-hover:text-blue-300 transition-colors" /> LinkedIn Profile
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="absolute bottom-0 w-full bg-white/5 border-t border-white/10 z-20 backdrop-blur-md hidden lg:block">
          <div className="container mx-auto px-6 py-8 flex justify-between text-white">
            {[
              { label: "Experience", value: "24 Years" },
              { label: "Project Value", value: "$2.0B+" },
              { label: "Location", value: "Saudi Arabia" },
              { label: "Specialty", value: "PMO & Claims" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col border-r border-white/10 last:border-0 pr-12 last:pr-0">
                <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">{stat.label}</span>
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Stats Grid Mobile */}
      <div className="lg:hidden grid grid-cols-2 gap-4 p-4 -mt-20 relative z-30 container mx-auto">
        <StatCard icon={Calendar} value={`${PERSONAL_INFO.yearsExp}+`} label="Years Exp." delay={200} />
        <StatCard icon={TrendingUp} value={PERSONAL_INFO.portfolioValue} label="Value Managed" delay={300} />
      </div>

      {/* Executive Profile (Biography) Section */}
      <section id="profile" className="py-16 md:py-24 bg-slate-50 relative border-b border-slate-200">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle title="Executive Profile" />
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <RevealOnScroll className="lg:w-3/5 text-center lg:text-center">
              <div className="prose prose-lg text-slate-600 leading-loose mx-auto">
                 <p className="text-xl md:text-2xl text-slate-900 font-light mb-8 italic px-4">
                    "Delivering adherence to timelines, budgets, and quality standards aligned with the organization's mission."
                 </p>
                 <div className="w-16 md:w-24 h-1 mx-auto mb-8 rounded" style={{ backgroundColor: themeColor }}></div>
                 <div className="space-y-6 text-slate-700 font-light text-base md:text-lg">
                    {PERSONAL_INFO.biography.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                 </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="lg:w-2/5 w-full" delay={200}>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl">
                <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center justify-center gap-2 text-slate-900">
                  <LayoutDashboard style={{ color: themeColor }} />
                  Strategic Focus Areas
                </h3>
                
                {/* Professional Grid for Skills - PILLS STYLE (Responsive Wrapping) */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  {[
                    "Portfolio Management", "PMO Setup", "Cost Control", 
                    "Claims & Dispute", "Value Engineering", 
                    "Risk Mitigation", "Contract Admin", "Strategic Planning"
                  ].map((tag, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-slate-50 border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                      <span className="font-semibold text-slate-600 text-xs md:text-sm uppercase tracking-wide">{tag}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center justify-center gap-2 text-slate-900">
                    <Globe style={{ color: themeColor }} />
                    Sectors
                  </h3>
                   {/* Centered Sectors */}
                   <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                      {PERSONAL_INFO.keySectors.map((sector, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-slate-50 border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                           <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                           <span className="font-semibold text-slate-600 text-xs md:text-sm uppercase tracking-wide">{sector}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-24 bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Professional Experience" 
            subtitle="A 24-year timeline of managing complex infrastructures, healthcare facilities, and industrial developments across the Middle East." 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {EXPERIENCE.map((job, idx) => (
              <ProjectCard key={job.id} project={job} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)] [background-size:20px_20px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <RevealOnScroll className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Education</h2>
            <div className="w-16 md:w-24 h-1 mx-auto" style={{ backgroundColor: themeColor }}></div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Education Column */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
               <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-8 flex items-center gap-3">
                  <HardHat style={{ color: themeColor }} /> Education
               </h3>
               {EDUCATION.map((edu, idx) => (
                 <RevealOnScroll key={idx} delay={idx * 100}>
                   <div className="bg-white border border-slate-200 p-6 rounded-xl hover:border-slate-300 transition-colors flex items-center gap-4 md:gap-6 shadow-sm">
                      <div className="p-3 md:p-4 rounded-full bg-slate-100 text-slate-700">
                        <Award size={20} className="md:w-6 md:h-6" style={{ color: themeColor }} />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-1">{edu.degree}</h4>
                        <p className="text-sm md:text-base text-slate-600">{edu.school}</p>
                        <span className="text-xs font-mono mt-1 block" style={{ color: themeColor }}>{edu.year}</span>
                      </div>
                   </div>
                 </RevealOnScroll>
               ))}
            </div>

            {/* Certs Column */}
            <div>
               <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-8 flex items-center gap-3 mt-8 md:mt-0">
                  <FileText style={{ color: themeColor }} /> Memberships
               </h3>
               <div className="space-y-3 md:space-y-4">
                 {CERTIFICATIONS.map((cert, idx) => (
                   <RevealOnScroll key={idx} delay={300 + (idx * 50)}>
                      <div className="flex items-start gap-3 text-slate-600 p-4 rounded bg-white border-l-4 border-slate-300 hover:border-slate-400 transition-colors shadow-sm" style={{ borderLeftColor: idx === 0 ? themeColor : undefined }}>
                        <CheckCircle2 className="flex-shrink-0 mt-1" size={16} style={{ color: idx === 0 ? themeColor : '#16a34a' }} />
                        <span className={`leading-relaxed text-sm md:text-base font-medium ${idx === 0 ? 'text-slate-900 font-bold' : ''}`}>{cert}</span>
                      </div>
                   </RevealOnScroll>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="bg-slate-900 text-slate-400 py-16 md:py-24 border-t border-slate-800 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
            
            {/* Left Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-6 text-white">
                <Building2 size={24} className="md:w-8 md:h-8" style={{ color: themeColor }} />
                <span className="text-xl md:text-2xl font-bold tracking-tighter">ENG.OSAMA</span>
              </div>
              <p className="max-w-sm text-slate-500 mb-8 text-sm md:text-base">
                Building the future through disciplined project management and engineering excellence.
              </p>
              
              <div className="flex justify-center md:justify-start gap-4">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-all">
                  <Linkedin size={20} className="md:w-6 md:h-6" />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="p-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-all">
                  <Mail size={20} className="md:w-6 md:h-6" />
                </a>
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col gap-4 md:gap-6 w-full md:w-auto">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="group flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all">
                <div className="p-3 md:p-4 rounded-full text-white group-hover:scale-110 transition-transform" style={{ backgroundColor: themeColor }}>
                  <Mail size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-bold uppercase tracking-wider" style={{ color: themeColor }}>Email Me</p>
                  <p className="text-lg md:text-xl text-white font-medium break-all">{PERSONAL_INFO.email}</p>
                </div>
              </a>

              <a href={`tel:${PERSONAL_INFO.phone}`} className="group flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-all">
                <div className="p-3 md:p-4 bg-slate-600 rounded-full text-white group-hover:scale-110 transition-transform">
                  <Phone size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-wider">Call Me</p>
                  <p className="text-lg md:text-xl text-white font-medium">{PERSONAL_INFO.phone}</p>
                </div>
              </a>
            </div>

          </div>

          <div className="mt-12 md:mt-20 pt-8 border-t border-slate-800 text-center text-xs md:text-sm text-slate-600">
            &copy; {new Date().getFullYear()} Eng. Osama Ahmed. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}