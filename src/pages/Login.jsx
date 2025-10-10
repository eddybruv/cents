// components/Login.js
import React from "react";
import { useAuth } from "../hooks/useAuthContext";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      alert("Error signing in: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-bg) px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-(--color-muted) hover:text-(--color-fg)">
            ← Back to home
          </Link>
          <img src={logo} alt="Vault" className="h-6 w-auto" />
        </div>

        <div className="glass border border-(--color-border) rounded-xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-(--color-muted) mb-6">
            Sign in to access your dashboard.
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 cursor-pointer transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
              aria-hidden
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12   c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.441,6.053,28.935,4,24,4C12.955,4,4,12.955,4,24   c0,11.045,8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,14,24,14c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657   C33.441,6.053,28.935,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c4.777,0,9.144-1.833,12.444-4.826l-5.755-4.86C28.614,35.755,26.43,36.5,24,36.5   c-5.202,0-9.619-3.317-11.283-7.946l-6.49,5.006C9.524,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.059,5.614   c0.001-0.001,0.002-0.001,0.003-0.002l6.484,4.852C36.58,39.027,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 border-t border-(--color-border) pt-6">
            <p className="text-xs text-(--color-muted)">
              By continuing, you agree to our Terms and acknowledge our Privacy
              Policy.
            </p>
          </div>
        </div>

        <p className="text-center text-(--color-muted) text-sm mt-6">
          Don’t have access yet?{" "}
          <span className="text-(--color-fg)">Ask your administrator.</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
