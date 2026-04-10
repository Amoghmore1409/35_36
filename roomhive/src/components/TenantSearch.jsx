import React from 'react';

export default function TenantSearch({ db, applyProperty }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {db.properties.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow border-t-4 border-blue-500">
            <h3 className="font-bold text-lg">{p.title}</h3>
            <p>Location: {p.location}</p>
            <p className="text-green-600 font-bold mb-3">Rent: ${p.rent}/mo</p>
            <button onClick={() => applyProperty(p.id)} className="w-full bg-blue-500 text-white py-2 rounded">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}