import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const MyTextInput = ({
  inputStyle,
  placeholder,
  keyboardType,
  onChangeText,
  returnKeyType,
  numberOfLines,
  multiline,
  onSubmitEditing,
  value,
  maxLength,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        placeholderTextColor="#0077FF"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        value={value}
        maxLength={maxLength}
      />
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    borderColor: '#007FFF',
    borderWidth: 1,
  },
});
