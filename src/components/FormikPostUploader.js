import React, { useEffect, useState, useCallback } from 'react'
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import * as Yup from 'yup'
import { Formik } from 'formik'
import validUrl from 'valid-url'
import {
  getAuth,
  collection,
  addDoc,
  doc,
  getFirestore,
  serverTimestamp,
  onSnapshot,
} from '../lib/firebase'

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached maximum characters'),
})

const PLACEHOLDER_IMG =
  'https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg'

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
  const [currentUserProfile, setCurrentUserProfile] = useState(null)

  const auth = getAuth()
  const db = getFirestore()

  const getCurrentUserProfile = useCallback(() => {
    const user = auth.currentUser
    const unsubscribe = onSnapshot(
      doc(db, `users/${user.uid}`),
      (documentSnapshot) => {
        console.log('Current User: ', documentSnapshot.data())
        setCurrentUserProfile({
          username: documentSnapshot.data().username,
          pic: documentSnapshot.data().profile.pic,
          uid: documentSnapshot.data().uid,
          email: documentSnapshot.data().email,
        })
      },
      (error) => console.log(error),
    )
    return unsubscribe
  }, [auth, db])

  useEffect(() => {
    const unsubscribe = getCurrentUserProfile()
    return () => unsubscribe()
  }, [getCurrentUserProfile])

  const addPost = (imageUrl, caption) => {
    const unsubscribe = addDoc(
      collection(db, 'users', auth.currentUser.uid, 'posts'),
      {
        image: {
          uri: imageUrl,
          scaleType: 'contain',
          customDimensions: null,
        },
        username: currentUserProfile.username,
        profilePicture: currentUserProfile.pic,
        uid: currentUserProfile.uid,
        email: currentUserProfile.email,
        caption: caption,
        createdAt: serverTimestamp(),
        likes: [],
        comments: [],
      },
    ).then(() => navigation.goBack())

    return unsubscribe
  }

  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => {
        addPost(values.imageUrl, values.caption)
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={styles.imagePlaceHolder}
            />
            <TextInput
              style={styles.caption}
              placeholder="Write a caption..."
              placeholderTextColor="gray"
              multiline={true}
              onChangeText={handleChange('caption')}
              onBlur={handleBlur('caption')}
              value={values.caption}
            />
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={styles.imageURL}
            placeholder="Enter image URL"
            placeholderTextColor="gray"
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={styles.imageURLRequired}>{errors.imageUrl}</Text>
          )}
          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      )}
    </Formik>
  )
}

export default FormikPostUploader

const styles = StyleSheet.create({
  imageContainer: {
    margin: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imagePlaceHolder: {
    width: 100,
    height: 100,
    borderRadius: 9,
  },
  imageURL: {
    fontSize: 20,
    color: 'red',
    marginTop: 10,
  },
  imageURLRequired: {
    fontSize: 20,
    color: 'red',
    marginVertical: 10,
  },
  caption: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    flex: 1,
  },
})
