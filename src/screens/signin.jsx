import { View, Text, Image, TextInput, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/button';
import Input from '../components/input';


export default function Signin({navigation}) {
  return (
      <SafeAreaView style={{flex:1}}>
          <Image source={require("../../assets/login.png")}
          style={{alignSelf:'center'}}
          />
          <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center'}}>
            Never forget your note
          </Text>
          <View style={{paddingHorizontal:16, paddingVertical:25}}>
              <Input  placeholder='Email Addres'/>
              <Input  placeholder='Password' secureTextEntry/>
                <Button title={"Login"} customStyles={{alignSelf:"center", marginTop:60}}/>
                
          </View>
          <View style={{flex:1, justifyContent:'flex-end', alignItems:'center', marginBottom:30}}>
            <Pressable onPress={()=>{navigation.navigate('Signup')}}>
                      <Text>Don't have an account?  {" "} 
                        <Text style={{color:'green', fontWeight:'bold'}}>Signup</Text>


                      </Text>
            </Pressable>
          </View>
      </SafeAreaView>
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