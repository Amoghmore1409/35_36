import React, { useState } from 'react';

export default function OwnerDashboard({ db, currentUser, addProperty, approveApp }) {
  const [title, setTitle] = useState('');
  const [loc, setLoc] = useState('');
  const [rent, setRent] = useState('');

  const myProps = db.properties.filter(p => p.ownerId === currentUser.id);
  const myPropIds = myProps.map(p => p.id);
  const apps = db.applications.filter(a => myPropIds.includes(a.propertyId));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Add New Property</h3>
          <form onSubmit={(e) => { addProperty(e, title, loc, rent); setTitle(''); setLoc(''); setRent(''); }} className="space-y-3">
            <input value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder="Title" required className="w-full border p-2 rounded" />
            <input value={loc} onChange={e=>setLoc(e.target.value)} type="text" placeholder="Location" required className="w-full border p-2 rounded" />
            <input value={rent} onChange={e=>setRent(e.target.value)} type="number" placeholder="Rent ($)" required className="w-full border p-2 rounded" />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">List Property</button>
          </form>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">My Properties</h3>
          <ul className="space-y-2">
            {myProps.map(p => <li key={p.id} className="border-b pb-2"><b>{p.title}</b> - {p.location} (${p.rent})</li>)}
          </ul>
        </div>
        <div className="col-span-1 md:col-span-2 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Tenant Applications</h3>
          <table className="w-full text-left">
            <thead><tr className="bg-gray-100"><th className="p-2">Property</th><th className="p-2">Tenant</th><th className="p-2">Status</th><th className="p-2">Action</th></tr></thead>
            <tbody>
              {apps.map(a => (
                <tr key={a.id} className="border-b">
                  <td className="p-2">{db.properties.find(p => p.id === a.propertyId)?.title}</td>
                  <td className="p-2">{db.users.find(u => u.id === a.tenantId)?.name}</td>
                  <td className={`p-2 font-bold ${a.status === 'Approved' ? 'text-green-600' : 'text-orange-500'}`}>{a.status}</td>
                  <td className="p-2">
                    {a.status === 'Pending' ? <button onClick={() => approveApp(a)} className="bg-blue-500 text-white px-3 py-1 rounded">Approve</button> : 'Agreement Sent'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}