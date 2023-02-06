import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/input'
import RadioInput from '../components/radioInput';
import Button from '../components/button';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../App';
import { showMessage } from 'react-native-flash-message';


const noteColorOption=['red', 'blue', 'green'];
export default function Edit({navigation, route, user}) {

  const noteItem=route.params.item;
  console.log("from update page--------------------------------------------", noteItem);
   
  const [title, setTitle]=useState(noteItem.title);

  const [description, setDescription]=useState(noteItem.description);
  const [color, setColor]=useState(noteItem.color)
  const [loding, setLoding]=useState(false)

  const onPressUpdate= async()=>{
    // const noteRef=
    setLoding(true)
    try{
      await updateDoc(doc(db, "notes", noteItem.id),{
        title:title,
        description:description,
        color:color,
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
      <Text>Update</Text>
      <Input placeholder={title} onChangeText={(text)=>setTitle(text)} value={title}/>
      <Input placeholder={description} multiline={true} onChangeText={(text)=>setDescription(text)} value={description}/>
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
          onPress={onPressUpdate}  
          title={"Update"} 
          customStyles={{alignSelf:"center", 
          marginTop:60, 
          width:'100%'}}/>
        )
      }
       
    </SafeAreaView>
  )
}