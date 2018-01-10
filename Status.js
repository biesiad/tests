import React from 'react'
import { View, StyleSheet, Text, Button, Image, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default class Status extends React.Component {
  constructor(props)  {
    super(props)
    this.state = {
      isLoading: false,
      hasTest: false,
    }

    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate(){
    this.setState({ isLoading: true })

    fetch('https://google.com')
      .then((r) => r.text())
      .then((text) => {
        if (Math.random() > 0.5) {
          this.setState({ hasTest: true, isLoading: false })
        } else  {
          this.setState({ hasTest: false, isLoading: false })
        }
      })
      .catch((...args) => console.log('Error', ...args))
  }

  renderTest() {
    let text = null
    if (this.state.hasTest === true) {
      text = `Test scheduled on\n ${Date().match(/^.+\s\d\d\d\d/)[0]}`
    } else if (this.state.hasTest === false) {
      text = "No tests scheduled"
    } else if (this.state.hasTest === null) {
      text = "Can't update now"
    } else {
      text = "There was an error reading the data"
    }
    return <Text style={styles.test}>{text}</Text>
  }

  renderLoader() {
    if (this.state.isLoading) return <ActivityIndicator size="large" color="#FFF" />
  }

  renderContent() {
    if (this.state.isLoading) return null

    return (
      <View>
        {this.renderTest()}
        <Button disabled={this.state.isLoading} color="#fff" style={styles.updateButton} title="Check now" onPress={this.onUpdate} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? this.renderLoader() : this.renderContent()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    flex: 1,
    backgroundColor: '#FD6DBF',
    // alignContent: 'center',
    justifyContent: 'center',
  },
  test: {
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 120,
    marginBottom: 120,
    fontSize: 22,
  },
  updateButton: {
    backgroundColor: '#eee',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 10,
  }
})
