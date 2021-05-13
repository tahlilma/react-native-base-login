import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function HomeStack({ route }) {
  const { credentials } = route.params

  const { user } = credentials
  console.log(user)

  let userEmail = user.email
  let accCreationTime = user.metadata.creationTime
  let lastAccCreationTime = user.metadata.lastSignInTime

  return (
    <View style={styles.container}>
      <Text>Logged in as: {userEmail.replace(/\"/g, "")}</Text>
      <Text>Account created at: {accCreationTime.replace(/\"/g, "")}</Text>
      <Text>Last logged in at: {lastAccCreationTime.replace(/\"/g, "")}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 8
  }
})

export default HomeStack