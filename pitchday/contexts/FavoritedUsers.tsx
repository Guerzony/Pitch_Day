import API from "@/constants/API";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import { decodeJWT } from "@/utils/decodeJWT";

type FavoritedUsersContextType = {
  favoritedUsers: any[];
  setFavoritedUsers: Dispatch<SetStateAction<any[]>>;
};

const FavoritedUsersContext = createContext<FavoritedUsersContextType>(
  {} as FavoritedUsersContextType
);

export function FavoritedUsersContextProvider({ children }: PropsWithChildren) {
  const [favoritedUsers, setFavoritedUsers] = useState<any[]>([]);
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const decoded = decodeJWT(token!);
        const response = await fetch(
          `${API.API_CONNECTION_URL}/companies/${decoded.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setFavoritedUsers(data.favorites || []);
      } catch (err) {
        throw new Error("Erro ao carregar os favoritos.");
      }
    };

    if (token) fetchCompany();
  }, [token]);

  return (
    <FavoritedUsersContext.Provider
      value={{ favoritedUsers, setFavoritedUsers }}
    >
      {children}
    </FavoritedUsersContext.Provider>
  );
}

export function useFavoriteContext() {
  return useContext(FavoritedUsersContext);
}
