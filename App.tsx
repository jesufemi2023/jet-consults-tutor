
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import ProgramsSection from './components/ProgramsSection.tsx';
import ConsultationForm from './components/ConsultationForm.tsx';
import RegistrationForm from './components/RegistrationForm.tsx';
import FounderProfile from './components/TeacherProfiles.tsx';
import SuccessStories from './components/SuccessStories.tsx';
import SuccessStoriesSlider from './components/SuccessStoriesSlider.tsx';
import BookingCalendar from './components/BookingCalendar.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import { Mail, Phone, Calendar, UserPlus, ArrowRight, Star, X, Play } from 'lucide-react';
import { BRANDING, CONTACT } from './constants';

type Page = 'home' | 'consult' | 'stories' | 'booking' | 'register' | 'admin';

const PageTransition: React.FC<{ children: React.ReactNode; pageKey: string }> = ({ children, pageKey }) => (
  <motion.div
    key={pageKey}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="w-full"
  >
    {children}
  </motion.div>
);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <PageTransition pageKey="home">
            <Hero 
              onStart={() => handleNavigate('consult')} 
              onStories={() => handleNavigate('stories')}
            />
            
            {/* Direct Booking Invitation */}
            <section className="py-24 sm:py-32 bg-[#0F172A] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
              <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                <div className="text-center lg:text-left max-w-3xl">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center px-5 py-2 mb-8 text-[11px] font-black tracking-[0.3em] text-indigo-300 uppercase bg-indigo-900/40 rounded-full border border-indigo-700/30 backdrop-blur-md"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mr-3 animate-pulse"></span>
                    Direct Access
                  </motion.div>
                  <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tightest mb-8 leading-[1.1]">
                    Prefer a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">direct line?</span>
                  </h3>
                  <p className="text-slate-400 font-medium text-xl leading-relaxed max-w-2xl">
                    Speak directly with our academic director to discuss your child's specific needs and craft a personalized path.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigate('booking')}
                    className="group w-full sm:w-auto relative px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg hover:bg-indigo-500 transition-all duration-300 shadow-2xl shadow-indigo-600/20 flex items-center justify-center gap-4"
                  >
                    Book a Direct Call
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/${CONTACT.whatsappNumber}?text=Hello%20Jet%20Consults,%20I'm%20interested%20in%20your%20tutoring%20programs.`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group w-full sm:w-auto px-10 py-5 bg-[#25D366] text-white rounded-[2rem] font-black text-lg hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20"
                  >
                    Chat on WhatsApp
                  </motion.a>
                </div>
              </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 sm:py-32 bg-white px-6 relative overflow-hidden">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
                <div className="flex-1 w-full relative">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="absolute -inset-8 bg-indigo-50 rounded-[5rem] rotate-3 group-hover:rotate-1 transition-transform duration-700"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=90" 
                      alt="Education focus"
                      className="relative rounded-[4rem] shadow-2xl border-8 border-white object-cover aspect-[4/5] sm:aspect-auto transform group-hover:-translate-y-2 transition-transform duration-500"
                    />
                    <div className="absolute -bottom-10 -right-10 bg-slate-900 text-white p-12 rounded-[3rem] shadow-2xl hidden md:block border-8 border-white">
                      <p className="text-7xl font-black mb-2 tracking-tighter">100%</p>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">Character First</p>
                    </div>
                  </motion.div>
                </div>
                <div className="flex-1 space-y-14">
                  <div>
                    <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                      <span className="w-12 h-px bg-indigo-200"></span>
                      Our Philosophy
                    </h2>
                    <h3 className="text-5xl sm:text-6xl font-black text-slate-900 leading-[1.05] tracking-tightest">
                      Beyond the <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 italic">classroom.</span>
                    </h3>
                  </div>
                  <p className="text-xl text-slate-500 leading-relaxed font-normal">
                    We believe true excellence comes from a balanced heart and mind. Our specialized counseling help students manage stress, build confidence, and develop academic leadership.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="group p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-indigo-100 transition-all duration-500">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mb-8 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <Star className="w-8 h-8" />
                      </div>
                      <h4 className="font-black text-slate-900 text-2xl mb-4 tracking-tight">Mentorship</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">Personalized emotional and academic guidance.</p>
                    </div>
                    <div className="group p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-blue-100 transition-all duration-500">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                      <h4 className="font-black text-slate-900 text-2xl mb-4 tracking-tight">Foundations</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">Fixing gaps and building core mastery.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <ProgramsSection />

            <Features />

            <FounderProfile />

            <SuccessStoriesSlider onViewAll={() => handleNavigate('stories')} />

            {/* CTA Section */}
            <section className="py-24 sm:py-32 px-6 bg-white">
              <div className="max-w-7xl mx-auto rounded-[5rem] bg-slate-900 relative overflow-hidden shadow-3xl shadow-indigo-100/20">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-blue-600/20"></div>
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="footer-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100" height="100" fill="url(#footer-grid)" />
                  </svg>
                </div>
                
                <div className="relative z-10 p-16 sm:p-28 text-center max-w-5xl mx-auto">
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-10 tracking-tightest leading-[1.05]"
                  >
                    Secure their <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">academic future.</span>
                  </motion.h2>
                  <p className="text-xl sm:text-2xl text-slate-400 mb-14 leading-relaxed max-w-3xl mx-auto font-normal">
                    Join a community of successful families. Transform from struggling to leading with a structured path to excellence.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                    <button 
                      onClick={() => handleNavigate('register')}
                      className="w-full sm:w-auto px-14 py-6 bg-white text-slate-900 rounded-[2.5rem] font-black text-xl hover:bg-indigo-50 transition-all duration-300 shadow-xl shadow-black/20"
                    >
                      Enroll Now
                    </button>
                    <button 
                      onClick={() => handleNavigate('stories')}
                      className="w-full sm:w-auto px-14 py-6 bg-white/5 text-white border border-white/20 rounded-[2.5rem] font-black text-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                    >
                      Success Stories
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </PageTransition>
        );
      case 'stories':
        return (
          <PageTransition pageKey="stories">
            <div className="bg-white min-h-screen">
              <SuccessStories onBack={() => handleNavigate('home')} />
            </div>
          </PageTransition>
        );
      case 'consult':
        return (
          <PageTransition pageKey="consult">
            <div className="py-24 sm:py-32 px-6 bg-[#FAFAFB] min-h-screen">
              <ConsultationForm onNavigate={handleNavigate} />
            </div>
          </PageTransition>
        );
      case 'register':
        return (
          <PageTransition pageKey="register">
            <div className="py-24 sm:py-32 px-6 bg-[#FAFAFB] min-h-screen">
              <RegistrationForm onBack={() => handleNavigate('home')} />
            </div>
          </PageTransition>
        );
      case 'booking':
        return (
          <PageTransition pageKey="booking">
            <div className="py-24 sm:py-32 px-6 bg-[#FAFAFB] min-h-screen">
              <BookingCalendar onBack={() => handleNavigate('home')} />
            </div>
          </PageTransition>
        );
      case 'admin':
        return (
          <PageTransition pageKey="admin">
            <div className="bg-[#FAFAFB] min-h-screen pt-32">
              <AdminDashboard />
            </div>
          </PageTransition>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] selection:bg-indigo-600 selection:text-white font-sans antialiased text-slate-900 overflow-x-hidden">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 relative z-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center p-2">
                <img src={BRANDING.logoUrl} alt={BRANDING.name} className="w-full h-full object-contain invert grayscale brightness-200" />
              </div>
              <span className="text-3xl font-black text-white tracking-tightest">{BRANDING.name}</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed font-normal text-lg mb-10">
              Premium secondary education reinforcement focusing on technical mastery, character building, and academic leadership.
            </p>
            <div className="space-y-4 mb-12">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <Mail className="w-5 h-5 text-indigo-400 group-hover:text-white" />
                </div>
                <span className="font-bold">{CONTACT.email}</span>
              </a>
              <a href={`https://wa.me/${CONTACT.whatsappNumber}?text=Hello%20Jet%20Consults,%20I'd%20like%20to%20know%20more%20about%20your%20programs.`} className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                  <Phone className="w-5 h-5 text-emerald-400 group-hover:text-white" />
                </div>
                <span className="font-bold">{CONTACT.whatsappDisplay} (WhatsApp)</span>
              </a>
            </div>
            <div className="flex gap-4">
              {[X, Mail, Phone].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-3 lg:col-start-8">
            <h4 className="font-black text-white mb-10 uppercase text-[11px] tracking-[0.4em] opacity-50">Programs</h4>
            <ul className="space-y-6 text-[15px] font-bold">
              {['Early Literacy', 'English Prep', 'STEM Mastery', 'Advanced Physics', 'Chemistry', 'Coding & AI'].map((p) => (
                <li key={p}>
                  <button onClick={() => handleNavigate('home')} className="hover:text-indigo-400 transition-colors flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-black text-white mb-10 uppercase text-[11px] tracking-[0.4em] opacity-50">Links</h4>
            <ul className="space-y-6 text-[15px] font-bold">
              {['Stories', 'Booking', 'Register', 'Admin'].map((l) => (
                <li key={l}>
                  <button onClick={() => handleNavigate(l.toLowerCase() as Page)} className="hover:text-indigo-400 transition-colors">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
          <span>© {new Date().getFullYear()} {BRANDING.name}.</span>
          <div className="flex gap-10">
            <button className="hover:text-white transition-colors">Privacy</button>
            <button className="hover:text-white transition-colors">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;