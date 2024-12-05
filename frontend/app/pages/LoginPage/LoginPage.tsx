import { Link, useNavigate } from "@remix-run/react";
import React from "react";
import { toast } from "react-toastify";
import { fetchCurrentUser } from "~/root";
import LoginOrSignupCard from "~/shared/components/LoginOrSignupCard";
import { BASE_API_URL, LoginSignupPayload } from "~/shared/constants/apiTypes";
import { useUser } from "~/shared/utils/userContext";

export const callLoginApi = async (payload: LoginSignupPayload, navigate?: any, updateUser?: any) => {
  fetch(`${BASE_API_URL}/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify(payload), // Sending the username and password in the body
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      if (data.access && data.refresh) {
        localStorage.setItem('access_token', data.access);
        sessionStorage.setItem('access_token', data.access);
        navigate?.('/')
        fetchCurrentUser(updateUser, navigate)
      } else {
        toast.error('Failed to login, make sure the credentials are correct.')
        console.log("Login failed:", data.detail || "Unknown error");
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleLoginOrSignup = async (
    username: string,
    email: string,
    password: string
  ) => {
    // Handle login or signup logic here, like calling an API to authenticate or create a new user
    await callLoginApi({
      email,
      username,
      password,
    }, navigate, updateUser);
  };

  return (
    <div className="flex flex-col items-center py-12 gap-4 h-screen">
      <LoginOrSignupCard
        title={"Login"}
        description={
          <div>
            Don't have an account yet?{" "}
            <Link to="/signup" className="underline">
              Sign up!
            </Link>
          </div>
        }
        submitButtonText={"Login"}
        onSubmit={handleLoginOrSignup}
      />
    </div>
  );
};

export default LoginPage;
