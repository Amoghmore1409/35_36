export const initialDB = {
  users: [
    { id: 1, name: "Alice Owner", role: "Owner", email: "alice@roomhive.com", password: "password123", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
    { id: 2, name: "Bob Tenant", role: "Tenant", email: "bob@roomhive.com", password: "password123", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80" },
    { id: 3, name: "Charlie Roommate", role: "Roommate", email: "charlie@roomhive.com", password: "password123", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" },
    { id: 4, name: "Admin Dave", role: "Admin", email: "admin@roomhive.com", password: "password123", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" }
  ],
  properties: [
    { id: 101, ownerId: 1, title: "Sunny 2BHK Luxury Apartment", location: "Downtown Metro", rent: 1200, status: "Available", beds: 2, baths: 2, sqft: 1100, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" },
    { id: 102, ownerId: 1, title: "Cozy Urban Studio", location: "Uptown Arts District", rent: 800, status: "Available", beds: 1, baths: 1, sqft: 600, image: "https://images.unsplash.com/photo-1502672260266-1c1e52509503?auto=format&fit=crop&w=800&q=80" },
    { id: 103, ownerId: 1, title: "Modern Loft with River View", location: "Riverside", rent: 1500, status: "Available", beds: 2, baths: 1, sqft: 950, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" }
  ],
  applications: [],
  agreements: [],   
  payments: [],     
  roommates: [
    { id: 201, userId: 3, bio: "Software engineer working remotely. I value a clean, quiet space and love cooking on weekends.", budget: 900, habits: "Non-smoker, Early bird, Pet-friendly" }
  ],
  complaints: []    
};

export const generateId = () => Math.floor(Math.random() * 10000);