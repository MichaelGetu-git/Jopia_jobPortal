import React, {createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser ] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        setIsSignedIn(true);
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsSignedIn(true);
      setCurrentUser(data.user);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsSignedIn(false);
    setCurrentUser(null);

  };

  return (
    <AuthContext.Provider value={{isSignedIn, currentUser, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
