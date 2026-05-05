
import React, { useState } from 'react';
import { educators, Educator } from '../data/educators';

const FounderProfile: React.FC = () => {
  const [selectedCv, setSelectedCv] = useState<Educator | null>(null);
  const founder = educators[0]; // Now there's only the founder card

  if (!founder) return null;

  return (
    <section id="teachers" className="py-16 sm:py-24 bg-white px-4 sm:px-6 scroll-mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Image & Decorative Side */}
          <div className="w-full lg:w-5/12 relative">
            <div className="relative group w-full max-w-md mx-auto lg:max-w-none">
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-[4rem] transform rotate-3 group-hover:rotate-0 transition-transform duration-700 opacity-70"></div>
              
              {/* Image Container */}
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-100/60 border-8 border-white bg-slate-100 aspect-[4/5] z-10">
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Verification Badge */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl flex items-center space-x-2 shadow-xl border border-white/40">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Verified Expert</span>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-80 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase bg-indigo-50 border border-indigo-100 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 mr-3"></span>
              Meet the Founder
            </div>
            
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-4 tracking-tight">
              {founder.name}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <p className="text-base sm:text-lg font-bold text-indigo-600 uppercase tracking-widest">{founder.role}</p>
              <span className="text-slate-300 hidden sm:block">•</span>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">{founder.experience}</p>
            </div>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium mb-10">
              {founder.bio}
            </p>

            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">Areas of Expertise</p>
              <div className="flex flex-wrap gap-3">
                {founder.specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 uppercase tracking-wider hover:bg-white hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button 
                onClick={() => setSelectedCv(founder)}
                className="group relative px-8 py-4 bg-indigo-600 text-white rounded-2xl font-extrabold text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all duration-300 shadow-xl shadow-indigo-200 transform hover:-translate-y-1 flex items-center"
              >
                <span>View Full Profile & CV</span>
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CV Modal */}
      {selectedCv && selectedCv.cv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedCv(null)}
          ></div>
          
          <div className="relative bg-slate-50 rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300 border border-slate-200">
            <button 
              onClick={() => setSelectedCv(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors z-20 shadow-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="p-8 sm:p-12 lg:p-16">
              <div className="flex flex-col sm:flex-row gap-8 items-start mb-12">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-indigo-600 rounded-3xl transform rotate-3 opacity-10"></div>
                  <img src={selectedCv.image} alt={selectedCv.name} className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover object-top shadow-xl border-4 border-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{selectedCv.name}</h3>
                  <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4">{selectedCv.role} <span className="text-slate-300 mx-2">•</span> {selectedCv.subject}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCv.specialties.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-indigo-100/50">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <section>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                    <span className="w-6 h-px bg-slate-300 mr-4"></span>
                    Professional Summary
                  </h4>
                  <div className="bg-gradient-to-br from-indigo-50/50 to-white p-8 sm:p-10 rounded-[2rem] border border-indigo-100/50 relative overflow-hidden shadow-xl shadow-indigo-100/20">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <svg className="w-24 h-24 text-indigo-900" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium text-base sm:text-lg relative z-10">{selectedCv.cv.about}</p>
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                    <span className="w-6 h-px bg-slate-300 mr-4"></span>
                    Experience
                  </h4>
                  <div className="space-y-10">
                    {selectedCv.cv.experience.map((exp, i) => (
                      <div key={i} className="relative pl-8 sm:pl-10">
                        {/* Timeline Line */}
                        {i !== selectedCv.cv!.experience.length - 1 && (
                          <div className="absolute left-[7px] sm:left-[11px] top-8 bottom-[-2.5rem] w-px bg-indigo-100"></div>
                        )}
                        {/* Timeline Dot */}
                        <div className="absolute w-4 h-4 bg-indigo-600 rounded-full left-0 sm:left-1 top-6 ring-4 ring-white shadow-sm z-10 flex items-center justify-center">
                           <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        
                        <div className="bg-white hover:-translate-y-1 rounded-[2rem] p-6 sm:p-8 border border-slate-100 hover:border-indigo-100 transition-all duration-300 shadow-xl shadow-slate-200/40">
                          <h5 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">{exp.role}</h5>
                          <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border border-indigo-100">{exp.company}</span>
                            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{exp.duration}</span>
                          </div>
                          
                          <div className="space-y-4">
                            {exp.description.split('. ').filter(Boolean).map((sentence, idx) => (
                              <div key={idx} className="flex items-start group">
                                <span className="bg-green-100 text-green-600 rounded-full p-1 mr-4 mt-0.5 shrink-0 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                </span>
                                <span className="text-sm sm:text-[15px] leading-relaxed text-slate-700 font-medium pt-px">
                                  {sentence}{sentence.endsWith('.') ? '' : '.'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                    <span className="w-6 h-px bg-slate-300 mr-4"></span>
                    Education
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedCv.cv.education.map((edu, i) => (
                      <div key={i} className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all duration-300 relative group shadow-lg shadow-slate-200/40 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                        </div>
                        <h5 className="font-extrabold text-slate-900 mb-2 text-lg sm:text-xl pr-12 leading-tight">{edu.degree}</h5>
                        <p className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-widest">{edu.institution} <span className="mx-2 text-slate-300">•</span> {edu.year}</p>
                        
                        {selectedCv.cv.certificateUrl && edu.degree.includes("Computer Engineering") && (
                          <>
                            {selectedCv.cv.certificateNote && (
                              <div className="mt-4 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-start space-x-3 transition-colors duration-300 group-hover:bg-indigo-50">
                                <svg className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-xs text-indigo-900/80 font-medium leading-relaxed">{selectedCv.cv.certificateNote}</p>
                              </div>
                            )}
                            <a 
                              href={selectedCv.cv.certificateUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-slate-100 group-hover:border-indigo-200 group-hover:scale-110"
                              title="View Certificate"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </a>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {selectedCv.cv.certifications && selectedCv.cv.certifications.length > 0 && (
                  <section>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
                      <span className="w-6 h-px bg-slate-300 mr-4"></span>
                      Certifications
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {selectedCv.cv.certifications.map((cert, i) => (
                        <li key={i} className="flex items-center space-x-3 text-slate-600 font-medium text-sm sm:text-base bg-white border border-slate-100 p-3 sm:p-4 rounded-xl shadow-sm">
                          <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FounderProfile;
