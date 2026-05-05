
import React from 'react';

const features = [
  {
    title: "Curriculum Reinforcement",
    description: "We work on what school teachers have already taught. No confusing new systems—just deeper understanding and better performance.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "bg-blue-600"
  },
  {
    title: "Values & Character",
    description: "Our aim is to raise responsible, disciplined, and God-fearing individuals who are ready to make a positive impact on society.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: "bg-indigo-600"
  },
  {
    title: "STEM Foundation",
    description: "Struggling with the basics? We build from scratch. Our coaching focuses on Math, Physics, Chemistry, and Coding essentials.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-3.156 1.157l-2.414-1.811a2 2 0 00-2.422 0l-2.414 1.811a2 2 0 01-3.156-1.157l-.727-2.903a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547" />
      </svg>
    ),
    color: "bg-purple-600"
  },
  {
    title: "Guidance & Counseling",
    description: "Personalized support for students experiencing difficulties. We provide a safe space for academic and personal growth.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "bg-teal-600"
  },
  {
    title: "Spiritual Growth",
    description: "One of our core values is instilling the fear of God. We conduct character-focused Bible study sessions twice a month to build moral foundation alongside academic excellence.",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    color: "bg-rose-600"
  },
  {
    title: "Result-Oriented Guarantee",
    description: "If an assigned teacher isn't performing, parents can request an immediate replacement. However, we rarely face such issues, as our professional teachers are highly disciplined, well-mannered, and possess the fear of God.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: "bg-emerald-600"
  }
];

const Features: React.FC = () => {
  return (
    <section id="values" className="py-16 sm:py-24 bg-white px-4 sm:px-6 scroll-mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mb-24">
          <h2 className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-6 flex items-center">
            <span className="w-10 h-px bg-indigo-600 mr-4"></span>
            The Jet Consults Academy Identity
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Values</span> & Approach
          </h3>
          <p className="mt-8 text-xl text-slate-500 font-medium leading-relaxed">
            We offer more than just tutoring. We provide a support system that builds technical mastery and strong personal character, preparing students to be community leaders.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] hover:-translate-y-2 transition-all duration-500 border border-slate-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-[5rem]"></div>
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-indigo-100/50 relative z-10`}>
                {feature.icon}
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 mb-4 relative z-10">{feature.title}</h4>
              <p className="text-slate-500 leading-relaxed font-medium relative z-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;