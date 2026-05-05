
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Star, CheckCircle2, ChevronDown, Phone } from 'lucide-react';
import { CONTACT } from '../constants';

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=90",
    alt: "Students collaborative learning"
  },
  {
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=90",
    alt: "STEM education and discovery"
  },
  {
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=90",
    alt: "Engaged online learning interaction"
  },
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=90",
    alt: "Technical mastery and coding excellence"
  },
  {
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=90",
    alt: "Advanced academic study and research"
  },
  {
    url: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1200&q=90",
    alt: "Personalized 1-on-1 mentorship session"
  },
  {
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=90",
    alt: "Collaborative academic achievement"
  }
];

const Hero: React.FC<{ onStart: () => void; onStories: () => void }> = ({ onStart, onStories }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToValues = () => {
    const el = document.getElementById('values');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative pt-28 pb-20 sm:pt-40 sm:pb-32 px-6 overflow-hidden bg-[#FAFAFB]">
      {/* Sophisticated Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-full h-full bg-gradient-radial from-indigo-100/40 to-transparent rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-gradient-radial from-blue-100/30 to-transparent rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-5 py-2 mb-10 text-[11px] font-bold tracking-[0.3em] text-indigo-700 uppercase bg-white rounded-full border border-slate-100 shadow-sm-soft backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Personalized Academic Excellence
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] mb-8 tracking-tightest">
            Mastering <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-blue-500 pr-4">STEM</span> & <br />
            Building Character.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            We help your child master school subjects from Grades 3-12 and build the character they need to lead. From early reading (Ages 4-8) to advanced STEM, we bridge learning gaps and prepare your child for total success.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-2xl">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">STEM Mastery</h4>
                <p className="text-slate-500 text-xs mt-1">Advanced Physics, Chemistry & Math reinforcement for Grades 3-12.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Early Literacy</h4>
                <p className="text-slate-500 text-xs mt-1">Foundation reading & writing excellence for children ages 4-8.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 text-orange-600 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Specialized Support</h4>
                <p className="text-slate-500 text-xs mt-1">1:1 dedicated sessions tailored to bridge unique learning gaps.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <div className="w-5 h-5 bg-emerald-600 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Faith & Character</h4>
                <p className="text-slate-500 text-xs mt-1">Fear of God, responsibility, and bi-monthly Bible study.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-16">
            <button 
              onClick={onStart}
              className="group relative w-full sm:w-auto px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-indigo-600 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
            <a 
              href={`https://wa.me/${CONTACT.whatsappNumber}?text=Hello%20Jet%20Consults,%20I%20saw%20your%20website%20and%20I'm%20interested%20in%20enrolling%20my%20child.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-12 py-6 bg-[#25D366] text-white rounded-[2rem] font-black text-lg hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-5 h-5 fill-current" />
              </div>
              WhatsApp US
            </a>
            <button 
              onClick={onStories}
              className="group w-full sm:w-auto px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black text-lg hover:bg-slate-50 transition-all duration-300 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md flex items-center justify-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              Success Stories
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="relative lg:block"
        >
          <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border-[12px] border-white shadow-2xl shadow-slate-200/50 group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                src={HERO_IMAGES[currentImageIndex].url} 
                alt={HERO_IMAGES[currentImageIndex].alt}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
            
            <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <div className="flex gap-2">
                {HERO_IMAGES.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-700 ${idx === currentImageIndex ? 'w-12 bg-white' : 'w-4 bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-12 bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white z-20 hidden xl:flex items-center gap-5"
          >
            <div className="w-16 h-16 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Star className="w-8 h-8 fill-current" />
            </div>
            <div>
              <p className="text-[11px] uppercase font-black tracking-widest text-slate-400 mb-1">Impact Record</p>
              <p className="text-xl font-black text-slate-900">98% Success</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-16 -left-16 bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl shadow-blue-100/50 border border-white z-20 hidden xl:flex flex-col gap-3"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-200`}>
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black">
                +200
              </div>
            </div>
            <p className="text-sm font-bold text-slate-600">Students transformed</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToValues}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-3 text-slate-400 hover:text-indigo-600 transition-colors"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.button>
    </section>
  );
};

export default Hero;
