
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { sendBookingEmail } from '../services/emailService';

const BookingCalendar: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({ name: '', email: '', phone: '' });

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setError('Please select both a date and a time for your consultation.');
      return;
    }

    if (!supabase) {
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your env.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('bookings')
        .insert([
          { 
            parent_name: bookingData.name, 
            email: bookingData.email, 
            phone: bookingData.phone, 
            booking_date: selectedDate,
            booking_time: selectedTime
          }
        ]);

      if (submitError) throw submitError;
      
      // Attempt to send email notification
      await sendBookingEmail({
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        date: selectedDate,
        time: selectedTime
      });

      setIsConfirmed(true);
    } catch (err: any) {
      console.error('Error saving booking:', err);
      setError(err.message || 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateString = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTimeString = (timeString: string) => {
    if (!timeString) return '';
    // timeString is in HH:mm format (24-hour)
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const numH = h % 12 || 12;
    return `${numH}:${minutes} ${ampm}`;
  };

  if (isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-10 sm:p-16 rounded-[3.5rem] shadow-2xl shadow-indigo-100/50 text-center animate-in zoom-in duration-500 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner border border-emerald-100">
          <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Consultation Booked!</h2>
        <p className="text-xl text-slate-600 font-medium mb-12 leading-relaxed max-w-lg mx-auto">
          Thank you, {bookingData.name}. We've scheduled your direct consultation for <br/>
          <span className="text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-lg inline-block mt-2">
            {formatDateString(selectedDate)} at {formatTimeString(selectedTime)}
          </span>. <br/><br/>A calendar invitation has been sent to your email.
        </p>
        <button 
          onClick={onBack}
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-extrabold uppercase tracking-widest text-sm shadow-xl hover:bg-indigo-600 hover:-translate-y-1 transition-all duration-300"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 lg:py-24">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
        <button 
          onClick={onBack}
          className="inline-flex items-center justify-center px-4 py-2 mb-8 text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors duration-300"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Dashboard
        </button>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
          Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Direct Consultation</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
          Select a convenient date and time to speak with our academic counselors. Discover how we can help your child achieve excellence in STEM and build character.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Date and Time Selection */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-2xl shadow-indigo-100/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-8 relative z-10 flex items-center">
              <span className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-sm mr-4 shadow-inner">1</span>
              When should we call?
            </h3>

            <div className="space-y-8 relative z-10">
              {/* Date Input */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Select Date
                </label>
                <div className="relative group/input">
                  <input 
                    type="date" 
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-6 pr-12 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-slate-800 text-lg cursor-pointer"
                  />
                  <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-indigo-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Time Input */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Select Time
                </label>
                <div className="relative group/input">
                  <input 
                    type="time" 
                    required
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full pl-6 pr-12 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-slate-800 text-lg cursor-pointer"
                  />
                  <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-indigo-500">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start space-x-3">
                <svg className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-xs sm:text-sm text-indigo-900 font-medium leading-relaxed">
                  We are available Monday to Sunday. All times are automatically adjusted to your local timezone.
                </p>
              </div>
            </div>
          </div>
          
          {/* Aesthetic Imagery / Trust Building Card */}
          <div className="hidden lg:flex bg-slate-900 rounded-[2.5rem] p-10 overflow-hidden relative text-white items-end h-[280px]">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
             <div className="relative z-10">
               <div className="flex items-center space-x-2 text-emerald-400 mb-3">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 <span className="text-xs font-bold uppercase tracking-widest">100% Free Consultation</span>
               </div>
               <h4 className="text-2xl font-bold mb-2">Speak directly with founders</h4>
               <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-sm">No sales reps. Just passionate educators discussing your child's future.</p>
             </div>
          </div>
        </div>

        {/* Right Column: Contact Details */}
        <div className="lg:col-span-6">
          <div className={`bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-2xl shadow-indigo-100/40 transition-all duration-700 ease-out sticky top-8 ${selectedDate && selectedTime ? 'opacity-100 translate-y-0 relative z-20' : 'lg:opacity-50 lg:pointer-events-none lg:translate-y-8 z-10'}`}>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
              <span className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-sm mr-4 shadow-inner">2</span>
              Your Details
            </h3>
            
            {selectedDate && selectedTime && (
              <div className="mb-10 p-5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-between text-white shadow-lg shadow-indigo-200">
                <div>
                  <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">We'll call you on</p>
                  <p className="text-lg font-bold">{formatDateString(selectedDate)} <span className="font-normal opacity-75 mx-1">at</span> {formatTimeString(selectedTime)}</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              </div>
            )}

            <form onSubmit={handleConfirm} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Parent Full Name *</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all font-semibold text-slate-900 placeholder-slate-400"
                  placeholder="e.g. John Doe"
                  value={bookingData.name}
                  onChange={e => setBookingData({...bookingData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Email Address *</label>
                <input 
                  required
                  type="email" 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all font-semibold text-slate-900 placeholder-slate-400"
                  placeholder="john@example.com"
                  value={bookingData.email}
                  onChange={e => setBookingData({...bookingData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Phone Number *</label>
                <input 
                  required
                  type="tel" 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all font-semibold text-slate-900 placeholder-slate-400"
                  placeholder="+1 (555) 000-0000"
                  value={bookingData.phone}
                  onChange={e => setBookingData({...bookingData, phone: e.target.value})}
                />
              </div>
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium flex items-start space-x-3 mt-4">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{error}</span>
                </div>
              )}
              <button 
                type="submit"
                disabled={isSubmitting || !selectedDate || !selectedTime}
                className="w-full mt-8 py-5 bg-indigo-600 text-white rounded-2xl font-extrabold uppercase tracking-widest text-sm hover:bg-slate-900 transition-colors duration-300 shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:hover:bg-indigo-600 flex justify-center items-center h-[64px]"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Confirm Consultation'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
