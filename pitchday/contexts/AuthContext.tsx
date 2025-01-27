import API from "@/constants/API";
import { getToken, storeToken } from "@/utils/token";
import { useNavigation, useRouter } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isLogged: boolean;
  token: string | null;
  signIn: (name: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthContextProdivder({ children }: PropsWithChildren) {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  async function signIn(name: string, password: string) {
    try {
      const response = await fetch(`${API.API_CONNECTION_URL}/auth/login`, {
        body: JSON.stringify({
          name: name,
          password: password,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao fazer login");
      }
      const data = await response.json();

      setIsLogged(true);
      setToken(data.access_token);
      await storeToken(data.access_token);
      router.push({ pathname: "/" });
    } catch (error: any) {
      console.error("Erro de autenticação:", error.message);
    }
  }

  useEffect(() => {
    async function executeSearch() {
      const token = await getToken();
      return token;
    }

    executeSearch().then((founded) => {
      if (founded) {
        setIsLogged(true);
        setToken(founded);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLogged, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}
