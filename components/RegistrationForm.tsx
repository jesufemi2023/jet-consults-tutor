
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { sendRegistrationEmail } from '../services/emailService';

const SUBJECT_PRICES: Record<string, number> = {
  'Reading & Writing (Ages 4-8)': 100,
  'English (Grades 3-9)': 100,
  'Math (Grades 3-9)': 100,
  'Mathematics': 120,
  'Physics': 120,
  'Chemistry': 120,
  'Coding': 120,
};

const SUBJECT_OLD_PRICES: Record<string, number> = {
  'Reading & Writing (Ages 4-8)': 130,
  'English (Grades 3-9)': 130,
  'Math (Grades 3-9)': 130,
  'Mathematics': 150,
  'Physics': 150,
  'Chemistry': 150,
  'Coding': 150,
};

const getPrice = (sub: string) => SUBJECT_PRICES[sub] || 120;
const getOldPrice = (sub: string) => SUBJECT_OLD_PRICES[sub] || 150;
const calculateTotal = (subjects: string[]) => subjects.reduce((sum, sub) => sum + getPrice(sub), 0);

const RegistrationForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('Grade 7');
  const [schoolName, setSchoolName] = useState('');
  const [characterFocus, setCharacterFocus] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const toggleSubject = (sub: string) => {
    setSelectedSubjects(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!supabase) {
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          { 
            student_name: studentName, 
            grade, 
            school_name: schoolName, 
            subjects: selectedSubjects, 
            character_focus: characterFocus,
            total_monthly_fee: calculateTotal(selectedSubjects)
          }
        ]);

      if (error) throw error;
      
      // Attempt to send email notification
      await sendRegistrationEmail({
        studentName,
        grade,
        schoolName,
        subjects: selectedSubjects,
        totalFee: calculateTotal(selectedSubjects)
      });
      
      setSubmitted(true);
    } catch (err: any) {
      console.error('Error saving registration:', err);
      setError(err.message || 'Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-10 sm:p-16 rounded-[3.5rem] shadow-2xl shadow-indigo-100/50 text-center animate-in zoom-in duration-500 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner border border-emerald-100">
          <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Payment Initiated</h2>
        <p className="text-xl text-slate-600 font-medium mb-12 leading-relaxed max-w-lg mx-auto">
          Thank you for enrolling! Once your monthly payment of <span className="text-indigo-600 font-extrabold bg-indigo-50 px-3 py-1 rounded-lg mx-1">${calculateTotal(selectedSubjects)}</span> is confirmed, our Academic Director will assign your child's mentor and share the Google Meet schedule.
        </p>
        <button 
          onClick={onBack}
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-extrabold uppercase tracking-widest text-sm shadow-xl hover:bg-indigo-600 hover:-translate-y-1 transition-all duration-300"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-16">
        <button 
          onClick={onBack}
          className="group flex items-center text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] mb-10 hover:text-indigo-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Registration</span></h1>
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em] bg-indigo-50 px-4 py-2 rounded-full self-start sm:self-auto">Step {step} of 4</span>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-700 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-8 sm:p-12 md:p-16 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none"></div>
        
        {step === 1 && (
          <div className="space-y-10 animate-in slide-in-from-right-8 duration-500 relative z-10">
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Basic Information</h3>
              <p className="text-lg text-slate-500 font-medium">Let's start with the student's details.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Student Full Name</label>
                <input 
                  type="text" 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder-slate-400" 
                  placeholder="Jane Doe" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Current Grade</label>
                <div className="relative">
                  <select 
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 appearance-none cursor-pointer"
                  >
                    <option>Ages 4-8 (Early Literacy)</option>
                    <option>Grade 3</option>
                    <option>Grade 4</option>
                    <option>Grade 5</option>
                    <option>Grade 6</option>
                    <option>Grade 7</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">School Name</label>
              <input 
                type="text" 
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder-slate-400" 
                placeholder="Lakeside Secondary School" 
              />
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 ml-2">We group students from the same school to ensure curriculum alignment.</p>
            </div>
            <div className="pt-6">
              <button 
                onClick={nextStep} 
                disabled={!studentName.trim() || !schoolName.trim()}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-extrabold uppercase tracking-widest text-sm shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:hover:-translate-y-0 disabled:shadow-none"
              >
                Continue to Academic Profile
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in slide-in-from-right-8 duration-500 relative z-10">
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Academic Profile</h3>
              <p className="text-lg text-slate-500 font-medium">Which subjects need reinforcement? <span className="text-indigo-600 font-bold">(Starting at $100/subject)</span></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Reading & Writing (Ages 4-8)', 'English (Grades 3-9)', 'Math (Grades 3-9)', 'Mathematics', 'Physics', 'Chemistry', 'Coding'].map(sub => (
                <label key={sub} className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedSubjects.includes(sub) ? 'bg-indigo-50 border-indigo-600 shadow-md' : 'bg-slate-50 border-transparent hover:border-indigo-200 hover:bg-white'}`}>
                  <input type="checkbox" className="hidden" checked={selectedSubjects.includes(sub)} onChange={() => toggleSubject(sub)} />
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center mr-4 transition-colors ${selectedSubjects.includes(sub) ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-slate-300'}`}>
                    {selectedSubjects.includes(sub) && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                       <span className={`font-bold text-lg ${selectedSubjects.includes(sub) ? 'text-indigo-900' : 'text-slate-700'}`}>{sub}</span>
                       {getOldPrice(sub) > getPrice(sub) && (
                         <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">SAVE ${(getOldPrice(sub) - getPrice(sub))}</span>
                       )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-black text-indigo-600">${getPrice(sub)}<span className="text-[10px] text-indigo-500 uppercase tracking-widest font-bold">/mo</span></span>
                      {getOldPrice(sub) > getPrice(sub) && (
                        <span className="text-xs font-bold text-slate-400 line-through decoration-2">${getOldPrice(sub)}</span>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex gap-4 pt-6">
              <button onClick={prevStep} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-extrabold uppercase tracking-widest text-sm hover:bg-slate-200 transition-colors">Back</button>
              <button 
                onClick={nextStep} 
                disabled={selectedSubjects.length === 0}
                className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl font-extrabold uppercase tracking-widest text-sm shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center group"
              >
                Character & Values
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in slide-in-from-right-8 duration-500 relative z-10">
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Holistic Development</h3>
              <p className="text-lg text-slate-500 font-medium">Our mission includes building responsible, disciplined individuals.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Character Focus Areas</label>
                <textarea 
                  value={characterFocus}
                  onChange={(e) => setCharacterFocus(e.target.value)}
                  className="w-full px-6 py-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder-slate-400 h-40 resize-none" 
                  placeholder="E.g. Building discipline in homework, responsibility for chores, community impact projects..."
                ></textarea>
              </div>
              <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-start space-x-5">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-indigo-50 shrink-0">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-indigo-900 font-extrabold text-sm uppercase tracking-widest mb-2">Our Promise</h4>
                  <p className="text-base text-indigo-700 leading-relaxed font-medium">
                    Classes are limited to 5 students per group to ensure high engagement and moral mentorship.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-6">
              <button onClick={prevStep} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-extrabold uppercase tracking-widest text-sm hover:bg-slate-200 transition-colors">Back</button>
              <button onClick={nextStep} className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl font-extrabold uppercase tracking-widest text-sm shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group">
                Finalize & Pay
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10 animate-in slide-in-from-right-8 duration-500 relative z-10">
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Billing Summary</h3>
              <p className="text-lg text-slate-500 font-medium">Payments are monthly and must be made before classes begin.</p>
            </div>
            <div className="bg-slate-50 p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 space-y-6">
              {selectedSubjects.map(sub => (
                <div key={sub} className="flex justify-between items-center pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                  <div>
                    <p className="font-extrabold text-slate-900 text-lg mb-1">{sub} Tutoring</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">2x / Week <span className="mx-2">•</span> 1hr Sessions</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-extrabold text-indigo-600 text-xl">${getPrice(sub)}.00</span>
                    {getOldPrice(sub) > getPrice(sub) && (
                      <span className="text-xs font-bold text-slate-400 line-through decoration-2">${getOldPrice(sub)}.00</span>
                    )}
                  </div>
                </div>
              ))}
              <div className="pt-6 flex justify-between items-center">
                <span className="font-extrabold text-slate-900 text-xl">Total Monthly Fee</span>
                <span className="font-black text-indigo-600 text-4xl">${calculateTotal(selectedSubjects)}.00</span>
              </div>
            </div>
            
            <div className="p-6 bg-slate-900 rounded-2xl text-xs font-medium text-slate-300 leading-relaxed">
              <span className="text-indigo-400 font-bold mr-2">* Note:</span> Classes are held on <strong className="text-white">Google Meet</strong>. Teachers are assigned only after the first monthly payment is confirmed. Fees are subject to review based on student challenges.
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button disabled={isSubmitting} onClick={prevStep} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-extrabold uppercase tracking-widest text-sm hover:bg-slate-200 transition-colors disabled:opacity-50">Back</button>
              <button disabled={isSubmitting} onClick={handleSubmit} className="flex-[2] py-5 bg-emerald-500 text-white rounded-2xl font-extrabold uppercase tracking-widest text-sm shadow-xl shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:hover:-translate-y-0 disabled:shadow-none">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                )}
                <span>{isSubmitting ? 'Processing...' : 'Proceed to Payment'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
