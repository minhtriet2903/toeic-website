import Cookies from "js-cookie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../query";
import { verifyToken } from "../query/Auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get("auth_token");
      if (!token) {
        logout();
        return;
      }

      try {
        const response = await verifyToken();

        if (response.status === 200) {
          setUser(response.data.user);
          Cookies.set("user", JSON.stringify(response.data.user), {
            expires: 7,
          });
        } else {
          logout();
        }
      } catch {
        console.log("error");
        logout();
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    setUser(null);
    Cookies.remove("auth_token");
    Cookies.remove("user");
    // window.location.href = "/login";
  };

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
