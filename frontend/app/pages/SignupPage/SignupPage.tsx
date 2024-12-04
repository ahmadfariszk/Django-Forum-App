import { Link } from "@remix-run/react";
import React from "react";
import LoginOrSignupCard from "~/shared/components/LoginOrSignupCard";

const SignupPage = () => {
  const handleLoginOrSignup = (username: string, email: string, password: string) => {
    // Handle login or signup logic here, like calling an API to authenticate or create a new user
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
