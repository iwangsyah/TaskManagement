import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Modal from 'react-native-modal';
import InputText from './InputText';
import { Button, Dropdown } from '.';

const PRIORITY = [
  {label: 'Low', value: 0, color: '#f3f1ea'},
  {label: 'Medium', value: 1, color: '#ffc000'},
  {label: 'High', value: 2, color: '#d30000'}
]

const ModalAdd = ({item, index, visible, onClose, onRefresh}) => {
  const [title, setTitle] = useState(item?.title)
  const [description, setDescription] = useState(item?.description)
  const [priority, setPriority] = useState(item?.priority || PRIORITY[0])

  const onReset = () => {
    if (!index) {
      setTitle(null)
      setDescription(null)
      setPriority(PRIORITY[0])
    }
  }

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
      onReset()
      onClose()
    } catch (e) {
      alert('Error save data')
    }
  }


  const onSave = async () => {
    const data = await getData()
    let newData = [...data]
    if (index >= 0) {
      newData[index] = {title, description, priority, done: false}
    } else {
      newData = [...newData, {title, description, priority, done: false}]
    }
    storeData(newData)
  }

  return (
    <Modal 
      animationIn="slideInUp"
      isVisible={visible}
      style={{margin: 0, paddingHorizontal: 16}}
      onBackdropPress={onClose}
    >
      <View style={styles.modalView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{index ? 'Edit' : 'Create New'} Task</Text>
        </View>
        <View style={{padding: 16}}>
          <InputText title='Title' onChange={setTitle} value={title}/>
          <InputText title='Description' onChange={setDescription} value={description}/>
          <Dropdown title='Priority' data={PRIORITY} value={priority} onSelected={setPriority}/>
          <Button disabled={!title || !description} title='Save' onPress={onSave}/>
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
  titleContainer: {
    backgroundColor: '#257e7a', 
    paddingVertical: 24, 
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 20, 
    color: Colors.white, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  },
});

export default ModalAdd;
