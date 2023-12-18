import { initializeApp, getApps } from 'firebase/app'
import {
  getAuth,
  initializeAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
  signOut,
  getReactNativePersistence,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  collectionGroup,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config'

if (!getApps().length) {
  const firebaseApp = initializeApp(config.firebase)
  initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  })
}

// const firebase = initializeApp(config.firebase)
// // !getApps().length ? initializeApp(config.firebase) : firebase.app()
// const auth = initializeAuth(
//   getApps().length ? firebase : initializeApp(config.firebase),
//   {persistence: getReactNativePersistence(ReactNativeAsyncStorage)}
// )

export {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
  signOut,
  collection,
  collectionGroup,
  addDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  getDoc,
  getDocs,
  setDoc,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
}
