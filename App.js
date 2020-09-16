import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { AsyncStorage } from 'react-native';

import Header from './components/header';
import AddToDo from './components/adToDo';
import ToDoItem from './components/todoItem';
import ToDoItemChecked from './components/todoItemChecked';

const STORAGE_KEY = '@save_items';

export default function App() {

  const [toDos, setToDos] = useState([{ text: 'Sample To Do', id: '1', isChecked: false }]);

  useEffect(() => {
    readData()
  }, [])

  const readData = () => {
    AsyncStorage.getItem(STORAGE_KEY).then((userData) => {
      try {
        if (userData === 'undefined') {
          alert('No Data to Load')
        } else {
          try {
            setToDos(JSON.parse(userData))
          } catch (e) {
            alert(e)
          }
        }
      } catch (e) {
        alert(e)
      }
    })
  }

  const saveData = (items) => {
    try {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).then(alert('Data successfully saved'))
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const pressHandler = (id) => {
    setToDos((prevToDos) => {
      var prevValue = prevToDos.filter(toDo => toDo.id == id)[0];
      var afterUpdate = { text: prevValue.text, id: id, isChecked: !prevValue.isChecked };
      var otherItems = prevToDos.filter(toDo => toDo.id != id);

      var newData = null;
      if (otherItems.length == 0) {
        newData = [afterUpdate];
      } else {
        if (afterUpdate.isChecked) {
          newData = [...otherItems, afterUpdate];
        } else {
          newData = [afterUpdate, ...otherItems];
        }
      }

      saveData(newData)

      return newData;
    })
  }

  const longPressHandler = (id) => {
    setToDos((prevToDos) => {
      var otherItems = prevToDos.filter(toDo => toDo.id != id);
      saveData(otherItems)

      return otherItems;
    })
  }

  const submitHandler = (text) => {
    setToDos((prevToDos) => {
      const newData = [
        { text: text, id: Math.random().toString(), isChecked: false },
        ...prevToDos];

      saveData(newData)

      return newData;
    })
  }

  function ItemRenderSelector({ item, pressHandler, longPressHandler }) {
    const itemIsChecked = item.isChecked;
    if (itemIsChecked) {
      return <ToDoItemChecked item={item}
        pressHandler={pressHandler}
        longPressHandler={longPressHandler} />;
    }
    return <ToDoItem item={item}
      pressHandler={pressHandler}
      longPressHandler={longPressHandler} />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.list}>
          <AddToDo submitHandler={submitHandler} />
          <FlatList
            data={toDos}
            renderItem={({ item }) => (
              <ItemRenderSelector item={item} pressHandler={pressHandler} longPressHandler={longPressHandler} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 40
  },
  list: {
    marginTop: 20
  }
});
