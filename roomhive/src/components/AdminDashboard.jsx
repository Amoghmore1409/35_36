import React from 'react';

export default function AdminDashboard({ db, resolveComplaint }) {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Control Center</h2>
        <p className="text-slate-500 font-medium mt-1">Platform metrics, user management, and dispute resolution.</p>
      </div>
      
      {/* KPI Cards with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-white/20 text-8xl font-bold">👥</div>
          <p className="text-indigo-100 font-medium mb-1">Total Verified Users</p>
          <h4 className="font-extrabold text-4xl">{db.users.length}</h4>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-white/20 text-8xl font-bold">🏠</div>
          <p className="text-emerald-100 font-medium mb-1">Active Listings</p>
          <h4 className="font-extrabold text-4xl">{db.properties.length}</h4>
        </div>
        <div className="bg-gradient-to-br from-rose-500 to-red-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-white/20 text-8xl font-bold">⚠️</div>
          <p className="text-rose-100 font-medium mb-1">Pending Complaints</p>
          <h4 className="font-extrabold text-4xl">{db.complaints.filter(c => c.status === 'Open').length}</h4>
        </div>
      </div>
      
      {/* Dispute Resolution Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900">Complaint Resolution Center</h3>
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">{db.complaints.length} Total Tickets</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Raised By</th>
                <th className="px-6 py-4">Issue Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {db.complaints.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-10 text-center text-slate-500 italic">No complaints logged. System is healthy.</td></tr>
              ) : db.complaints.map(c => {
                const userObj = db.users.find(u => u.name === c.raisedBy);
                return (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={userObj?.avatar || "https://images.unsplash.com/photo-1511367461989-f85a21fda167"} className="w-9 h-9 rounded-full object-cover" alt="" />
                        <span className="font-bold text-slate-900">{c.raisedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-md truncate">{c.issue}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${c.status === 'Open' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {c.status === 'Open' ? (
                        <button onClick={()=>resolveComplaint(c.id)} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all">Mark Resolved</button>
                      ) : (
                        <span className="text-slate-400 font-bold text-xs bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">Closed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}