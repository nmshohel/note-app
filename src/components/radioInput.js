import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'

export default function RadioInput({label, value, setValue, size='big'}) {
    const isSelected=value===label;
    return (
        <TouchableOpacity onPress={()=>setValue(label)}>
               <View style={styles.container}>
                <View style={[styles.outerCircle, isSelected && {borderColor:'#D87D4A'} ,size === 'big' && styles.bigOuterCircle]}>
                        <View style={[styles.innerCircle, isSelected && {borderColor:'#D87D4A', backgroundColor:'#D87D4A'},size === 'big' && styles.bigInnerCircle]}/>
                </View>
                <View>
                    <Text style={{marginLeft:20, fontWeight:'bold'}}>{label}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20


    },
    outerCircle:{
        height:20,
        width:20,
        borderWidth:1,
        borderRadius:10,
        borderColor:'#ccc',
        justifyContent:'center',
        alignItems:'center'

    },
    bigOuterCircle:{
        height:30,
        width:30,
        borderRadius:15,


    },
    bigInnerCircle:{
        height:16,
        width:16,
        borderRadius:8,
    },
    innerCircle:{
        height:10,
        width:10,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#ccc'

    }

})