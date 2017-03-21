import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from '../styles/header-styles';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Welcome to Weathrly</Text>
      <Text>Your World, Your Weather.</Text>
    </View>
  );
}

export default Header;
