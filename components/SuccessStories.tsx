
import React from 'react';
import { testimonials, getYouTubeId, isYouTubeShort } from '../data/testimonials';

const SuccessStories: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="mb-16">
        <button 
          onClick={onBack}
          className="group flex items-center text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] mb-10 hover:text-indigo-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </button>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">Real Results. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Real Character.</span></h1>
        <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl font-medium leading-relaxed">
          See how our holistic approach to STEM tutoring transforms grades and develops responsible, hard-working students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
        {testimonials.map((story) => {
          const ytId = story.type === 'video' && story.videoUrl ? getYouTubeId(story.videoUrl) : null;
          const isShort = story.type === 'video' && story.videoUrl ? isYouTubeShort(story.videoUrl) : false;

          return (
            <div key={story.id} className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden flex flex-col group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="p-8 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{story.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{story.grade} <span className="text-slate-300 mx-1">•</span> {story.subject}</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
                    {story.improvement}
                  </div>
                </div>
                
                {story.type === 'text' ? (
                  <div className="flex-1 relative bg-slate-50/50 rounded-2xl p-6 mb-6 border border-slate-100 group-hover:bg-indigo-50/30 transition-colors duration-300">
                    <span className="text-6xl text-indigo-200/50 absolute -top-4 -left-2 font-serif select-none">“</span>
                    <p className="relative z-10 text-sm text-slate-700 font-medium leading-relaxed italic pt-2">{story.quote}</p>
                  </div>
                ) : (
                  <div className={`flex-1 relative rounded-2xl overflow-hidden mb-6 shadow-sm bg-slate-900 border border-slate-200 ${isShort ? 'aspect-[9/16] max-w-[240px] mx-auto w-full' : 'aspect-video w-full'}`}>
                    {ytId ? (
                      <iframe
                        className="w-full h-full absolute top-0 left-0"
                        src={`https://www.youtube.com/embed/${ytId}`}
                        title={`${story.name} Testimonial`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video 
                        controls 
                        className="w-full h-full object-cover absolute top-0 left-0"
                        poster={story.videoPoster}
                      >
                        <source src={story.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                )}

                <div className="pt-6 border-t border-slate-100 mt-auto flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-indigo-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745a3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">{story.characterFocus}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-24 relative rounded-[4rem] overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/90 to-slate-900/90"></div>
        
        <div className="relative p-12 sm:p-24 text-center text-white z-10 flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight max-w-3xl leading-[1.1]">Ready to write your child's success story?</h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">Join our community of high-achieving, disciplined, and purposeful students today.</p>
          <button 
            onClick={() => window.scrollTo(0, 0)}
            className="px-12 py-6 bg-white text-indigo-600 rounded-2xl font-extrabold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest"
          >
            Apply for Admission
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;