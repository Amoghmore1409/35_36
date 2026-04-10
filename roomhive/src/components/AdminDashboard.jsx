import React from 'react';

export default function AdminDashboard({ db, resolveComplaint }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-blue-100 p-4 rounded"><h4 className="font-bold text-2xl">{db.users.length}</h4><p>Users</p></div>
        <div className="bg-green-100 p-4 rounded"><h4 className="font-bold text-2xl">{db.properties.length}</h4><p>Properties</p></div>
        <div className="bg-red-100 p-4 rounded"><h4 className="font-bold text-2xl">{db.complaints.length}</h4><p>Complaints</p></div>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4 text-red-600">Complaints</h3>
        <table className="w-full text-left">
          <thead><tr className="bg-gray-100"><th className="p-2">By</th><th className="p-2">Issue</th><th className="p-2">Status</th><th className="p-2">Action</th></tr></thead>
          <tbody>
            {db.complaints.map(c => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{c.raisedBy}</td><td className="p-2">{c.issue}</td>
                <td className="p-2">{c.status}</td>
                <td className="p-2">{c.status === 'Open' ? <button onClick={()=>resolveComplaint(c.id)} className="bg-gray-800 text-white px-2 py-1 rounded">Resolve</button> : 'Closed'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}