// contexts/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
// import { supabase } from "../supabase"; // COMMENTED OUT - BYPASS AUTH
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // BYPASS: Mock authenticated user for development
  const [user, setUser] = useState({
    id: "dev-user",
    email: "dev@example.com",
  });
  const loading = false; // Always loaded in bypass mode
  const navigate = useNavigate();
  const location = useLocation();

  /* SUPABASE AUTH COMMENTED OUT
  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);
  */

  // Redirect signed-in users that land on the homepage or login to dashboard
  useEffect(() => {
    if (
      !loading &&
      user &&
      (location.pathname === "/" || location.pathname === "/login")
    ) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, user, location.pathname, navigate]);

  const signInWithGoogle = async () => {
    // BYPASS: Mock sign in
    setUser({ id: "dev-user", email: "dev@example.com" });
    return { data: { user: { id: "dev-user", email: "dev@example.com" } } };

    /* SUPABASE AUTH COMMENTED OUT
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error);
      return { error };
    }

    return { data };
    */
  };

  const signOut = async () => {
    // BYPASS: Mock sign out
    setUser(null);
    navigate("/login");

    /* SUPABASE AUTH COMMENTED OUT
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
    */
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
