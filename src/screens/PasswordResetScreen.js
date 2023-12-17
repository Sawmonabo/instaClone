import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import PasswordResetForm from '../components/PasswordResetForm'
import config from '../../config'

const PasswordResetScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={config.appLogo} />
      </View>
      <PasswordResetForm navigation={navigation} />
    </View>
  )
}

export default PasswordResetScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    height: '100%',
    backgroundColor: 'black',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 10,
  },
})
