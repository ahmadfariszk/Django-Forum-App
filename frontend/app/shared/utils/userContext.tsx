import React, { createContext, useContext, useState } from "react";

// Define the User interface
interface User {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
}

// Create the context with a type for User or null
const UserContext = createContext<{
  user: User | null;
  updateUser: (user: User | null) => void;
} | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// UserProvider component with typed children prop and the ability to update the user
interface UserProviderProps {
  children: React.ReactNode;
  initialUser: User | null;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, initialUser }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  // Function to update the user
  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
