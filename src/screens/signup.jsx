import { View, Text, Image, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/button';
import Input from '../components/input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../App';
import {
  addDoc, collection, getDoc, doc, onSnapshot, query, where

} from 'firebase/firestore';
import { showMessage, hideMessage } from "react-native-flash-message";


const genderOptions=['Male','Female'];


export default function Signup({navigation}) {
  const [gender, setGender]=useState(null);
  const [name, setName]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [age, setAge]=useState("")
  const [loding, setLoding]=useState(false);
// create new user 
  const signup= async ()=>{
    setLoding(true);
    
  
    try{
        // create user 
      const result= await createUserWithEmailAndPassword(auth, email, password);
      // update profile 
        await addDoc(collection(db, 'users'), {
        name:name,
        email:email,
        age:age,
        gender:gender,
        uid:result.user.uid,

      })
      console.log("result= ", result)
      setLoding(false)
    }
    catch(error){
      console.log("error-----------", error)
      showMessage({
        message:"ERROR",
        type:"danger",

      });
      setLoding(false)
    }


  }
  return (
      <SafeAreaView style={{flex:1}}>

          <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center', marginTop:30}}>
            User Registration
          </Text>
          <View style={{paddingHorizontal:16, paddingVertical:25}}>
          <Input  placeholder='Full Name' autoCapitalize={"words"} onChangeText={(text)=>setName(text)} />
              <Input placeholder='Email Addres' autoCapitalize={"none"} onChangeText={(text)=>setEmail(text)}/>
              <Input placeholder='Fassword' secureTextEntry onChangeText={(text)=>setPassword(text)}/>
              <Input placeholder='Age' onChangeText={(text)=>setAge(text)}/>
              <View>
                  <Text style={{marginVertical:10}}>Select Gender:</Text>
              </View>
            {
              genderOptions.map((option)=>{
                const selected = option === gender;
              return(
                <Pressable onPress={()=>setGender(option)} key={option} style={styles.radioContainer}>
                <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                      <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]}/>

                      
                </View>
                <Text style={styles.radioText}>{option}</Text>
            </Pressable>
              )
              })
            }

              
             
           
                      <Button onPress={signup}  title={"SignUp"} customStyles={{alignSelf:"center", marginTop:60}}/>
          
          </View>
          <View style={{flex:1, justifyContent:'flex-end', alignItems:'center', marginBottom:30}}>
            <Pressable onPress={()=>{navigation.navigate('Signin')}}>
                      <Text>Already have an account?  {" "} 
                        <Text style={{color:'green', fontWeight:'bold'}}>Signin</Text>


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
  },
  radioContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:10,
  },
  outerCircle:{
    height:30,
    width:30,
    borderRadius:15,
    borderWidth:1,
    borderColor:'#cfcfcf',
   
    justifyContent:'center',
    alignItems:'center'
  },
  innerCircle:{
    height:15,
    width:15,
    borderRadius:7.5,
    borderWidth:1,
    borderColor:'#cfcfcf',
   
  },
  radioText:
  {
    marginLeft:10
  },
  selectedOuterCircle:{
    borderColor:'orange'
  },
  selectedInnerCircle:{
    backgroundColor:'orange',
    borderColor:'orange'
  }
})