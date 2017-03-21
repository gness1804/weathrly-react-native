import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  AsyncStorage,
  TextInput,
  Picker,
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
    axios.get(url)
    .then((data) => {
      this.setState({weather: data.data.forecast.txt_forecast.forecastday})
    })
    .then(() => {AsyncStorage.setItem('city', city)})
    .then(() => {AsyncStorage.setItem('state', state)})
  }

  render() {

    const { location, state } = this.state

    return (
      <View>
        <TextInput
        placeholder="City"
        onChangeText={(text) => { this.setState({location: text}) }}
        />
        <Picker
          selectedValue={state}
          onValueChange={(choice) => { this.setState({state: choice}) }}
        >
          <Picker.Item label="Arizona" value="AZ"/>
          <Picker.Item label="Arkansas" value="AR"/>
        </Picker>
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
