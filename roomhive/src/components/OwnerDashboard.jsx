import React, { useState } from 'react';

export default function OwnerDashboard({ db, currentUser, addProperty, approveApp }) {
  const [title, setTitle] = useState('');
  const [loc, setLoc] = useState('');
  const [rent, setRent] = useState('');
  const [image, setImage] = useState('');

  const myProps = db.properties.filter(p => p.ownerId === currentUser.id);
  const myPropIds = myProps.map(p => p.id);
  const apps = db.applications.filter(a => myPropIds.includes(a.propertyId));
  const activeAgreements = db.agreements.filter(a => myPropIds.includes(a.propertyId) && a.status === 'Accepted');

  const inputClass = "w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm";

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Owner Overview</h2>
        <p className="text-slate-500 font-medium mt-1">Manage your properties, review applications, and track leases.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">🏢</div>
          <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wider">My Properties</p><h4 className="text-3xl font-extrabold text-slate-900">{myProps.length}</h4></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-xl">📄</div>
          <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Applications</p><h4 className="text-3xl font-extrabold text-slate-900">{apps.length}</h4></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl">🤝</div>
          <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Leases</p><h4 className="text-3xl font-extrabold text-slate-900">{activeAgreements.length}</h4></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Forms & Properties */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">List New Property</h3>
            <form onSubmit={(e) => { 
              e.preventDefault();
              const finalImage = image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"; // Default image if blank
              addProperty(e, title, loc, rent); 
              setTitle(''); setLoc(''); setRent(''); setImage(''); 
            }} className="space-y-3">
              <div><label className="text-xs font-bold text-slate-600 uppercase mb-1 block">Title</label><input value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder="e.g. Modern Loft" required className={inputClass} /></div>
              <div><label className="text-xs font-bold text-slate-600 uppercase mb-1 block">Location</label><input value={loc} onChange={e=>setLoc(e.target.value)} type="text" placeholder="e.g. Downtown" required className={inputClass} /></div>
              <div><label className="text-xs font-bold text-slate-600 uppercase mb-1 block">Rent ($)</label><input value={rent} onChange={e=>setRent(e.target.value)} type="number" placeholder="1200" required className={inputClass} /></div>
              <div><label className="text-xs font-bold text-slate-600 uppercase mb-1 block">Image URL (Optional)</label><input value={image} onChange={e=>setImage(e.target.value)} type="text" placeholder="https://..." className={inputClass} /></div>
              <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl mt-2 transition-colors">Post Listing</button>
            </form>
          </div>
        </div>

        {/* Right Column: Applications Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Applicant Tracking</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr><th className="px-6 py-4">Tenant</th><th className="px-6 py-4">Property</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {apps.length === 0 ? (
                    <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No applications received yet.</td></tr>
                  ) : apps.map(a => {
                    const prop = db.properties.find(p => p.id === a.propertyId);
                    const tenant = db.users.find(u => u.id === a.tenantId);
                    return (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img src={tenant?.avatar || "https://images.unsplash.com/photo-1511367461989-f85a21fda167"} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
                          <div><p className="font-bold text-slate-900">{tenant?.name}</p><p className="text-xs text-slate-500">{tenant?.email}</p></div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700">{prop?.title}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${a.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{a.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {a.status === 'Pending' ? (
                            <button onClick={() => approveApp(a)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-all">Approve</button>
                          ) : (
                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">Agreement Sent</span>
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
      </div>
    </div>
  );
}