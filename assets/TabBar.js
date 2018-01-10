import React from 'react'
import { Image, View, StyleSheet, Text, TextInput, AsyncStorage } from 'react-native'

export default class Profile extends React.Component {
  constructor(props)  {
    super(props)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  render() {
    return (
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#DD4D9F',
    width: '50%',
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
  },
  note: {
    width: '100%',
    color: '#fff',
    fontSize: 18,
    marginTop: 100,
    marginBottom: 50,
  },
  label: {
    marginBottom: 5,
    color: 'white',
  },
  input: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#DD4D9F',
    borderRadius: 5,
  },
})
