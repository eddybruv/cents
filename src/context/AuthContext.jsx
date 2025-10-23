// contexts/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useLocation, useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { useCreateLinkToken } from "../hooks/useCreateLinkToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { createLinkToken, error: createLinkTokenError } = useCreateLinkToken();

  const [user, setUser, removeUser] = useSessionStorage("user", null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const destructureUserFromSession = (user) => {
    if (!user?.id) return null;
    const { id, email, user_metadata } = user;
    return {
      id,
      email,
      fullName: user_metadata?.full_name || "",
      avatarUrl: user_metadata?.avatar_url || user_metadata?.picture || null,
    };
  };

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser((prev) => ({
          ...prev,
          ...destructureUserFromSession(session?.user),
          accessToken: session?.access_token,
          refreshToken: session?.refresh_token,
        }));
      } finally {
        setLoading(false);
      }
    };

    // Check if we already have cached user
    if (user) {
      setLoading(false);
    } else {
      getSession();
    }

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const userData = destructureUserFromSession(session?.user);
      setUser((prev) => ({
        ...prev,
        ...userData,
        accessToken: session?.access_token,
        refreshToken: session?.refresh_token,
      }));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect signed-in users that land on the homepage or login to dashboard
  useEffect(() => {
    if (
      !loading &&
      user?.id &&
      (location.pathname === "/" || location.pathname === "/login")
    ) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, user, location.pathname, navigate]);

  // create link token when we have a user but no plaidLinkToken yet
  useEffect(() => {
    if (!user?.id || user.plaidLinkToken) return;

    let cancelled = false;
    (async () => {
      try {
        const token = await createLinkToken(user.id);
        if (!cancelled && token) {
          setUser((prev) => ({ ...prev, plaidLinkToken: token }));
        }
        if (createLinkTokenError) {
          console.error("Error creating link token:", createLinkTokenError);
        }
      } catch (err) {
        console.error("createLinkToken failed", err);
      }
    })();

    // return () => {
    //   cancelled = true;
    // };
  }, [user?.id]); // run when user becomes available

  const signInWithGoogle = async () => {
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
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
    removeUser();
    navigate("/");
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
