import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Product, User, Order } from '../types';

const PRODUCTS_COLLECTION = 'products';
const USERS_COLLECTION = 'users';
const ORDERS_COLLECTION = 'orders';

export const productSvc = {
  async getAll() {
    try {
      const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('name'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => ({ ...d.data(), id: d.id } as Product));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, PRODUCTS_COLLECTION);
    }
  },
  
  async getById(id: string) {
    try {
      const d = await getDoc(doc(db, PRODUCTS_COLLECTION, id));
      return d.exists() ? ({ ...d.data(), id: d.id } as Product) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${PRODUCTS_COLLECTION}/${id}`);
    }
  },

  async create(product: Omit<Product, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
        ...product,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, PRODUCTS_COLLECTION);
    }
  }
};

export const userSvc = {
  async getProfile(uid: string) {
    try {
      const d = await getDoc(doc(db, USERS_COLLECTION, uid));
      return d.exists() ? (d.data() as User) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${USERS_COLLECTION}/${uid}`);
    }
  },

  async updateProfile(uid: string, data: Partial<User>) {
    try {
      await setDoc(doc(db, USERS_COLLECTION, uid), {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${USERS_COLLECTION}/${uid}`);
    }
  }
};

export const orderSvc = {
  async create(order: Omit<Order, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
        ...order,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, ORDERS_COLLECTION);
    }
  },

  async getUserOrders(userId: string) {
    try {
      const q = query(collection(db, ORDERS_COLLECTION), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => ({ ...d.data(), id: d.id } as Order));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, ORDERS_COLLECTION);
    }
  }
};
