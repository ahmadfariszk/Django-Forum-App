import React from "react";
import LoginOrSignupCard from "~/shared/components/LoginOrSignupCard";
import { BASE_API_URL, LoginSignupPayload } from "~/shared/constants/apiTypes";
import { callLoginApi } from "../LoginPage/LoginPage";
import { useNavigate } from "@remix-run/react";

const SignupPage = () => {
  const navigate = useNavigate();

  const callSignUpApi = async (payload: LoginSignupPayload) => {
    fetch(`${BASE_API_URL}/api/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the server knows you're sending JSON
      },
      body: JSON.stringify(payload), // Sending the username and password in the body
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then(async (data) => {
        if (data?.statusCode === 200) {
          console.log("Signup successful");
          await callLoginApi(payload, navigate);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const handleLoginOrSignup = async (username: string, email: string, password: string) => {
    // Handle login or signup logic here, like calling an API to authenticate or create a new user
    await callSignUpApi({
      email,
      username,
      password,
    });
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex flex-col items-center py-12 gap-4 h-screen">
      <LoginOrSignupCard
        title={"Sign Up"}
        description={
          <div>
            After signing up, you'll be able to create posts and comments!
          </div>
        }
        submitButtonText={"Sign Up"}
        onSubmit={handleLoginOrSignup}
      />
    </div>
  );
};

export default SignupPage
