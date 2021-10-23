import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

export default function RadioInput({label}) {

    return (
        <View>
               <View style={styles.container}>
                <View style={styles.outerCircle}>
                        <View style={styles.innerCircle}/>
                </View>
                <View>
                    <Text style={{marginLeft:20, fontWeight:'bold'}}>{label}</Text>
                </View>
            </View>
        </View>
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
    innerCircle:{
        height:10,
        width:10,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#ccc'

    }

})
