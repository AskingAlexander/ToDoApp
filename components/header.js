
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header(){
    return (
        <View style={styles.header}>
            <Text style={styles.title}>ToDos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height: 100,
        padding: 20,
        alignSelf: 'stretch',
        backgroundColor: 'blue'
    },
    title:{
        padding: 40,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});