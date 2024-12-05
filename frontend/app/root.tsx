import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import 'react-toastify/dist/ReactToastify.css';

import { Header } from "./shared/components/Header";
import { mockUser } from "./test/mockData";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "./shared/constants/apiTypes";
import { UserProvider } from "./shared/utils/userContext";
import { getAccessToken } from "./shared/utils/browserStorage";
import { ToastContainer } from "react-toastify";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const fetchCurrentUser = async (setUserState?: any, navigate?: any) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/users/getCurrentUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Ensure it's JSON
          Authorization: `Bearer ${getAccessToken(localStorage, sessionStorage)}`, // Add the Bearer token here
        },
      }
    );
    if (!response.ok) {
      const error = new Error(
        `Error fetching current user: ${response.status}`
      );
      (error as any).status = response.status;
      throw error;
    }
    const data = await response.json();
    console.log(data);
    // const data = mockPosts; // Replace fetch with mock data
    setUserState?.(data);
    if ("/login"?.includes(location.pathname)) navigate?.("/")
  } catch (err: any) {
    console.error("Failed to get user", err.status);
  }
};


export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const shouldShowHeader = !["/login", "/signup"].includes(location.pathname);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser(setUser, navigate);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <UserProvider initialUser={user}>
          {shouldShowHeader && <Header user={user} />}
          <ToastContainer 
            className={'!w-[400px] !p-2'}
            position="top-center"
          />
          {children}
        </UserProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
