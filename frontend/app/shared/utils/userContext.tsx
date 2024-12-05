// userContext.tsx
import React, { createContext, useContext } from "react";

interface User {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
}

const UserContext = createContext<User | null>(null);

export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component with typed children prop
interface UserProviderProps {
  children: React.ReactNode; // Explicitly typing 'children' prop
  value: User | null
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
