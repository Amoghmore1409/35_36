import React, { useState } from 'react';

export default function TenantDashboard({ db, currentUser, acceptAgreement, payRent, submitComplaint }) {
  const [issue, setIssue] = useState('');
  
  const myApps = db.applications.filter(a => a.tenantId === currentUser.id);
  const myAgreements = db.agreements.filter(a => a.tenantId === currentUser.id);
  const myPayments = db.payments.filter(p => p.tenantId === currentUser.id);

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome, {currentUser.name.split(' ')[0]}</h2>
          <p className="text-slate-500 font-medium mt-1">Track your applications, sign leases, and manage payments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Agreements & Apps */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Agreements Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">Your Leases & Agreements</h3></div>
            <div className="p-6 space-y-4">
              {myAgreements.length === 0 ? <p className="text-slate-500 italic">No active leases.</p> : myAgreements.map(agr => {
                const prop = db.properties.find(p => p.id === agr.propertyId);
                return (
                  <div key={agr.id} className={`p-5 rounded-xl border ${agr.status === 'Pending Tenant' ? 'bg-indigo-50/50 border-indigo-200' : 'bg-slate-50 border-slate-200'} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                    <div className="flex gap-4 items-center">
                      <img src={prop.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"} className="w-16 h-16 rounded-lg object-cover" alt="Property" />
                      <div>
                        <h4 className="font-bold text-slate-900">{prop.title}</h4>
                        <p className="text-sm text-slate-500">Rent: <span className="font-bold text-indigo-600">${prop.rent}/mo</span></p>
                        <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded uppercase ${agr.status === 'Pending Tenant' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{agr.status}</span>
                      </div>
                    </div>
                    <div>
                      {agr.status === 'Pending Tenant' && <button onClick={() => acceptAgreement(agr.id)} className="w-full sm:w-auto bg-slate-900 hover:bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm">Sign Document</button>}
                      {agr.status === 'Accepted' && <button onClick={() => payRent(prop.id, prop.rent)} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm">Pay ${prop.rent}</button>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">Payment History</h3></div>
            <ul className="divide-y divide-slate-100">
              {myPayments.length === 0 ? <li className="p-6 text-slate-500 italic">No payments recorded.</li> : myPayments.map(p => (
                <li key={p.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">✓</div>
                    <div><p className="font-bold text-slate-900">Rent Payment</p><p className="text-sm text-slate-500">{p.date}</p></div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-slate-900">${p.amount}.00</p>
                    <p className="text-xs font-bold text-indigo-600 cursor-pointer hover:underline">View Receipt</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Col: Support & Apps */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Application Status</h3>
            <div className="space-y-3">
              {myApps.length === 0 ? <p className="text-slate-500 text-sm">You haven't applied anywhere yet.</p> : myApps.map(a => (
                <div key={a.id} className="flex justify-between items-center text-sm p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700 truncate mr-2">{db.properties.find(p=>p.id===a.propertyId)?.title}</span>
                  <span className={`px-2 py-1 rounded font-bold text-xs ${a.status==='Approved' ? 'text-emerald-700 bg-emerald-100' : 'text-amber-700 bg-amber-100'}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 rounded-2xl border border-rose-100 p-6">
            <h3 className="text-lg font-bold text-rose-900 mb-2">Need Help?</h3>
            <p className="text-sm text-rose-700 mb-4">Raise a complaint regarding a property, owner, or technical issue.</p>
            <form onSubmit={(e) => { submitComplaint(e, issue); setIssue(''); }}>
              <textarea value={issue} onChange={e=>setIssue(e.target.value)} rows="3" className="w-full bg-white border border-rose-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm mb-3" required placeholder="Describe issue..."></textarea>
              <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm">Submit Ticket</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}