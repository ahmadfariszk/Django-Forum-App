import { Link, useNavigate } from "@remix-run/react";
import React, { useEffect } from "react";
import { User } from "../constants/modelTypes";
import { LogOut, Podcast } from "lucide-react";
import IconButton from "./IconButton";

type HeaderProps = {
  user?: User;
};

export const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('login')
  })

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
          <div className="text-lg font-medium flex items-center">
            <span className="text-sm mt-1 mr-2 text-zinc-300">
              Logged in as
            </span>
            {`${user.name}`}{" "}
            <span className="text-sm mt-1 ml-4 text-zinc-300">|</span>{" "}
            <IconButton icon={<LogOut />} onClick={() => {navigate('/login')}} />
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="text-lg font-medium hover:text-blue-400"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-lg font-medium hover:text-blue-400"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
