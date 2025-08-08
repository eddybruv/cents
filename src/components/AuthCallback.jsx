import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error during auth callback:", error);
          navigate("/login");
          return;
        }

        if (data.session) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error in auth callback:", error);
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-xl font-semibold">Processing authentication...</h2>
    </div>
  );
};

export default AuthCallback;
