import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

const WeatherCard = ({...props}) => {
  // console.log(props)
  return (
    <View>
    <Text>Time Period: {props.title}</Text>
    </View>
  );
}

export default WeatherCard;
