import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from '../lib/firebase'

import { POSTS } from './posts'
import { USERS } from './users'

// Function to push posts data to Firebase
const pushPostsToFirebase = async () => {
  const db = getFirestore()
  // Iterate over each mock post
  for (const post of POSTS) {
    // Find the user corresponding to the post
    const user = USERS.find((u) => u.user === post.user)

    if (user) {
      try {
        // Add post to the 'posts' collection
        const docRef = await addDoc(
          collection(db, 'users', user.user, 'posts'),
          {
            image: post.image,
            user: post.user,
            likes: post.likes,
            caption: post.caption,
            profilePicture: user.image,
            comments: post.comments,
            timestamp: serverTimestamp(),
          },
        )

        console.log('Document written with ID: ', docRef.id)
      } catch (error) {
        console.error('Error adding document: ', error)
      }
    } else {
      console.error(`User ${post.user} not found for post. Skipping...`)
    }
  }
}

export default pushPostsToFirebase
