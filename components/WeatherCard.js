import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

const WeatherCard = ({...props}) => {
  return (
    <View>
    <Text>Time Period: {props.title}</Text>
    <Text>Forecast: {props.fcttext}</Text>
    </View>
  );
}

export default WeatherCard;
