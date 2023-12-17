import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({ navigation }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <FormikPostUploader navigation={navigation} />
  </View>
)

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{
          uri: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/back--v1.png',
        }}
        style={styles.headerImage}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>NEW POST</Text>
    <Text />
  </View>
)

export default AddNewPost

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 20,
    fontFamily: '',
    marginRight: 25,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
})
