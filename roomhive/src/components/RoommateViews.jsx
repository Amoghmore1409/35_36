import React from 'react';

export function RoommateDashboard({ setCurrentView }) {
  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold mb-4">Welcome to Roommate Finder</h2>
      <button onClick={() => setCurrentView('roommates')} className="bg-blue-600 text-white px-6 py-3 rounded-lg">Browse Profiles</button>
    </div>
  );
}

export function RoommateSearch({ db }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Find Roommates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {db.roommates.map(r => (
          <div key={r.id} className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold">{db.users.find(u=>u.id===r.userId)?.name}</h3>
            <p className="italic mt-2">"{r.bio}"</p>
            <button onClick={() => alert('Request Sent!')} className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full">Send Request</button>
          </div>
        ))}
      </div>
    </div>
  );
}