import React from 'react'
import { View, StyleSheet, Text, TextInput, AsyncStorage } from 'react-native'

export default class Profile extends React.Component {
  constructor(props)  {
    super(props)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  async onUsernameChange(username) {
    try {
      await AsyncStorage.setItem('@Tests:username', username)
      this.props.onUsernameChange(username)
    } catch (error) {
      console.log("Can't update username", error)
    }
  }

  async onPasswordChange(password) {
    try {
      await AsyncStorage.setItem('@Tests:password', password)
      this.props.onPasswordChange(password)
    } catch (error) {
      console.log("Can't update password", error)
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.note}>Provide your credentials</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            defaultValue={this.props.username}
            onChangeText={this.onUsernameChange}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="password"
            defaultValue={this.props.password}
            onChangeText={this.onPasswordChange}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FD6DBF',
    width: '100%',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#DD4D9F',
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
    color: 'white',
  },
  note: {
    width: '100%',
    // textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    marginBottom: 50,
  }
})
