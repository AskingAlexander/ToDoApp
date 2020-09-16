import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { AsyncStorage } from 'react-native';

import Header from './components/header';
import AddToDo from './components/adToDo';
import ToDoItem from './components/todoItem';
import ToDoItemChecked from './components/todoItemChecked';

export default function App() {
  let prevData = null;

  try {
    let preValue = await AsyncStorage.getItem('toDos');

    if (preValue !== null) {
      // We have data!!
      prevData = JSON.parse(preValue);

      console.log('Previous Data');
    }
  } catch (error) {
    console.log('New Data');

    // Error retrieving data
    prevData = [{ text: 'Sample To Do', id: '1', isChecked: false }];

    await AsyncStorage.setItem(
      'toDos',
      JSON.stringify(prevData)
    );
  }

  const [toDos, setToDos] = useState(prevData);

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

      await AsyncStorage.setItem(
        'toDos',
        JSON.stringify(newData)
      );

      return newData;
    })
  }

  const submitHandler = (text) => {
    setToDos(async (prevToDos) => {
      const newData = [
        { text: text, id: Math.random().toString(), isChecked: false },
        ...prevToDos];

      await AsyncStorage.setItem(
        'toDos',
        JSON.stringify(newData)
      );

      return newData;
    })
  }

  function ItemRenderSelector({ item, pressHandler }) {
    const itemIsChecked = item.isChecked;
    if (itemIsChecked) {
      return <ToDoItemChecked item={item} pressHandler={pressHandler} />;
    }
    return <ToDoItem item={item} pressHandler={pressHandler} />;
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
              <ItemRenderSelector item={item} pressHandler={pressHandler} />
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
