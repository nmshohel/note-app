import React, { useState } from 'react'
import { View, Text, ActionSheetIOS, ActivityIndicator, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input'
import RadioInput from '../components/radio-input';
import {firebase} from '../../config'
import { showMessage } from 'react-native-flash-message';

export default function Create({route,user}) {
    const [title, setTitle]=useState('');
    const [description, setDescription]=useState('');
    const [noteColor, setNoteColor]=useState('white');
    const options=['red', 'green', 'blue'];
    const [loding, setLoding]=useState(false);
    const userId=user.uid;
    console.log(userId)

    const onSave=()=>{
        const noteRef=firebase.firestore().collection('notes')
        setLoding(true);
        const timestamp=firebase.firestore.FieldValue.serverTimestamp();
        const data={
            title,
            description,
            noteColor,
            authorId:userId,
            createdAt:timestamp,
        }

        noteRef.add(data)
        .then((_doc)=>{
            setLoding(false);
            showMessage(
                {
                    message:'Note created Successfully',
                    type:'success'
                }
            )

        })
        .catch((error)=>{
            console.log(error)
            setLoding(false)
        })

    }
    return (
        <SafeAreaView style={{margin:20, flex:1}}>
                <Input onChangeText={(text)=>setTitle(text)} placeholder="Set the title"/>
                <Input onChangeText={(text)=>setDescription(text)} placeholder="Set the description"/>
                <View style={{marginTop:20}}>
                <Text style={{marginBottom:15, fontSize:18}}>Select your note color</Text>

                    {
                        options.map((item, index)=><RadioInput
                        value={noteColor}
                        label={item}
                        key={index}
                        setValue={setNoteColor}
                        size="big"
                    
                        ></RadioInput>)
                    }
            </View>
           <View style={{flex:1, justifyContent:'flex-end'}}>
                 {
                     loding ?(
                         <ActivityIndicator color="black"/>
                     )
                     :
                     (
                        <Button onPress={onSave} title="Submit" customStyles={{alignSelf:'center', marginBottom:20}}/>
                     )
                 }
           </View>
        </SafeAreaView>
    )
}
