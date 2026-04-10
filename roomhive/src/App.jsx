import React, { useState } from 'react';
import { initialDB, generateId } from './mockDB';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import OwnerDashboard from './components/OwnerDashboard';
import TenantDashboard from './components/TenantDashboard';
import TenantSearch from './components/TenantSearch';
import { RoommateDashboard, RoommateSearch } from './components/RoommateViews';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [db, setDb] = useState(initialDB);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (userId) => {
    setCurrentUser(db.users.find(u => u.id === userId));
    setCurrentView('dashboard');
  };

  const handleLogout = () => setCurrentUser(null);

  // Controller Functions
  const addProperty = (e, title, location, rent) => {
    e.preventDefault();
    const newProp = { id: generateId(), ownerId: currentUser.id, title, location, rent, status: "Available" };
    setDb(prev => ({ ...prev, properties: [...prev.properties, newProp] }));
    alert("Property Added!");
  };

  const applyProperty = (propId) => {
    if (db.applications.find(a => a.propertyId === propId && a.tenantId === currentUser.id)) return alert("Already applied!");
    setDb(prev => ({ ...prev, applications: [...prev.applications, { id: generateId(), propertyId: propId, tenantId: currentUser.id, status: 'Pending' }] }));
    alert("Applied!");
  };

  const approveApp = (app) => {
    setDb(prev => {
      const updatedApps = prev.applications.map(a => a.id === app.id ? { ...a, status: 'Approved' } : a);
      return { ...prev, applications: updatedApps, agreements: [...prev.agreements, { id: generateId(), appId: app.id, tenantId: app.tenantId, propertyId: app.propertyId, status: 'Pending Tenant' }] };
    });
    alert("Approved & Agreement Generated.");
  };

  const acceptAgreement = (agrId) => {
    setDb(prev => ({ ...prev, agreements: prev.agreements.map(a => a.id === agrId ? { ...a, status: 'Accepted' } : a) }));
    alert("Agreement Accepted!");
  };

  const payRent = (propId, amount) => {
    setDb(prev => ({ ...prev, payments: [...prev.payments, { id: generateId(), tenantId: currentUser.id, propertyId: propId, amount, status: 'Paid', date: new Date().toLocaleDateString() }] }));
    alert("Rent Paid!");
  };

  const submitComplaint = (e, issue) => {
    e.preventDefault();
    setDb(prev => ({ ...prev, complaints: [...prev.complaints, { id: generateId(), raisedBy: currentUser.name, issue, status: 'Open' }] }));
    alert("Complaint Submitted.");
  };

  const resolveComplaint = (cId) => {
    setDb(prev => ({ ...prev, complaints: prev.complaints.map(c => c.id === cId ? { ...c, status: 'Resolved' } : c) }));
  };

  if (!currentUser) return <AuthPage db={db} setDb={setDb} handleLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Navbar currentUser={currentUser} setCurrentView={setCurrentView} handleLogout={handleLogout} />
      <main className="p-6 max-w-6xl mx-auto w-full">
        {currentView === 'search' && currentUser.role === 'Tenant' && <TenantSearch db={db} applyProperty={applyProperty} />}
        {currentView === 'roommates' && <RoommateSearch db={db} />}
        {currentView === 'dashboard' && (
          <>
            {currentUser.role === 'Owner' && <OwnerDashboard db={db} currentUser={currentUser} addProperty={addProperty} approveApp={approveApp} />}
            {currentUser.role === 'Tenant' && <TenantDashboard db={db} currentUser={currentUser} acceptAgreement={acceptAgreement} payRent={payRent} submitComplaint={submitComplaint} />}
            {currentUser.role === 'Roommate' && <RoommateDashboard setCurrentView={setCurrentView} />}
            {currentUser.role === 'Admin' && <AdminDashboard db={db} resolveComplaint={resolveComplaint} />}
          </>
        )}
      </main>
    </div>
  );
}