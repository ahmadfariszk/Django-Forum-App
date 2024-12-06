import React, { createContext, useContext, useState } from "react";

// Define the User interface
interface User {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
}

// Create the context with a type for User or null
export const UserContext = createContext<any | undefined>(undefined);

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
  children: React.ReactNode; // Explicitly typing 'children' prop
  value: any
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
