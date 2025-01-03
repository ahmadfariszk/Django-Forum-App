import React from "react";
import LoginOrSignupCard from "~/shared/components/LoginOrSignupCard";
import { BASE_API_URL, LoginSignupPayload } from "~/shared/constants/apiTypes";
import { callLoginApi } from "../LoginPage/LoginPage";
import { useNavigate } from "@remix-run/react";
import { toast } from "react-toastify";
import { useUser } from "~/shared/utils/userContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useUser();

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
          toast.success('Account was created! Redirecting..')
          await callLoginApi(payload, navigate, setUser);
        }
      })
      .catch((error) => {
        console.error("Error during sign up:", error);
        toast.error('Failed to sign up, try contacting the admin to report this issue.')
      });
  };

  const handleLoginOrSignup = async (username: string, email: string, password: string) => {
    // Handle login or signup logic here, like calling an API to authenticate or create a new user
    await callSignUpApi({
      email,
      username,
      password,
    });
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
