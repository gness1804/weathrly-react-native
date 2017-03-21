import React from 'react';
import {
  Text,
  View,
} from 'react-native';

const WeatherCard = ({ ...props }) => {
  // const pic = props.icon_url
  return (
    <View>
      <Text>Time Period: {props.title}</Text>
      <Text>Forecast: {props.fcttext}</Text>
    </View>
  );
}

export default WeatherCard;
