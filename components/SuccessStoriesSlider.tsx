
import React, { useState, useEffect, useCallback } from 'react';
import { testimonials, getYouTubeId, isYouTubeShort } from '../data/testimonials';

const SuccessStoriesSlider: React.FC<{ onViewAll: () => void }> = ({ onViewAll }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStart = React.useRef<number | null>(null);
  const touchEnd = React.useRef<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, maxIndex]);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, maxIndex]);

  useEffect(() => {
    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + visibleCount);
    const hasVideo = visibleTestimonials.some(t => t.type === 'video');
    
    if (hasVideo) return;

    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, currentIndex, visibleCount]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      next();
    } else {
      prev();
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden px-4 sm:px-6 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 flex items-center">
              <span className="w-8 h-px bg-indigo-600 mr-4"></span>
              Success Stories
            </h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Lives</span> through STEM
            </h3>
            <p className="mt-6 text-lg text-slate-600 font-medium leading-relaxed">
              Join the growing community of parents who have watched their children gain confidence and master their school subjects.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2 mr-4">
              <button 
                onClick={prev}
                className="w-10 h-10 rounded-xl bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-center border border-slate-200 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={next}
                className="w-10 h-10 rounded-xl bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-center border border-slate-200 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <button 
              onClick={onViewAll}
              className="group flex items-center space-x-2 text-indigo-600 font-bold uppercase text-sm tracking-[0.2em] hover:text-indigo-800 transition-colors"
            >
              <span className="hidden sm:inline">Browse All</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          className="relative overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {testimonials.map((story) => {
              const ytId = story.type === 'video' && story.videoUrl ? getYouTubeId(story.videoUrl) : null;
              const isShort = story.type === 'video' && story.videoUrl ? isYouTubeShort(story.videoUrl) : false;

              return (
                <div 
                  key={story.id} 
                  className="w-full flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full relative group hover:shadow-md hover:border-indigo-100 transition-all duration-300">
                    <div className="p-6 sm:p-8 flex flex-col h-full relative z-10">
                      <div className="flex justify-between items-start mb-6 gap-3">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 mb-1">{story.name}</h4>
                          <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">{story.grade} <span className="text-slate-300 mx-1">•</span> {story.subject}</p>
                        </div>
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
                          {story.improvement}
                        </div>
                      </div>
                      
                      {story.type === 'text' ? (
                        <div className="relative mb-6 flex-1 flex items-center bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                          <span className="text-5xl text-indigo-200/50 absolute -top-4 -left-1 font-serif leading-none select-none">“</span>
                          <p className="text-sm font-medium text-slate-700 leading-relaxed italic relative z-10">
                            {story.quote}
                          </p>
                        </div>
                      ) : (
                        <div className={`relative mb-6 flex-1 rounded-2xl overflow-hidden shadow-sm bg-slate-900 border border-slate-200 ${isShort ? 'aspect-[9/16] max-w-[200px] mx-auto w-full' : 'aspect-video w-full'}`}>
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

                      <div className="pt-4 border-t border-slate-100 flex items-center mt-auto">
                        <div className="flex items-center space-x-2 text-indigo-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745a3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-bold text-[10px] uppercase tracking-wider text-slate-800">{story.characterFocus}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 transition-all duration-500 rounded-full ${currentIndex === i ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200 hover:bg-indigo-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSlider;