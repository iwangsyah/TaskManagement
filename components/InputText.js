import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const InputText = ({title, onChange, value}) => (
  <View style={{marginTop: 10}}>
    <Text style={{fontWeight: 'bold'}}>{title}</Text>
    <TextInput
      onChangeText={onChange}
      style={styles.input}
      value={value}
    />
  </View>
)

const styles = StyleSheet.create({
  input: {
    height: 50, 
    backgroundColor: Colors.white, 
    borderRadius: 6, 
    borderWidth: 0.5, 
    marginVertical: 8,
    paddingHorizontal: 16, 
  }
})

export default InputText;
