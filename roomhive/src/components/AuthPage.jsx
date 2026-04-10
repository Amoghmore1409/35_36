import React, { useState } from 'react';
import { generateId } from '../mockDB';

export default function AuthPage({ db, setDb, handleLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('alice@roomhive.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Tenant');
  const [error, setError] = useState('');

  const validateForm = () => {
    setError('');
    if (!email || !password) return "Email and password are required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";

    if (!isLogin) {
      if (!name) return "Full Name is required for sign up.";
      if (password.length < 6) return "Password must be at least 6 characters long.";
      if (password !== confirmPassword) return "Passwords do not match.";
      if (db.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return "An account with this email already exists.";
      }
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    if (isLogin) {
      const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) return setError("Invalid email or password.");
      handleLogin(user.id);
    } else {
      const newUser = { id: generateId(), name, email, password, role };
      setDb(prev => ({ ...prev, users: [...prev.users, newUser] }));
      handleLogin(newUser.id);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">RoomHive</h1>
          <p className="text-gray-500">{isLogin ? "Login to your account." : "Create a new account."}</p>
        </div>
        {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          )}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Role</label>
                <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                  <option value="Tenant">Tenant</option>
                  <option value="Owner">Property Owner</option>
                  <option value="Roommate">Roommate Seeker</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </>
          )}
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mt-4">{isLogin ? 'Sign In' : 'Create Account'}</button>
        </form>
        <p className="text-center mt-6 text-gray-600 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-blue-600 font-bold ml-1 hover:underline">{isLogin ? "Sign up" : "Login"}</button>
        </p>
      </div>
    </div>
  );
}