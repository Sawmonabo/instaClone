import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from '../navigation'
import { onAuthStateChanged, getAuth } from '../lib/fire'

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const auth = getAuth()

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => userHandler(user))
    return () => unsubscribe()
  }, [])

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default AuthNavigation
