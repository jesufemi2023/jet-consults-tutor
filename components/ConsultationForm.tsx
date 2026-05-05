
import React, { useState } from 'react';
import { Subject, ConsultationRequest, TutoringPlan, GradeLevel } from '../types.ts';
import { generateStudyPlan } from '../services/geminiService.ts';

interface ConsultationFormProps {
  onNavigate?: (page: any) => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TutoringPlan | null>(null);
  const [formData, setFormData] = useState<ConsultationRequest>({
    parentName: '',
    email: '',
    studentName: '',
    schoolName: '',
    grade: GradeLevel.GRADE_7,
    subject: Subject.MATHS,
    location: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const generatedPlan = await generateStudyPlan(formData);
      setPlan(generatedPlan);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (plan) {
    return (
      <div className="bg-white p-8 sm:p-16 rounded-[3.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 max-w-4xl mx-auto animate-in fade-in zoom-in duration-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-12">
          <div className="flex items-center space-x-6">
            <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-100 shadow-sm">
              <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Expert Plan Ready</h2>
              <p className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-xs">Prepared for {formData.studentName} <span className="text-slate-300 mx-2">•</span> {formData.schoolName}</p>
            </div>
          </div>
          <button 
            onClick={() => setPlan(null)}
            className="text-slate-400 hover:text-indigo-600 transition-colors text-xs font-bold uppercase tracking-[0.2em] flex items-center group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            Modify Details
          </button>
        </div>
        
        <div className="space-y-12">
          <div className="bg-slate-50 p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 relative">
            <span className="text-6xl text-indigo-100 absolute -top-4 -left-2 font-serif select-none">“</span>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 relative z-10">Academic Strategy</h3>
            <p className="text-slate-700 leading-relaxed font-medium text-xl italic relative z-10">{plan.summary}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                <span className="w-6 h-px bg-slate-300 mr-4"></span>
                Focus Roadmap
              </h3>
              <ul className="space-y-4">
                {plan.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 hover:shadow-md transition-all group">
                    <span className="mr-4 text-indigo-400 group-hover:text-indigo-600 transition-colors mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    <span className="text-sm font-medium text-slate-700 leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-200 flex-1 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-[0.2em] mb-3 relative z-10">Monthly Investment</p>
                <p className="text-5xl font-extrabold tracking-tight relative z-10">{plan.monthlyFee}</p>
                <p className="text-xs text-indigo-200 font-medium mt-6 relative z-10 leading-relaxed">Pre-payment required for teacher assignment and scheduling.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Standard Schedule</p>
                <p className="text-2xl font-extrabold text-slate-900">{plan.estimatedDuration}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100">
            <button 
              className="w-full py-6 bg-slate-900 text-white rounded-2xl font-extrabold text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-600 hover:-translate-y-1 transition-all duration-300"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('register');
                } else {
                  alert("Registration confirmed! Redirecting to secure payment portal...");
                }
              }}
            >
              Proceed to Enrollment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-16 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-4xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="text-center mb-16 relative z-10">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-indigo-100">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Consult an Educator</h2>
        <p className="text-slate-600 font-medium text-xl max-w-2xl mx-auto leading-relaxed">Classes via Google Meet, 2x per week. Monthly tuition starts at $100.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Parent Name</label>
            <input 
              required
              type="text" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder-slate-400"
              placeholder="e.g. John Smith"
              value={formData.parentName}
              onChange={(e) => setFormData({...formData, parentName: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Email</label>
            <input 
              required
              type="email" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder-slate-400"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Student Name</label>
            <input 
              required
              type="text" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder-slate-400"
              placeholder="First Name"
              value={formData.studentName}
              onChange={(e) => setFormData({...formData, studentName: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Current School</label>
            <input 
              required
              type="text" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder-slate-400"
              placeholder="School Name"
              value={formData.schoolName}
              onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Country or Continent</label>
            <input 
              required
              type="text" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder-slate-400"
              placeholder="e.g. Nigeria, USA, Europe"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Academic Grade / Age</label>
            <div className="relative">
              <select 
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 appearance-none cursor-pointer"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
              >
                {Object.values(GradeLevel).map(grade => <option key={grade} value={grade}>{grade}</option>)}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Core Subject</label>
            <div className="relative">
              <select 
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 appearance-none cursor-pointer"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value as Subject})}
              >
                {Object.values(Subject).map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Detailed Academic Context</label>
          <textarea 
            className="w-full px-6 py-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder-slate-400 min-h-[160px] resize-none"
            placeholder="Tell us about their school performance, specific topics they find hard, and any character development goals..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        <div className="pt-4">
          <button 
            disabled={loading}
            type="submit" 
            className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-extrabold text-sm uppercase tracking-widest hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-indigo-200 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center space-x-4 group"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing Region & Profiles...</span>
              </>
            ) : (
              <>
                <span>Generate Geo-Aligned Study Plan</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </>
            )}
          </button>
          <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-6">
            Geographically Relevant <span className="mx-2">•</span> AI-Powered Consultation <span className="mx-2">•</span> Verified Educators
          </p>
        </div>
      </form>
    </div>
  );
};

export default ConsultationForm;
