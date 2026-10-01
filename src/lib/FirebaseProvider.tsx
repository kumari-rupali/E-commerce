import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { userSvc, productSvc } from './db';
import { useStore } from '../store/useStore';
import { MOCK_PRODUCTS } from '../constants';

const FirebaseContext = createContext<{ ready: boolean }>({ ready: false });

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const { setUser, setProducts } = useStore();

  useEffect(() => {
    const initData = async (userUid?: string) => {
      try {
        const products = await productSvc.getAll();
        if (products && products.length > 0) {
          setProducts(products);
        } else {
          // Keep demo catalog local; product creation requires an authorized seller.
          setProducts(MOCK_PRODUCTS);
        }
      } catch (err) {
        console.error("Failed to sync archives:", err);
        setProducts(MOCK_PRODUCTS);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await userSvc.getProfile(firebaseUser.uid);
        if (profile) {
          setUser(profile);
        } else {
          const newProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Anonymous',
            role: 'customer' as const,
          };
          setUser(newProfile);
        }
        await initData(firebaseUser.uid);
      } else {
        setUser(null);
        await initData();
      }
      setReady(true);
    });

    return () => unsubscribe();
  }, [setUser, setProducts]);

  return (
    <FirebaseContext.Provider value={{ ready }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
