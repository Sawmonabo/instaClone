import * as auth from './auth'
import * as firestore from './firestore'
import { initializeApp, getApps } from 'firebase/app'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config'

if (!getApps().length) {
  const firebaseApp = initializeApp(config.firebase)
  auth.initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  })
}

const firebase = {
  ...auth,
  ...firestore,
}

export default firebase
