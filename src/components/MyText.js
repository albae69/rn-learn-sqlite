import React from 'react';
import {StyleSheet, Text} from 'react-native';

const MyText = ({text}) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default MyText;

const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 18,
    marginTop: 18,
    marginLeft: 35,
    marginRight: 35,
  },
});
