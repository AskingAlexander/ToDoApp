import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function ToDoItem({ item, pressHandler }){
    return (
        <TouchableOpacity onPress={() => pressHandler(item.id)}>
            <Text style={styles.item}>{item.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item:{
        padding: 20,
        marginTop: 20,
        borderColor: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'white',
        borderWidth: 1,
        alignSelf: 'stretch',
        borderStyle: 'dashed',
        borderRadius: 10
    }
});