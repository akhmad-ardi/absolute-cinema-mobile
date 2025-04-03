import { getToken, removeToken } from "@/lib/utils";
import React from "react";

export default function useAuth() {
  const [token, setToken] = React.useState<string | null>(null);
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function checkAuth() {
      const accessToken = await getToken();
      
      setToken(accessToken)
      setAuthenticated(!!accessToken);
      setLoading(false)
    }

    checkAuth()
  }, []);

  async function logout() {
    setAuthenticated(true);

    await removeToken();
    
    setAuthenticated(false);
  } 

  return { token, isAuthenticated: authenticated, loading, logout };
}