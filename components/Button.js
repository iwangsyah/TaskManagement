import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({title, color, disabled, style, onPress}) => (
  <TouchableOpacity disabled={disabled} style={[styles.button(color, disabled), style]} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: (color, disabled) => ({
    backgroundColor: disabled ? 'lightgrey' : color ? color : '#257e7a', 
    padding: 16, 
    borderRadius: 6, 
    marginTop: 16
  }),
  text: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'center'
  }
})

export default Button;
