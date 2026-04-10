import React from 'react';

export function RoommateDashboard({ setCurrentView }) {
  return (
    <div className="animate-fade-in-up mt-10">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">Find your perfect match.</h2>
          <p className="text-lg text-indigo-100 mb-8">Browse detailed profiles and connect with compatible roommates based on habits, budgets, and lifestyles.</p>
          <button onClick={() => setCurrentView('roommates')} className="bg-white text-indigo-600 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            Browse Profiles
          </button>
        </div>
      </div>
    </div>
  );
}

export function RoommateSearch({ db }) {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-3xl font-extrabold text-slate-800 mb-8">Roommate Directory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {db.roommates.map(r => {
          const user = db.users.find(u => u.id === r.userId);
          const tags = r.habits.split(', ');
          return (
            <div key={r.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all text-center">
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-indigo-50" />
              <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
              <p className="text-indigo-600 font-bold mb-4">Budget: ${r.budget}/mo</p>
              <p className="italic text-slate-600 text-sm mb-6 px-4">"{r.bio}"</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md">{tag}</span>
                ))}
              </div>
              
              <button onClick={() => alert('Connection Request Sent!')} className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-semibold py-2.5 rounded-xl transition-colors">
                Connect
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}