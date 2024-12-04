import { Link } from "@remix-run/react";
import React from "react";
import { User } from "../types/general";
import { Podcast } from "lucide-react";

type HeaderProps = {
    user?: User;
}

export const Header = ({ user }: HeaderProps) => {

  return (
    <header className="bg-gray-800 text-white p-4 px-8 flex items-center justify-between">
      {/* Left side: App Title */}
      <div className="text-xl font-semibold">
        <Link to="/" className="text-white flex gap-2">
        <Podcast />
          Forum
        </Link>
      </div>

      {/* Right side: Authentication buttons or user name */}
      <div className="flex items-center space-x-4">
        {user ? (
          <span className="text-lg font-medium">{`Hello, ${user.name}`}</span>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="text-lg font-medium hover:text-blue-400">
              Login
            </Link>
            <Link to="/signup" className="text-lg font-medium hover:text-blue-400">
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
