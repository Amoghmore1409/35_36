import React from 'react';

export default function Navbar({ currentUser, setCurrentView, handleLogout }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm px-8 py-4 flex justify-between items-center transition-all">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">R</div>
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">RoomHive</span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-3 bg-slate-50 px-2 py-1.5 rounded-full border border-slate-200 pr-4">
          <img src={currentUser.avatar || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=150"} alt="User" className="w-8 h-8 rounded-full object-cover" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-slate-800">{currentUser.name}</span>
            <span className="text-xs text-slate-500 font-medium">{currentUser.role}</span>
          </div>
        </div>
        <button onClick={() => setCurrentView('dashboard')} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Dashboard</button>
        {currentUser.role === 'Tenant' && <button onClick={() => setCurrentView('search')} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Browse</button>}
        {currentUser.role === 'Roommate' && <button onClick={() => setCurrentView('roommates')} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Network</button>}
        <button onClick={handleLogout} className="text-sm font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors">Log out</button>
      </div>
    </nav>
  );
}