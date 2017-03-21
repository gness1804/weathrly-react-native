import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import axios from 'axios';

class Main extends Component {
    constructor(){
      super()
      this.state = {
        weather: [],
        location: 'Denver',
        state: 'CO',
      }
    }

  getWeather = () => {
    const city = this.state.location.toLowerCase();
    const state = this.state.state;
    const url = `http://api.wunderground.com/api/47fe8304fc0c9639/forecast/q/${state}/${city}.json`


  render() {
    return (
      <View>
        <Button
          title="Get Weather"
          onPress={() => { this.getWeather() }}
        >
        </Button>
      </View>
    );
  }

}

export default Main;
