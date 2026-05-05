
import React from 'react';
import { Subject } from '../types.ts';

const subjects = [
  {
    name: "Early Literacy (Ages 4-8)",
    description: "Learn to read and write fluently. We build foundational phonics, vocabulary, and writing skills in a fun, engaging way.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-600",
    tags: ["Reading", "Writing", "Phonics"],
    price: 100,
    oldPrice: 130
  },
  {
    name: "English (Grades 3-9)",
    description: "Strengthening core language skills. We focus on grammar, comprehension, and writing to ensure classroom success.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: "from-emerald-500 to-green-600",
    tags: ["Grammar", "Comprehension", "Writing"],
    price: 100,
    oldPrice: 130
  },
  {
    name: "Math (Grades 3-9)",
    description: "Strengthening foundational mathematics. We focus on arithmetic, logic, and problem-solving to ensure classroom success.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-green-500 to-teal-600",
    tags: ["Arithmetic", "Logic", "Problem Solving"],
    price: 100,
    oldPrice: 130
  },
  {
    name: "Advanced Mathematics",
    description: "From Algebra to Calculus. We reinforce classroom logic and solve complex school assignments together.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-blue-500 to-indigo-600",
    tags: ["Algebra", "Geometry", "Calculus"],
    price: 120,
    oldPrice: 150
  },
  {
    name: "Physics",
    description: "Mastering Mechanics, Electricity, and Thermodynamics through simplified school-aligned tutorials.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-600",
    tags: ["Mechanics", "Optics", "Energy"],
    price: 120,
    oldPrice: 150
  },
  {
    name: "Chemistry",
    description: "Organic and Inorganic chemistry made simple. We help students excel in their school lab reports and theories.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-3.156 1.157l-2.414-1.811a2 2 0 00-2.422 0l-2.414 1.811a2 2 0 01-3.156-1.157l-.727-2.903a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547" />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-600",
    tags: ["Organic", "Reactions", "Stoichiometry"],
    price: 120,
    oldPrice: 150
  },
  {
    name: "Coding / Comp. Sci",
    description: "Building the next generation of creators. Logic-first teaching in Python, Web Dev, and AI basics.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    gradient: "from-teal-500 to-blue-600",
    tags: ["Python", "JavaScript", "AI"],
    price: 120,
    oldPrice: 150
  }
];

const specializedPrograms = [
  {
    title: "1-on-1 & Small Groups",
    subtitle: "2x Week • 1hr Sessions",
    desc: "We focus mainly on 1-on-1 tutoring. Grouping (max 4 students) is strictly for peers from the same country, school, and grade. Coding classes run in groups of 4."
  },
  {
    title: "Monthly Tuition",
    subtitle: "Starting at $100/Subj",
    desc: "Ages 4-8: $100. Grades 3-9: $100. Grades 10-12 (Advanced STEM): $120. Payments are made upfront before teacher assignment."
  },
  {
    title: "Foundation Building",
    subtitle: "1-on-1 Focus",
    desc: "Bridging foundational gaps with personalized attention. Fees are subject to review based on student challenges."
  }
];

const ProgramsSection: React.FC = () => {
  return (
    <section id="programs" className="py-16 sm:py-24 bg-slate-50 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-3xl">
            <h2 className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-6 flex items-center">
              <span className="w-10 h-px bg-indigo-600 mr-4"></span>
              Our Curriculum
            </h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Academic Programs</span>
            </h3>
            <p className="mt-8 text-xl text-slate-500 font-medium leading-relaxed">
              Reinforcing school tutorials via Google Meet. We focus majorly on 1-on-1 tutoring, ensuring personalized attention. Group classes (max 4) are available.
            </p>
          </div>
          <div className="hidden md:flex space-x-4">
            <div className="px-8 py-4 bg-white rounded-2xl border border-slate-100 text-sm font-extrabold text-slate-600 shadow-sm flex items-center space-x-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Monthly Billing: Starts at $100/Subject</span>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {subjects.map((sub, idx) => (
            <div key={idx} className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-2 overflow-hidden">
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${sub.gradient} opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-500 rounded-bl-[8rem]`}></div>
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sub.gradient} flex items-center justify-center text-white text-3xl font-black mb-6 shadow-lg shadow-indigo-100/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10`}>
                {sub.icon}
              </div>
              
              <div className="flex items-center space-x-3 mb-4 relative z-10">
                <span className="text-3xl font-black text-indigo-600">${sub.price}</span>
                <span className="text-lg font-bold text-slate-400 line-through decoration-2">${sub.oldPrice}</span>
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md">/ month</span>
              </div>
              
              <h4 className="text-2xl font-extrabold text-slate-900 mb-4 relative z-10">{sub.name}</h4>
              <p className="text-slate-500 text-base leading-relaxed font-medium mb-8 relative z-10">
                {sub.description}
              </p>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                {sub.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 px-4 py-2 bg-indigo-50/50 border border-indigo-100/50 rounded-xl">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Modes */}
        <div className="bg-white rounded-[4rem] p-12 sm:p-24 border border-slate-100 relative overflow-hidden shadow-2xl shadow-slate-200/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/80 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-20 relative z-10">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Logistics & Enrollment</h3>
            <p className="text-slate-500 font-medium text-xl max-w-2xl mx-auto leading-relaxed">Transparent, professional, and goal-oriented structure designed for your child's success.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
            {specializedPrograms.map((prog, idx) => (
              <div key={idx} className="relative pl-12 border-l-2 border-indigo-100 hover:border-indigo-500 transition-colors duration-500 group">
                <span className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-4 border-indigo-200 group-hover:border-indigo-500 rounded-full shadow-sm transition-colors duration-500"></span>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4">{prog.subtitle}</p>
                <h4 className="text-2xl font-extrabold text-slate-900 mb-4">{prog.title}</h4>
                <p className="text-slate-500 text-base leading-relaxed font-medium">
                  {prog.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
