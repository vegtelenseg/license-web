import axios from "axios";
import * as React from "react";

export type AuthContextType =
  | {
      token: string;
      authenticated: true;
      username: string;
      role: string;
    }
  | {
      authenticated: false;
    };

export interface UserAuthInfoType {
  email: string;
  password: string;
}

export interface AuthContextStateType {
  auth: AuthContextType;
  handleLogin: (userInfo: UserAuthInfoType) => Promise<void>;
  getToken(): string;
  handleLogout(): void;
}

const AuthContextState: AuthContextStateType = {
  auth: { authenticated: false },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogin: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getToken: () => "",
};

export const AuthContext =
  React.createContext<AuthContextStateType>(AuthContextState);

interface Props {
  children: React.ReactNode;
}

export function AuthController({ children }: Props) {
  const [auth, setAuth] = React.useState(() => {
    let auth: AuthContextType = { authenticated: false };
    const authString = localStorage.getItem("auth");
    if (authString) {
      const localAuth = JSON.parse(authString);
      if (localAuth) {
        auth = {
          authenticated: localAuth.authenticated,
          token: localAuth.accessToken,
          username: localAuth.username,
          role: localAuth.role,
        };
      }
    }

    return auth;
  });

  const handleLogin = React.useCallback(
    async (userInfo: { password: string; email: string }) => {
      try {
        console.log("Think");
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_HOST}/auth/local`,
          {
            // TODO: Remove hard coding
            identifier: "mzam.siya@gmail.com",
            password: "password",
          }
        );
        if (Boolean(data)) {
          const auth: AuthContextType = {
            authenticated: true,
            token: data.jwt,
            username: data.user.username,
            role: data.user.role.name,
          };
          setAuth(auth);
          localStorage.setItem("auth", JSON.stringify(auth));
          // TODO: history.p`ush('/)
          window.location.pathname = "/";
        }
      } catch (error) {
        console.log("Could not login: ", error.message);
      }
    },
    [setAuth]
  );

  const getToken = React.useCallback(() => {
    if (auth.authenticated) {
      return auth.token;
    } else {
      return "";
    }
  }, [auth]);

  const handleLogout = React.useCallback(() => {
    localStorage.removeItem("auth");
    setAuth({ authenticated: false });
  }, []);

  const value = React.useMemo(
    () => ({ auth, handleLogin, handleLogout, getToken }),
    [auth, handleLogin, handleLogout, getToken]
  );
  return (
    // @ts-ignore
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
