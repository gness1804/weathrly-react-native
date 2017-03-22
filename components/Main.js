import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  AsyncStorage,
  TextInput,
  Picker,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import styles from '../styles/main-styles';
import zipCodeIsValid from '../helpers/zipCodeValidation';

class Main extends Component {
  constructor() {
    super()
    this.state = {
      weather: [],
      location: '',
      state: '',
      zip: null,
      view: 'us-city-state',
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('city').then((city) => { this.setState({ location: city }) })
    AsyncStorage.getItem('state').then((state) => { this.setState({ state }) })
    AsyncStorage.getItem('zip').then((zip) => { this.setState({ zip }) })
  }

  getWeather = () => {
    if (this.state.view === 'us-city-state') {
      const city = this.state.location.toLowerCase();
      const state = this.state.state;
      const url = `http://api.wunderground.com/api/47fe8304fc0c9639/forecast/q/${state}/${city}.json`
      if (!city || !state) {
        Alert.alert('Error: you must enter both a city and a state.')
        return
      }
      axios.get(url)
      .then((data) => {
        this.setState({ weather: data.data.forecast.txt_forecast.forecastday })
      })
      .then(() => { AsyncStorage.setItem('city', city) })
      .then(() => { AsyncStorage.setItem('state', state) })
    }

    if (this.state.view === 'us-zip') {
      const zipCode = this.state.zip
      const url = `http://api.wunderground.com/api/47fe8304fc0c9639/forecast/q/${zipCode}.json`
      if (!zipCodeIsValid(zipCode)) {
        Alert.alert('Error: you must enter a valid five digit US zip code.')
        return
      }
      axios.get(url)
      .then((data) => {
        this.setState({ weather: data.data.forecast.txt_forecast.forecastday })
      })
      .then(() => { AsyncStorage.setItem('zip', zipCode) })
    }
  }

  render() {
    const { location, state, weather, view, zip } = this.state
    let list
    let mode

    if (view === 'us-city-state') {
      mode = (
        <View>
          <Text style={styles.instructions}>
            --Choose your city and state (US only)--
          </Text>
          <TextInput
            placeholder="City"
            value={location || ''}
            onChangeText={(text) => { this.setState({ location: text }) }}
          />
          <Picker
            selectedValue={state}
            onValueChange={(choice) => { this.setState({ state: choice }) }}
          >
            <Picker.Item label="Alabama" value="AL" />
            <Picker.Item label="Alaska" value="AK" />
            <Picker.Item label="Arizona" value="AZ" />
            <Picker.Item label="Arkansas" value="AR" />
            <Picker.Item label="California" value="CA" />
            <Picker.Item label="Colorado" value="CO" />
            <Picker.Item label="Connecticut" value="CT" />
            <Picker.Item label="Delaware" value="DE" />
            <Picker.Item label="District of Columbia" value="DC" />
            <Picker.Item label="Florida" value="FL" />
            <Picker.Item label="Georgia" value="GA" />
            <Picker.Item label="Hawaii" value="HI" />
            <Picker.Item label="Idaho" value="ID" />
            <Picker.Item label="Illinois" value="IL" />
            <Picker.Item label="Indiana" value="IN" />
            <Picker.Item label="Iowa" value="IA" />
            <Picker.Item label="Kansas" value="KS" />
            <Picker.Item label="Kentucky" value="KY" />
            <Picker.Item label="Louisiana" value="LA" />
            <Picker.Item label="Maine" value="ME" />
            <Picker.Item label="Maryland" value="MD" />
            <Picker.Item label="Massachusetts" value="MA" />
            <Picker.Item label="Michigan" value="MI" />
            <Picker.Item label="Minnesota" value="MN" />
            <Picker.Item label="Mississippi" value="MS" />
            <Picker.Item label="Missouri" value="MO" />
            <Picker.Item label="Montana" value="MT" />
            <Picker.Item label="Nebraska" value="NE" />
            <Picker.Item label="Nevada" value="NV" />
            <Picker.Item label="New Hampshire" value="NH" />
            <Picker.Item label="New Jersey" value="NJ" />
            <Picker.Item label="New Mexico" value="NM" />
            <Picker.Item label="New York" value="NY" />
            <Picker.Item label="North Carolina" value="NC" />
            <Picker.Item label="North Dakota" value="ND" />
            <Picker.Item label="Ohio" value="OH" />
            <Picker.Item label="Oklahoma" value="OK" />
            <Picker.Item label="Oregon" value="OR" />
            <Picker.Item label="Pennsylvania" value="PA" />
            <Picker.Item label="Rhode Island" value="RI" />
            <Picker.Item label="South Carolina" value="SC" />
            <Picker.Item label="South Dakota" value="SD" />
            <Picker.Item label="Tennessee" value="TN" />
            <Picker.Item label="Texas" value="TX" />
            <Picker.Item label="Utah" value="UT" />
            <Picker.Item label="Vermont" value="VT" />
            <Picker.Item label="Virginia" value="VA" />
            <Picker.Item label="Washington (state)" value="WA" />
            <Picker.Item label="West Virginia" value="WV" />
            <Picker.Item label="Wisconsin" value="WI" />
            <Picker.Item label="Wyoming" value="WY" />
          </Picker>
        </View>
      )
    }

    if (view === 'us-zip') {
      mode = (
        <View>
          <Text>Enter US Zip Code (5 digits only).</Text>
          <TextInput
            placeholder="Zip"
            value={zip}
            onChangeText={(text) => { this.setState({ zip: text }) }}
          />
        </View>)
    }

    if (location) {
      list = weather.map((item) => {
        return (<WeatherCard
          {...item}
          key={Date.now() * Math.random()}
        />)
      })
    } else {
      list = <Text>Please enter in a location.</Text>
    }

    return (
      <View style={styles.container}>
        {mode}
        <Text>Select Mode:</Text>
        <Picker
          selectedValue={view}
          onValueChange={(choice) => { this.setState({ view: choice }) }}
          title="Change Selection Criteria..."
        >
          <Picker.Item label="US City and State" value="us-city-state" />
          <Picker.Item label="US Zip Code" value="us-zip" />
        </Picker>
        <Button
          title="Get Weather"
          onPress={() => { this.getWeather() }}
        />
        <ScrollView
          style={styles.weatherCardsList}
        >
          {list}
        </ScrollView>
      </View>
    );
  }

}

export default Main;
