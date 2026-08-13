import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getMe } from "../api/authApi";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      try {
        await getMe();

        setAuthenticated(true);
      } catch (error) {
        console.error(error);

        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
