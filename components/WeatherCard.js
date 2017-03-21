import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from '../styles/weather-card-styles';

const WeatherCard = ({ ...props }) => {
  // const pic = props.icon_url
  return (
    <View style={styles.container}>
      <Text style={styles.timePeriod}>Time Period: {props.title}</Text>
      <Text style={styles.forecast}>
        <Text style={styles.textSpan}>Forecast:</Text> {props.fcttext}</Text>
    </View>
  );
}

export default WeatherCard;
