import React, { Component } from 'react';
import {
  AppRegistry,
  View,
} from 'react-native';
import styles from './styles/index-android-styles';
import Header from './components/Header';
import Main from './components/Main';

export default class weathrly extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Main />
      </View>
    );
  }
}

AppRegistry.registerComponent('weathrly', () => weathrly);
