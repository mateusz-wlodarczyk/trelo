import React, { createContext, useContext, useState } from 'react';

import { supabase } from '../utils/supabase';
import { FormValues, FormValuesLogin } from '../utils/yupSchema';

type AuthContextProps = {
  errorRegister: boolean;
  isLogin: boolean;
  loggedUser: unknown;
  loginUser: (loggedUser: FormValuesLogin) => Promise<boolean>;
  logoutUser: () => void;
  registerNewUser: (newUser: FormValues) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [errorRegister, setErrorRegister] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState({});

  const registerNewUser = async (newUser: FormValues) => {
    try {
      const { error, session, user } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
      });
      if (error) {
        setErrorRegister(true);
        return true;
      } else {
        setErrorRegister(false);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const loginUser = async (loggedUser: FormValuesLogin) => {
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email: loggedUser.email,
        password: loggedUser.password,
      });
      if (data.user !== null) {
        setIsLogin(true);
        setLoggedUser(data);
        return true;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logoutUser = async function () {
    try {
      const { error } = await supabase.auth.signOut();
      setIsLogin(false);
      setLoggedUser({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ errorRegister, isLogin, loggedUser, loginUser, logoutUser, registerNewUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('Poza providerem');
  }
  return ctx;
};

export { AuthContext, AuthProvider };

// Uncaught Error: Poza providerem
//     at useAuthContext (contextSupabase.tsx:77:11)
//     at ProtectedWrapper (ProtectedWrapper.tsx:7:23)
//     at renderWithHooks (react-dom.development.js:16305:18)
//     at mountIndeterminateComponent (react-dom.development.js:20074:13)
//     at beginWork (react-dom.development.js:21587:16)
//     at beginWork$1 (react-dom.development.js:27426:14)
//     at performUnitOfWork (react-dom.development.js:26557:12)
//     at workLoopSync (react-dom.development.js:26466:5)
//     at renderRootSync (react-dom.development.js:26434:7)
//     at recoverFromConcurrentError (react-dom.development.js:25850:20)
