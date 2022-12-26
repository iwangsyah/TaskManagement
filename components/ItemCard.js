import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Octicons';
import { ModalAdd, ModalDetail } from '.';

const ItemCard = ({item, index, onRefresh}) => {
  const [addVisible, setAddVisible] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)

  return (
    <View>
      <TouchableOpacity style={[styles.itemContainer, styles.shadow]} onPress={() => setDetailVisible(true)}>
        <Text style={{flex: 1}}>{item.title}</Text>
        <View style={{backgroundColor: item.priority.color, alignItems: 'center', paddingVertical: 4, paddingHorizontal: 16, borderWidth: 1, borderRadius: 6}}>
          <Text style={{fontWeight: 'bold', color: item.priority.value === 2 ? 'white' : 'black'}}>{item.priority.label}</Text>
        </View>
        <View style={styles.iconContainer}>
          {item.done ? (
            <View style={styles.checklist}>
              <Icon name='check' color={Colors.white} size={20} />
            </View>
          ) : (
            <TouchableOpacity onPress={() => setAddVisible(true)}>
              <Icon name='pencil' color={Colors.black} size={20}/>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <ModalDetail
        item={item}
        index={index}
        visible={detailVisible} 
        onRefresh={onRefresh}
        onClose={() => setDetailVisible(false)}
      />
      <ModalAdd
        item={item}
        index={index}
        isEdit={true}
        visible={addVisible} 
        onRefresh={onRefresh}
        onClose={() => setAddVisible(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white, 
    borderColor: 'lightgrey', 
    borderRadius: 12,
    padding: 16,
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.75)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8, 
  },
  iconContainer: {
    width: 40, 
    alignItems: 'flex-end'
  },
  checklist: {
    width: 25, 
    height: 25, 
    backgroundColor: 'green', 
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 13,
    marginLeft: 16
  }
});

export default ItemCard;
