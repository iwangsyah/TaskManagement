import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { 
  FlatList, 
  Platform, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  View ,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Octicons';
import { ItemCard, ModalAdd } from './components';

const App = () => {
  const [data, setData] = useState([]);
  const [addVisible, setAddVisible] = useState(false)
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const completed = data.filter(item => item.done)

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('item')
      if (data) {
        setData(JSON.parse(data))
      }
    } catch(e) {
      alert('Error load data')
    }
  }

  useEffect(() => {
    getData()
  }, [])
  
  const openModalAdd = () => {
    setAddVisible(true)
  }

  const renderItem = ({ item, index }) => <ItemCard item={item} index={index} onRefresh={getData} />;

  return (
    <Fragment>
      <SafeAreaView style={styles.top}/>
      <SafeAreaView style={styles.bottom}>
        <StatusBar barStyle={'dark-content'} backgroundColor='#257e7a'/>
        <View style={styles.content}>
          <Text style={styles.header} >Task List</Text>
          <View style={[styles.totalContainer, styles.shadow]}>
            <View style={styles.totalContent}>
              <Text style={styles.totalTitle}>Total</Text>
              <Text style={{fontSize: 18}}>{data.length}</Text>
            </View>
            <View style={{width: 1, height: '100%', borderWidth: 1}} />
            <View style={styles.totalContent}>
              <Text style={styles.totalTitle}>Completed</Text>
              <Text style={{fontSize: 18}}>{completed.length}</Text>
            </View>
          </View>
          <FlatList
            data={_.sortBy(data, [(o) => o.priority.value, 'title'])}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.flatlist}
            ItemSeparatorComponent={() => <View style={{height: 16}}/>}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={getData}
              />
            }
          />
        </View>
        <TouchableOpacity style={[styles.button, styles.shadow]} onPress={openModalAdd}>
          <Icon name='plus' color={Colors.white} size={40} />
        </TouchableOpacity>
        <ModalAdd
          visible={addVisible} 
          onClose={() => setAddVisible(false)}
          onRefresh={getData}
        />
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  top: {backgroundColor: '#257e7a'},
  bottom : {flex: 1, backgroundColor: Colors.lighter},
  header: {
    padding: 16,
    backgroundColor: '#257e7a',
    fontSize: 26,
    color: Colors.white
  },
  totalContainer: {
    flexDirection: 'row', 
    backgroundColor: Colors.white, 
    padding: 12
  },
  totalContent: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  totalTitle: {
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 12
  },
  content: { 
    flex: 1, 
    backgroundColor: Colors.lighter 
  },
  flatlist: {
    flexGrow: 1, 
    padding: 16, 
    paddingBottom: 100
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#257e7a',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 20,
    right: 24,
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
});

export default App;
