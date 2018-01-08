import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, Image } from 'react-native'
import { Button, TabBarIOS } from 'react-native'
import Status from './Status'
import Profile from './Profile'

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
  }

  hasCredentials() {
    return this.state.username && this.state.password
  }

  render() {
    return (
      <TabBarIOS
          barTintColor="#DD4D9F"
          unselectedItemTintColor="#FD6DBF"
          unselectedTintColor="#FFF"
          tintColor="#FFF"
          translucent={false}
      >
        <TabBarIOS.Item
          icon={require('./assets/calendar.png')}
          selectedIcon={require('./assets/calendar.png')}
          title=""
          selected={this.state.tab === 'status'}
          onPress={() => this.setState({ tab: 'status' })}
        >
          <Status
            username={this.state.username}
            password={this.state.password}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="bookmarks"
          title=""
          selected={this.state.tab === 'profile'}
          onPress={() => this.setState({ tab: 'profile' })}
        >
          <Profile
            username={this.state.username}
            password={this.state.password}
            onUsernameChange={(username) => this.setState({ username })}
            onPasswordChange={(password) => this.setState({ password })}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({
})
