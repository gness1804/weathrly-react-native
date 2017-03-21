import React, { Component } from 'react';
import Header from './components/Header';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from "./styles/index-android-styles";

export default class weathrly extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
      </View>
    );
  }
}

AppRegistry.registerComponent('weathrly', () => weathrly);
