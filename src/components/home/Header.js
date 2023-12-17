import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { HEADER, getIconUri } from '../../lib/constants/icons'
import { getAuth, signOut } from '../../lib/firebase'
import config from '../../../config'

const handleLogOut = async () => {
  try {
    await signOut(getAuth())
    console.log('Signed Out Successfully!')
  } catch (error) {
    console.log(error)
  }
}

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={handleLogOut}>
          <Image style={styles.logo} source={config.appLogo} />
        </TouchableOpacity>
        <Text style={styles.appName}>{config.appName}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
          <Image
            style={styles.icon}
            source={{ uri: getIconUri('NewPost', HEADER) }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={{ uri: getIconUri('Likes', HEADER) }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>2</Text>
          </View>
          <Image
            style={styles.icon}
            source={{ uri: getIconUri('Messenger', HEADER) }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    width: 120,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  logo: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 200,
    overflow: 'hidden',
    marginHorizontal: -20,
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 10,
  },
  appName: {
    marginLeft: 20,
    marginTop: 0,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
  },
})

export default Header
