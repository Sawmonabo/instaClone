import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'

const Icon = ({ icon, activeTab, setActiveTab }) => (
  <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
    <Image
      source={{
        uri: activeTab === icon.name ? icon.active : icon.inactive,
      }}
      style={[
        styles.icon,
        icon.name === 'Profile' ? styles.profilePic() : null,
        activeTab === 'Profile' && icon.name === activeTab
          ? styles.profilePic(activeTab)
          : null,
      ]}
    />
  </TouchableOpacity>
)

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState('Home')

  return (
    <View style={styles.wrapper}>
      <Divider style={styles.divider} orientation="horizontal" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon
            key={index}
            icon={icon}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'sticky',
    width: '100%',
    bottom: 0,
    backgroundColor: '#000',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    padding: 10,
  },
  icon: {
    marginTop: 5,
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = '') => ({
    borderRadius: 50,
    borderWidth: activeTab === 'Profile' ? 2 : 0,
    borderColor: '#fff',
  }),
  divider: {
    backgroundColor: '#333',
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
  },
})

export default BottomTabs
