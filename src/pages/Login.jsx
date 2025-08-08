// components/Login.js
import React from "react";
import { useAuth } from "../hooks/useAuthContext";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    // navigate("/dashboard");
  }

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      alert("Error signing in: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-black">
      {/* make form glossy */}
      <div className="w-[300px] h-[400px] py-16 flex flex-col items-center justify-between border border-gray-600 rounded-lg bg-white/10 backdrop-blur-xl">
        <div className="flex-shrink-0 flex items-center">
          <img src={logo} alt="logo" className="w-auto h-6" />
        </div>
        <h2 className="mb-4 text-xl font-semibold text-white">
          
        </h2>
        <button
          onClick={handleGoogleSignIn}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
