import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { USERS } from '../../mock/users'

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <Image source={{ uri: story.image }} style={styles.story} />
            <Text style={{ color: 'white' }}>
              {story.user.length > 10
                ? story.user.slice(0, 6).toLowerCase() + '...'
                : story.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  story: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ff8501',
    marginHorizontal: 3,
    marginLeft: 6,
    resizeMode: 'contain',
  },
})

export default Stories
