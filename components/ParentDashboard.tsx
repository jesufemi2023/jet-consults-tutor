
import React from 'react';
import { GradeLevel } from '../types.ts';

interface ParentDashboardProps {
  onBack: () => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <button 
            onClick={onBack}
            className="group flex items-center text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] mb-8 hover:text-indigo-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </button>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">Parent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Portal</span></h1>
          <p className="text-slate-500 font-medium text-lg">Manage your child's academic journey.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logged in as</p>
            <p className="font-extrabold text-slate-900">Sarah Smith</p>
          </div>
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-extrabold text-lg border-2 border-white shadow-md">
            SS
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Student Info & Quick Actions */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Active Student</h2>
            <div className="flex items-center space-x-5 mb-8">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 font-extrabold text-2xl shadow-inner">
                JD
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xl">John Doe</p>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">Grade 10 • USA</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Enrolled</span>
                <span className="font-extrabold text-slate-900">Mathematics</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Next Class</span>
                <span className="font-extrabold text-indigo-600">Today, 4:00 PM</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 relative z-10">Quick Actions</h2>
            <div className="space-y-3 relative z-10">
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-extrabold text-sm transition-colors flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                <span>Join Live Class</span>
              </button>
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-extrabold text-sm transition-colors flex items-center justify-center space-x-3 text-slate-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>Reschedule</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Progress & Reports */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recent Progress Reports</h2>
              <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">View All</button>
            </div>
            
            <div className="space-y-6">
              {[
                { date: 'Oct 15, 2023', subject: 'Mathematics', topic: 'Algebraic Expressions', score: '92%', notes: 'John showed great improvement in factoring complex equations. Needs slight review on quadratic formulas.' },
                { date: 'Oct 08, 2023', subject: 'Mathematics', topic: 'Linear Equations', score: '85%', notes: 'Good grasp of the core concepts. We focused on word problems this session.' }
              ].map((report, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{report.date}</span>
                      <h4 className="font-extrabold text-slate-900 text-lg mt-1">{report.topic}</h4>
                    </div>
                    <div className="bg-emerald-100 text-emerald-700 font-extrabold px-3 py-1 rounded-lg text-sm">
                      {report.score}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{report.notes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 p-8 sm:p-10 rounded-[2.5rem] border border-indigo-100">
             <h2 className="text-xl font-extrabold text-indigo-900 tracking-tight mb-6">Teacher Feedback</h2>
             <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 font-extrabold shrink-0 shadow-sm">
                  MT
                </div>
                <div>
                  <p className="text-indigo-800 font-medium leading-relaxed italic mb-4">"John is becoming much more confident in asking questions when he doesn't understand a concept. His homework completion rate has also improved significantly this month."</p>
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">- Mr. Thompson (Math Tutor)</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
