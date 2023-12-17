import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import LoginForm from '../components/LoginForm'
import config from '../../config'

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={config.appLogo} />
      </View>
      <LoginForm navigation={navigation} />
    </View>
  )
}

export default LoginScreen

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
