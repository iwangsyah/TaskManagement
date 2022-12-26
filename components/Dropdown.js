import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Dropdown = ({data, title, onSelected, value}) => {
  const [expanded, setExpanded] = useState(false)

  const onSelectedItem = (item) => {
    onSelected(item)
    setExpanded(false)
  }

  return (
    <View style={{marginTop: 10}}>
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setExpanded(!expanded)}>
      <View style={styles.labelColor(value.color)} />
        <Text style={{flex: 1}}>{value.label}</Text>
        <Icon name='chevron-down' color={Colors.black} size={20} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.dropdown}>
          {data.map((item, index) => (
            <TouchableOpacity style={styles.item(index)} onPress={() => onSelectedItem(item)}>
              <View style={styles.labelColor(item.color)} />
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {    
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6, 
    borderWidth: 0.5, 
    marginVertical: 8,
    paddingHorizontal: 16, 
  },
  dropdown: {
    backgroundColor: 'lightgrey', 
    paddingHorizontal: 16, 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10
  },
  item: index => ({    
    height: 50, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderTopWidth: index === 0 ? 0 : 0.5
  }),
  labelColor: color => ({
    width: 20, 
    height: 20, 
    marginRight: 16,
    borderRadius: 15, 
    backgroundColor: color,
  })
})

export default Dropdown;
