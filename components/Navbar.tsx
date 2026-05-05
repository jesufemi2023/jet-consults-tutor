
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRANDING } from '../constants';
import { Menu, X, Calendar, UserPlus, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'consult' | 'booking' | 'stories' | 'register') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (pageOrId: 'home' | 'consult' | 'booking' | 'stories' | 'register' | string) => {
    setIsMenuOpen(false);
    
    const pages = ['home', 'consult', 'booking', 'stories', 'register'];
    
    if (pages.includes(pageOrId)) {
      onNavigate(pageOrId as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById(pageOrId);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const el = document.getElementById(pageOrId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo & Name */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer group shrink-0"
            onClick={() => handleLinkClick('home')}
            id="branding-logo"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-indigo-600 rounded-2xl rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-indigo-200/50"></div>
              <div className="absolute inset-0 bg-white rounded-2xl group-hover:rotate-3 transition-transform duration-500 border border-slate-100"></div>
              <img 
                src={BRANDING.logoUrl} 
                alt={BRANDING.name}
                className="relative w-8 h-8 object-contain z-10 p-0.5"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                  {BRANDING.name.split(' ')[0]}
                </span>
                <span className="text-xl font-light text-slate-500 tracking-tight leading-none italic">
                  {BRANDING.name.split(' ').slice(1).join(' ')}
                </span>
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-indigo-600/90 mt-1.5 border-t border-indigo-100 pt-1 leading-none">
                {BRANDING.subtitle}
              </span>
            </div>
          </motion.div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/40 p-1.5 rounded-2xl border border-slate-200/30 backdrop-blur-md">
            {[
              { id: 'home', label: 'Home' },
              { id: 'values', label: 'Values' },
              { id: 'stories', label: 'Stories' },
              { id: 'teachers', label: 'Founder' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`relative px-6 py-2 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ${currentPage === item.id || (currentPage === 'home' && item.id === 'home') ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {(currentPage === item.id || (currentPage === 'home' && item.id === 'home')) && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/50 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('booking')}
              className="hidden md:flex items-center gap-2.5 px-6 py-2.5 rounded-2xl text-[13px] font-bold uppercase tracking-wider text-slate-700 hover:text-indigo-600 hover:bg-white transition-all border border-transparent hover:border-slate-200 hover:shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Book Call
            </button>
            <button 
              onClick={() => onNavigate('register')}
              className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[13px] font-extrabold uppercase tracking-widest hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition-all transform hover:-translate-y-0.5 group"
            >
              Enroll Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Mobile Menu Button */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="lg:hidden p-3 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-4">
              {[
                { id: 'home', label: 'Home' },
                { id: 'values', label: 'Our Values' },
                { id: 'stories', label: 'Success Stories' },
                { id: 'teachers', label: 'Founder Profile' }
              ].map((item, idx) => (
                <motion.button 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleLinkClick(item.id)} 
                  className="flex items-center justify-between py-4 px-6 rounded-2xl font-extrabold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100"
                >
                  {item.label}
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
              
              <div className="h-px bg-slate-100 my-4" />
              
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => handleLinkClick('booking')} 
                  className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-indigo-50 text-indigo-600 font-black text-sm uppercase tracking-widest transition-all hover:bg-indigo-100"
                >
                  <Calendar className="w-5 h-5" />
                  Book Call
                </button>
                <button 
                  onClick={() => handleLinkClick('register')}
                  className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest transition-all hover:bg-indigo-600 shadow-xl shadow-indigo-100"
                >
                  <UserPlus className="w-5 h-5" />
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;