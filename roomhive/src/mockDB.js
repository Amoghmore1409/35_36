export const initialDB = {
  users: [
    { id: 1, name: "Alice Owner", role: "Owner", email: "alice@roomhive.com", password: "password123" },
    { id: 2, name: "Bob Tenant", role: "Tenant", email: "bob@roomhive.com", password: "password123" },
    { id: 3, name: "Charlie Roommate", role: "Roommate", email: "charlie@roomhive.com", password: "password123" },
    { id: 4, name: "Admin Dave", role: "Admin", email: "admin@roomhive.com", password: "password123" }
  ],
  properties: [
    { id: 101, ownerId: 1, title: "Sunny 2BHK Apartment", location: "Downtown", rent: 1200, status: "Available" },
    { id: 102, ownerId: 1, title: "Cozy Studio", location: "Uptown", rent: 800, status: "Available" }
  ],
  applications: [],
  agreements: [],   
  payments: [],     
  roommates: [
    { id: 201, userId: 3, bio: "Tech professional looking for quiet place.", budget: 600, habits: "Non-smoker, early bird" }
  ],
  complaints: []    
};

export const generateId = () => Math.floor(Math.random() * 10000);