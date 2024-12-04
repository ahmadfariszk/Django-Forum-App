import { Link } from "@remix-run/react";
import React from "react";
import LoginOrSignupCard from "~/shared/components/LoginOrSignupCard";

const LoginPage = () => {
  const handleLoginOrSignup = (username: string, email: string, password: string) => {
    // Handle login or signup logic here, like calling an API to authenticate or create a new user
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
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
