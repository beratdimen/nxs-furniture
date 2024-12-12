"use client";

import { useRef, useState } from "react";
import "./style.css";
import { login, signup } from "@/actions/actions";

export default function AuthForms() {
  const [isSignIn, setIsSignIn] = useState(false);
  const signUpFormRef = useRef(null);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData(signUpFormRef.current);

    await signup(formData);

    signUpFormRef.current.reset();
  };

  return (
    <div className="authContainer">
      <div className={`authForms ${isSignIn ? "slideLeft" : ""}`}>
        <div className="authForm">
          <h2>Create Account</h2>
          <form ref={signUpFormRef} onSubmit={handleSignUp}>
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button className="authButton">Sign Up</button>
          </form>
          <p>
            Already have an account?
            <button onClick={toggleForm}>Sign In</button>
          </p>
        </div>

        <div className="authForm">
          <h2>Welcome Back!</h2>
          <form action="">
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button className="authButton" formAction={login}>
              Sign In
            </button>
          </form>
          <p>
            Dont have an account? <button onClick={toggleForm}>Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
}
