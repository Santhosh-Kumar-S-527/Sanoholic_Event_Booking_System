import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // 🔓 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // 🔐 UPDATE USER (AVATAR / NAME ETC.)
  const updateUser = (updates) => {
    setToken((prev) => {
      if (!prev) return prev;

      const payload = JSON.parse(atob(prev.split(".")[1]));
      const newPayload = { ...payload, ...updates };

      const newToken = [
        btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })),
        btoa(JSON.stringify(newPayload)),
        prev.split(".")[2],
      ].join(".");

      localStorage.setItem("token", newToken);
      return newToken;
    });
  };

  // 🔐 DERIVE USER FROM TOKEN
  let user = null;
  let loading = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      user = {
        id: payload.id,
        role: payload.role,
        name: payload.name,
        avatar: payload.avatar, // ✅ IMPORTANT
        mustChangePassword: payload.mustChangePassword,
      };
    } catch (err) {
      console.error("Invalid token", err);
      logout();
    }
  }

  // 🔐 LOGIN
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        updateUser, // ✅ PROVIDED
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
