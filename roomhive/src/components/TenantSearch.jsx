import React from 'react';

export default function TenantSearch({ db, applyProperty }) {
  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <div className="bg-slate-900 rounded-3xl p-10 mb-10 relative overflow-hidden text-white shadow-2xl">
        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Hero background" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-extrabold mb-4">Discover your new favorite place.</h1>
          <p className="text-lg text-slate-300 mb-6">Browse premium verified listings. Apply instantly and sign your agreement online.</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Available Properties</h2>
        <span className="text-sm font-medium text-slate-500">{db.properties.length} homes available</span>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {db.properties.map(p => (
          <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
            <div className="relative h-56 overflow-hidden">
              <img src={p.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">Verified</div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900 leading-tight">{p.title}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {p.location}
                </p>
                
                {/* Specs Row */}
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-4 font-medium">
                  <span className="flex items-center gap-1">🛏️ {p.beds || 1} Beds</span>
                  <span className="flex items-center gap-1">🛁 {p.baths || 1} Baths</span>
                  <span className="flex items-center gap-1">📐 {p.sqft || 800} sqft</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-2xl font-extrabold text-indigo-600">${p.rent}</span>
                  <span className="text-slate-500 text-sm font-medium">/month</span>
                </div>
                <button onClick={() => applyProperty(p.id)} className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm">
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}