import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Modal from 'react-native-modal';
import { Button } from '.';

const ModalDetail = ({visible, onClose, item, index, onRefresh}) => {
  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('item')
      if (data) {
        return JSON.parse(data)
      } else {
        return []
      }
    } catch(e) {
      alert('Error load data')
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('item', jsonValue)
      onRefresh()
      onClose()
    } catch (e) {
      alert('Error update data')
    }
  }

  const onDelete = async () => {
    const data = await getData()
    data.splice(index, 1)    
    storeData(data)
  }

  const onComplete = async () => {
    const data = await getData()
    let newData = [...data]
    newData[index].done = true
    storeData(newData)
  }

  const onConfirmation = (mode) => {
    Alert.alert('Confirmation', `Are you sure want to ${mode} this item ?`,       [
      { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
      { text: "OK", onPress: () => mode === 'delete' ? onDelete() : onComplete() }
    ]);
  }

  return (
    <Modal 
      animationIn="slideInUp"
      isVisible={visible}
      style={{margin: 0, paddingHorizontal: 16}}
      onBackdropPress={onClose}
    >
      <View style={styles.modalView}>
        <View style={styles.titleContainer(item.priority.color)}>
          <Text style={styles.title(item.priority.value)}>{item.title}</Text>
        </View>
        <View style={{padding: 16}}>
          <Text style={{fontWeight: 'bold', marginTop: 16}}>Description</Text>
          <Text style={{marginLeft: 16, marginTop: 8}}>{item.description}</Text>
          <Text style={{fontWeight: 'bold', marginTop: 16}}>Priority</Text>
          <Text style={{marginLeft: 16, marginVertical: 8}}>{item.priority.label}</Text>
          <View style={{flexDirection: 'row'}}>
            <Button title='Delete' color='red' style={{flex: 1}} onPress={() => onConfirmation('delete')} />
            <View style={{width: 16}}/>
            <Button 
              disabled={item.done}
              title={item.done ? 'Done' : 'Mark as Done'} 
              color='green' 
              style={{flex: 1}} 
              onPress={() => onConfirmation('complete')} 
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 32,
    justifyContent: 'center',
  },
  contentModal: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    paddingTop: 32
  },
  modalView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 16,
    elevation: 5,
  },
  titleContainer: color => ({
    backgroundColor: color, 
    paddingVertical: 24, 
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  }),
  title: value => ({
    fontSize: 20, 
    color: value === 2 ? 'white' : 'black', 
    fontWeight: 'bold', 
    textAlign: 'center', 
  }),
});

export default ModalDetail;
