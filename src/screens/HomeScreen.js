import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Posts'
// import { POSTS } from '../mock/posts'
import BottomTabs from '../components/home/BottomTabs'
import { TABS } from '../lib/constants/tabs'
import {
  collectionGroup,
  getFirestore,
  onSnapshot,
  orderBy,
} from '../lib/firebase'

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  const db = getFirestore()

  const fetchPosts = useCallback(() => {
    const unsubscribe = onSnapshot(
      collectionGroup(db, 'posts'),
      orderBy('timestamp', 'desc'),
      (snapshot) => {
        console.log(
          '[HomeScreen.fetchPosts] - Snapshot Updated: ',
          snapshot.docs,
        )
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      },
      (error) => console.log(error),
    )
    return unsubscribe
  }, [db])

  useEffect(() => {
    const unsubscribe = fetchPosts()
    return () => unsubscribe() // Cleanup on unmount
  }, [fetchPosts])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={TABS} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
})

export default HomeScreen
