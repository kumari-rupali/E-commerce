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
        } else if (userUid) {
          // Only seed if we have a user to "own" them initially
          console.log("Seeding products as user:", userUid);
          for (const p of MOCK_PRODUCTS) {
            const { id, ...data } = p;
            await productSvc.create({ ...data, sellerId: userUid });
          }
          const freshProducts = await productSvc.getAll();
          if (freshProducts) setProducts(freshProducts);
        } else {
          // Fallback to mock data in state if DB empty and not logged in
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
