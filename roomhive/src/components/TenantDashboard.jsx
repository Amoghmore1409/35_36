import React, { useState } from 'react';

export default function TenantDashboard({ db, currentUser, acceptAgreement, payRent, submitComplaint }) {
  const [issue, setIssue] = useState('');
  const myApps = db.applications.filter(a => a.tenantId === currentUser.id);
  const myAgreements = db.agreements.filter(a => a.tenantId === currentUser.id);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tenant Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Applications & Agreements</h3>
          {myApps.map(a => <p key={a.id} className="mb-2">App for <b>{db.properties.find(p=>p.id===a.propertyId)?.title}</b>: {a.status}</p>)}
          <hr className="my-4"/>
          {myAgreements.map(agr => {
            const prop = db.properties.find(p => p.id === agr.propertyId);
            return (
              <div key={agr.id} className="p-3 bg-gray-50 border rounded mb-2">
                <p>Agreement: <b>{prop.title}</b> ({agr.status})</p>
                {agr.status === 'Pending Tenant' && <button onClick={() => acceptAgreement(agr.id)} className="bg-green-500 text-white px-3 py-1 rounded mt-2">Accept</button>}
                {agr.status === 'Accepted' && <button onClick={() => payRent(prop.id, prop.rent)} className="bg-purple-500 text-white px-3 py-1 rounded mt-2">Pay Rent</button>}
              </div>
            );
          })}
        </div>
        <div className="bg-white p-6 rounded shadow border-t-4 border-red-500">
          <h3 className="text-xl font-semibold mb-4 text-red-600">Raise Complaint</h3>
          <form onSubmit={(e) => { submitComplaint(e, issue); setIssue(''); }}>
            <textarea value={issue} onChange={e=>setIssue(e.target.value)} className="w-full border p-2 rounded mb-2" required placeholder="Describe issue..."></textarea>
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}