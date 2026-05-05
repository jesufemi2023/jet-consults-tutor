import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { 
  Users, Calendar, Trash2, Edit2, Plus, 
  X, Check, AlertCircle, RefreshCw, Lock
} from 'lucide-react';

type Tab = 'registrations' | 'bookings';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>('registrations');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData(activeTab);
    }
  }, [activeTab, isAuthenticated]);

  const fetchData = async (table: Tab) => {
    if (!supabase) {
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fetchError } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setData(result || []);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-3xl animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6">
              <Lock className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Gate</h1>
            <p className="text-slate-500 font-medium mt-2">Enter your secure credentials to access the dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Access Password</label>
              <input 
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full px-6 py-4 rounded-2xl border ${loginError ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold text-slate-900`}
                placeholder="••••••••"
                autoFocus
              />
              {loginError && (
                <p className="text-red-500 text-xs font-bold mt-2 ml-2 flex items-center italic">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-600 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="mt-10 text-center text-[10px] uppercase font-black tracking-widest text-slate-300">
            Protected by JET Consults Academy
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string, table: Tab) => {
    if (!supabase) {
      alert('Supabase is not configured.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    
    try {
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setData(data.filter(item => item.id !== id));
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const openForm = (item: any = null) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const closeForm = () => {
    setEditingItem(null);
    setIsEditing(false);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload: any = {};
    
    formData.forEach((value, key) => {
      // Handle arrays (e.g., subjects separated by comma)
      if (key === 'subjects' && typeof value === 'string') {
        payload[key] = value.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        payload[key] = value;
      }
    });

    try {
      if (!supabase) throw new Error('Supabase is not configured.');

      if (editingItem?.id) {
        // Update
        const { error: updateError } = await supabase
          .from(activeTab)
          .update(payload)
          .eq('id', editingItem.id);

        if (updateError) throw updateError;
        
      } else {
        // Create
        const { error: insertError } = await supabase
          .from(activeTab)
          .insert([payload]);

        if (insertError) throw insertError;
      }
      
      closeForm();
      fetchData(activeTab);
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium mt-1">Manage platform data securely.</p>
          </div>
          <div className="flex space-x-2 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            <button 
              onClick={() => setActiveTab('registrations')}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-all ${activeTab === 'registrations' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Users className="w-4 h-4 mr-2" />
              Registrations
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-all ${activeTab === 'bookings' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-800 capitalize">
              {activeTab} Data
            </h2>
            <div className="flex space-x-3">
              <button 
                onClick={() => fetchData(activeTab)}
                className="p-2 rounded-xl text-slate-400 hover:bg-white hover:text-indigo-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all"
                title="Refresh Data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={() => openForm()}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 flex items-center transition-all shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {error && (
              <div className="m-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-start border border-red-100">
                <AlertCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Error loading data</p>
                  <p className="text-sm mt-1">{error}</p>
                  <p className="text-xs mt-2 opacity-80">Make sure you have updated RLS policies in Supabase to allow read/update/delete operations.</p>
                </div>
              </div>
            )}

            {loading ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                <p className="font-medium">Loading records...</p>
              </div>
            ) : data.length === 0 && !error ? (
              <div className="p-16 text-center text-slate-400">
                <p className="font-medium text-lg">No records found.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-[10px] tracking-widest font-black">
                    {activeTab === 'registrations' && (
                      <>
                        <th className="p-4 pl-6">Student</th>
                        <th className="p-4">Grade & School</th>
                        <th className="p-4">Subjects</th>
                        <th className="p-4">Monthly Fee</th>
                      </>
                    )}
                    {activeTab === 'bookings' && (
                      <>
                        <th className="p-4 pl-6">Parent</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Date & Time</th>
                      </>
                    )}
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      {activeTab === 'registrations' && (
                        <>
                          <td className="p-4 pl-6">
                            <div className="font-bold text-slate-900">{item.student_name}</div>
                            <div className="text-xs text-slate-500 max-w-[200px] truncate">{item.character_focus}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-slate-700">{item.grade}</div>
                            <div className="text-xs text-slate-500">{item.school_name}</div>
                          </td>
                          <td className="p-4 text-xs">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {item.subjects?.map((sub: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md whitespace-nowrap">{sub}</span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 font-mono text-sm text-slate-600">
                            ${item.total_monthly_fee}
                          </td>
                        </>
                      )}
                      {activeTab === 'bookings' && (
                        <>
                          <td className="p-4 pl-6 font-bold text-slate-900">{item.parent_name}</td>
                          <td className="p-4">
                            <div className="font-medium text-slate-700 text-sm">{item.email}</div>
                            <div className="text-xs text-slate-500 font-mono">{item.phone}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-slate-700 text-sm">{item.booking_date}</div>
                            <div className="text-xs text-slate-500">{item.booking_time}</div>
                          </td>
                        </>
                      )}
                      <td className="p-4 pr-6 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openForm(item)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id, activeTab)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold text-slate-900">
                {editingItem ? 'Edit Record' : 'New Record'}
              </h3>
              <button 
                onClick={closeForm}
                className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {activeTab === 'registrations' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Student Name</label>
                      <input name="student_name" defaultValue={editingItem?.student_name} required className="w-full bg-transparent outline-none font-medium text-slate-900" />
                    </div>
                    <div className="col-span-2 sm:col-span-1 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Grade</label>
                      <input name="grade" defaultValue={editingItem?.grade} required className="w-full bg-transparent outline-none font-medium text-slate-900" />
                    </div>
                  </div>
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">School Name</label>
                    <input name="school_name" defaultValue={editingItem?.school_name} required className="w-full bg-transparent outline-none font-medium text-slate-900" />
                  </div>
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Subjects (comma separated)</label>
                    <input name="subjects" defaultValue={editingItem?.subjects?.join(', ')} required className="w-full bg-transparent outline-none font-medium text-slate-900" placeholder="Math, Physics" />
                  </div>
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Character Focus Needs</label>
                    <textarea name="character_focus" defaultValue={editingItem?.character_focus} className="w-full bg-transparent outline-none font-medium text-slate-900 resize-none" rows={3}></textarea>
                  </div>
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Monthly Fee</label>
                    <input name="total_monthly_fee" type="number" step="0.01" defaultValue={editingItem?.total_monthly_fee} required className="w-full bg-transparent outline-none font-medium text-slate-900" />
                  </div>
                </>
              ) : (
                <>
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Parent Name</label>
                    <input name="parent_name" defaultValue={editingItem?.parent_name} required className="w-full bg-transparent outline-none font-medium text-slate-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email</label>
                      <input name="email" type="email" defaultValue={editingItem?.email} required className="w-full bg-transparent outline-none font-medium text-slate-900" />
                    </div>
                    <div className="col-span-2 sm:col-span-1 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Phone</label>
                      <input name="phone" defaultValue={editingItem?.phone} required className="w-full bg-transparent outline-none font-medium text-slate-900" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Booking Date</label>
                      <input name="booking_date" type="date" defaultValue={editingItem?.booking_date} required className="w-full bg-transparent outline-none font-medium text-slate-900" />
                    </div>
                    <div className="col-span-2 sm:col-span-1 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Booking Time</label>
                      <input name="booking_time" type="time" defaultValue={editingItem?.booking_time} required className="w-full bg-transparent outline-none font-medium text-slate-900" />
                    </div>
                  </div>
                </>
              )}
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={closeForm}
                  className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 flex items-center shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
