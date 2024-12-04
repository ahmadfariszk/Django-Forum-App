import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcn-ui/Card";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "../shadcn-ui/Button";

type LoginOrSignupCardProps = {
  title?: string;
  description?: string | React.ReactNode;
  submitButtonText?: string;
  onSubmit?: (username: string, email: string, password: string) => void; // Pass username, email, password to the handler
};

const LoginOrSignupCard = ({
  title,
  description,
  submitButtonText,
  onSubmit,
  ...props
}: LoginOrSignupCardProps) => {
  // State for username, email, and password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Change handlers for each input field
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameError(""); // Clear error when user changes input
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(""); // Clear error when user changes input
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(""); // Clear error when user changes input
  };

  // Validation function
  const validate = () => {
    let valid = true;

    // Reset error messages
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    // Validate username
    if (!username.trim()) {
      setUsernameError("Username is required.");
      valid = false;
    }

    // Validate email (simple validation for format)
    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid.");
      valid = false;
    }

    // Validate password (at least 6 characters)
    if (!password.trim()) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    // Validate form fields
    if (validate()) {
        // Call the onSubmit callback if provided and the form is valid
        onSubmit?.(username, email, password);
  
        // Optionally, clear the form after submission
        setUsername("");
        setEmail("");
        setPassword("");
      }
  };

  return (
    <Card className="w-[600px] mt-auto mb-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <InputWithLabel
          label={"Username"}
          type="text"
          value={username}
          onChange={handleUsernameChange} // Handle username change
          placeholder="Enter your username"
          error={usernameError} // Pass error message
        />
        <InputWithLabel
          label={"Email"}
          type="email" // Changed to 'email' for better validation
          value={email}
          onChange={handleEmailChange} // Handle email change
          placeholder="Enter your email"
          error={emailError} // Pass error message
        />
        <InputWithLabel
          label={"Password"}
          type="password" // Changed to 'password' for secure input
          value={password}
          onChange={handlePasswordChange} // Handle password change
          placeholder="Enter your password"
          error={passwordError} // Pass error message
        />
      </CardContent>
      <CardFooter>
        <Button className="ml-auto mr-auto" onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginOrSignupCard;
