import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Input({placeholder, secureTextEntry, onChangeText, autoCapitalize,multiline, value}) {
  return (
            <TextInput 
            style={styles.input} 
            placeholder={placeholder} 
            autoCapitalize={autoCapitalize} 
            onChangeText={onChangeText} 
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            value={value}
            />
  )
}

const styles=StyleSheet.create({
    input:{
      height:48,
      borderBottomWidth:1,
      borderBottomColor:'#ccc',
      marginBottom:25
    }
  })