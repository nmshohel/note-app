import React, { useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { firebase } from '../../config'
import Button from '../components/Button'
import Input from '../components/Input'
import RadioInput from '../components/radio-input'




const options=['Male', 'Female']

export default function Signup() {
    const [gender, setGender]=useState(null)
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [name, setName]=useState('');
    const [age, setAge]=useState('');
    const [loding, setLoding]=useState(false);



    const signup=()=>{

        setLoding(true);
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response)=>{
            console.log('response-----', response);

            const uid=response.user.uid;
            const userProfileData={
                id:id,
                name:name,
                age:age,
                email:email,
                gender:gender
            }
            const userRef=firebase.firestore().collection("users");
            userRef.doc(uid).set(userProfileData);
            

            setLoding(false)

        })
        .catch((error)=>{
            setLoding(false);
            
        })

    }
    return (
        <View style={{margin:25, marginTop:60}}>
            <Input placeholder="Email" onChangeText={(text)=>setEmail(text)}/>
            <Input placeholder="Password" onChangeText={(text)=>setPassword(text)} secureTextEntry={true}/>
            <Input placeholder="Full Name" onChangeText={(text)=>setName(text)}/>
            <Input placeholder="Age" onChangeText={(text)=>setAge(text)}/>


            <View style={{marginTop:20}}>
            <Text style={{marginBottom:15}}>Select your gender</Text>

                {
                    options.map((item, index)=><RadioInput
                    value={gender}
                    label={item}
                    key={index}
                    setValue={setGender}
                   
                    ></RadioInput>)
                }
            </View>

            { loding ?
              
                <ActivityIndicator/>
                :
               
                <Button onPress={signup} title="Submit" customStyles={{marginTop:25, alignSelf:'center'}}/>
            }


            

            
        </View>
    )
}
