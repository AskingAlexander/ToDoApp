import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default function AddToDo({ submitHandler }) {
    const [text, setText] = useState('');

    const changeHandler = (value) => {
        setText(value)
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='New ToDo...'
                onChangeText={changeHandler}
            />
            <Button
                title='Add ToDo'
                color='blue' 
                onPress={() => submitHandler(text)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 10,
        padding: 8,
        borderBottomColor: 'white',
        borderBottomWidth: 1
    }
})