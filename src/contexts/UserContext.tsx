import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; 

interface User {
  id: string;
  email: string;
}

type PlanType = 'basico' | 'familiar';

interface UserState {
  user: User | null;
  isLoading: boolean;
  userPlan: PlanType; 
}

interface UserContextType extends UserState {
  login: (userData: { email: string; uid: string; sessionToken?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  cambiarPlan: (nuevoPlan: PlanType) => void; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer((s: UserState, a: any) => {
    switch (a.type) {
      case 'SET_USER': return { ...s, user: a.payload, isLoading: false };
      case 'SET_LOADING': return { ...s, isLoading: a.payload };
      case 'LOGOUT': return { ...s, user: null, isLoading: false, userPlan: 'basico' };
      case 'SET_PLAN': return { ...s, userPlan: a.payload }; 
      default: return s;
    }
  }, { user: null, isLoading: true, userPlan: 'basico' }); 

  useEffect(() => {
    AsyncStorage.getItem('@user_data').then(data => {
      if (data) dispatch({ type: 'SET_USER', payload: JSON.parse(data) });
      else dispatch({ type: 'SET_LOADING', payload: false });
    });
  }, []);

  useEffect(() => {
    if (!state.user?.id) return;

    const unsubscribe = onSnapshot(
      doc(db, 'USUARIOS', state.user.id), 
      async (documento) => {
        if (documento.exists()) {
          const datosUsuario = documento.data();
          const tokenEnFirebase = datosUsuario.sessionToken;
          
          const tokenLocal = await AsyncStorage.getItem('@session_token');

          if (tokenEnFirebase && tokenLocal && tokenEnFirebase !== tokenLocal) {
            Alert.alert(
              "Sesión cerrada", 
              "Alguien más inició sesión en esta cuenta desde otro dispositivo."
            );
            
            await AsyncStorage.removeItem('@session_token');
            await signOut(auth); 
            logout(); 
          }
        }
      },
      (error) => {
        console.log("Vigilante de sesión silenciado:", error.message);
      }
    );

    return () => unsubscribe();
  }, [state.user]); 


  const login = async (userData: { email: string; uid: string; sessionToken?: string }) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const user = { id: userData.uid, email: userData.email };
      await AsyncStorage.setItem('@user_data', JSON.stringify(user));
      
      if (userData.sessionToken) {
          await AsyncStorage.setItem('@session_token', userData.sessionToken);
      }

      dispatch({ type: 'SET_USER', payload: user });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };


  const logout = async () => {
    await AsyncStorage.removeItem('@user_data');
    await AsyncStorage.removeItem('@session_token'); 
    dispatch({ type: 'LOGOUT' });
  };

  const cambiarPlan = (nuevoPlan: PlanType) => {
    dispatch({ type: 'SET_PLAN', payload: nuevoPlan });
  };

  return (
    <UserContext.Provider value={{ ...state, login, logout, cambiarPlan }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext)!;