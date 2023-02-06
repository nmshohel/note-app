import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/input'
import RadioInput from '../components/radioInput';
import Button from '../components/button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../App';
import { showMessage } from 'react-native-flash-message';


const noteColorOption=['red', 'blue', 'green'];
export default function Create({navigation, route, user}) {
  const [title, setTitle]=useState("");
  const [description, setDescription]=useState("");
  const [color, setColor]=useState("blue")
  const [loding, setLoding]=useState(false)

  const onPressCreate= async()=>{
    setLoding(true)
      try{
        await addDoc(collection(db, "notes"), {
          title:title,
          description:description,
          color:color,
          uid:user.uid
    
        })
        setLoding(false)
        showMessage({
          message:"Note Create Successfully",
          type:"success"
        })
        navigation.goBack();

      }
      catch(error){
        console.log(error);
        setLoding(false)

      }


  }

  return (
    <SafeAreaView style={{marginHorizontal:20, flex:1}}>
      <Text>Create</Text>
      <Input placeholder='Title'  onChangeText={(text)=>setTitle(text)}/>
      <Input placeholder='Description' multiline={true} onChangeText={(text)=>setDescription(text)}/>
      <Text style={{marginTop:20, marginBottom:20}}>Select Your Note Color:</Text>
      {
                        noteColorOption.map((option, index)=><RadioInput
                        value={color}
                        label={option}
                        key={index}
                        setValue={setColor}
                        ></RadioInput>)
      }
      {
        loding ? (
          <ActivityIndicator/>
        ):
        (
          <Button 
          onPress={onPressCreate}  
          title={"Submit"} 
          customStyles={{alignSelf:"center", 
          marginTop:60, 
          width:'100%'}}/>
        )
      }
       
    </SafeAreaView>
  )
}