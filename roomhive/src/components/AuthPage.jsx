import React, { useState } from 'react';
import { generateId } from '../mockDB';

export default function AuthPage({ db, setDb, handleLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('alice@roomhive.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Tenant');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) return setError("Invalid email or password.");
      handleLogin(user.id);
    } else {
      if (password !== confirmPassword) return setError("Passwords do not match.");
      const newUser = { id: generateId(), name, email, password, role, avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=150&q=80" };
      setDb(prev => ({ ...prev, users: [...prev.users, newUser] }));
      handleLogin(newUser.id);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-700";

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" alt="Luxury Interior" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="text-white font-bold text-3xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-xl">R</div>
            RoomHive
          </div>
          <div className="text-white max-w-lg">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">Find your perfect home, seamlessly.</h1>
            <p className="text-lg text-slate-300 font-medium">Join thousands of users who have found their ideal rental properties and roommates through our verified platform.</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="lg:hidden text-indigo-600 font-bold text-3xl mb-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">R</div>
            RoomHive
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{isLogin ? "Welcome back" : "Create an account"}</h2>
          <p className="text-slate-500 mb-8">{isLogin ? "Please enter your details to sign in." : "Start your journey with RoomHive."}</p>
          
          {error && <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 p-3 mb-6 rounded-lg text-sm font-medium">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-slate-700 text-sm font-semibold mb-1">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="John Doe" required/>
              </div>
            )}
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" required/>
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" required/>
            </div>
            {!isLogin && (
              <>
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-1">Confirm Password</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={inputClass} placeholder="••••••••" required/>
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-1">I am a...</label>
                  <select value={role} onChange={e => setRole(e.target.value)} className={inputClass}>
                    <option value="Tenant">Tenant (Looking to rent)</option>
                    <option value="Owner">Property Owner (Listing spaces)</option>
                    <option value="Roommate">Roommate Seeker</option>
                    <option value="Admin">Platform Admin</option>
                  </select>
                </div>
              </>
            )}
            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl mt-6 transition-all shadow-md">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <p className="text-center mt-8 text-slate-600 text-sm font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-indigo-600 font-bold ml-1 hover:text-indigo-700 hover:underline">{isLogin ? "Sign up" : "Login"}</button>
          </p>
        </div>
      </div>
    </div>
  );
}