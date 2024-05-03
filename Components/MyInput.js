import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const MyInput = ({onTextChange , placeholderText, type, color, backgroundColor}) => {
  const handleTextChange = (newText) => {
    onTextChange(newText);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, {backgroundColor:backgroundColor}]}
        placeholder={placeholderText}
        placeholderTextColor="gray"
        onChangeText={handleTextChange}
        secureTextEntry={type === 'password'}
        keyboardType={type}
        color={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height:60,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginTop:30,
  },
});

export default MyInput;
