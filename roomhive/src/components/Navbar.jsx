import React from 'react';

export default function Navbar({ currentUser, setCurrentView, handleLogout }) {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center px-8">
      <div className="text-2xl font-bold text-blue-600">RoomHive</div>
      <div className="space-x-4">
        <span className="text-gray-600 font-medium mr-4">{currentUser.name} ({currentUser.role})</span>
        <button onClick={() => setCurrentView('dashboard')} className="text-blue-500 hover:underline">Dashboard</button>
        {currentUser.role === 'Tenant' && <button onClick={() => setCurrentView('search')} className="text-blue-500 hover:underline">Find Properties</button>}
        {currentUser.role === 'Roommate' && <button onClick={() => setCurrentView('roommates')} className="text-blue-500 hover:underline">Find Roommates</button>}
        <button onClick={handleLogout} className="text-red-500 hover:underline ml-4">Logout</button>
      </div>
    </nav>
  );
}