import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, AsyncStorage, Image } from 'react-native'

import Status from './Status'
import Profile from './Profile'

import registerNotifications from './notifications';


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tab: null,
      username: null,
      password: null
    }
  }

  async componentDidMount() {
    try {
      this.setState({ username: (await AsyncStorage.getItem('@Tests:username')) })
      this.setState({ password: (await AsyncStorage.getItem('@Tests:password')) })
    } catch (error) {
      console.log("Can't load user credentials", error)
    }

    this.setState({ tab: this.hasCredentials() ? 'status' : 'profile' })
    registerNotifications();
  }

  hasCredentials() {
    return this.state.username && this.state.password
  }

  renderContent() {
    if (this.state.tab === 'profile') {
      return (
        <Profile
          username={this.state.username}
          password={this.state.password}
          onUsernameChange={(username) => this.setState({ username })}
          onPasswordChange={(password) => this.setState({ password })}
        />
      )
    } else {
      return (
        <Status
          username={this.state.username}
          password={this.state.password}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabBarItem} onPress={() => this.setState({ tab: 'status' })}>
            <Image source={require('./assets/icon_transparent.png')} style={{ width: 40, height: 40, opacity: this.state.tab === 'profile' ? 0.5 : 1 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBarItem} onPress={() => this.setState({ tab: 'profile' })}>
            <Image source={require('./assets/cog_transparent.png')} style={{ width: 32, height: 32, opacity: this.state.tab === 'status' ? 0.5 : 1 }} />
          </TouchableOpacity >
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#FD6DBF',
  },
  tabBar: {
    width: '100%',
    height: 50,
    backgroundColor: '#DD4D9F',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  tabBarItem: {
     justifyContent: 'center'
  },
})
