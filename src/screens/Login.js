import React, { useState } from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import Input from '../components/Input'
import { firebase } from '../../config';

export default function Login({navigation}) {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [loding, setLoding]=useState(false);
    const [error, setError]=useState(null);

    const navigateToSignUp=()=>{
        navigation.navigate('Signup')

    }
    const login=()=>{
        setLoding(true);
        firebase.auth().signInWithEmailAndPassword(email, password)

        .then(response=>{
            console.log(response)
            setLoding(false);
        })
        .catch(error=>{
            setError(error.message)
            setLoding(false);
        })

    }
    return (
        <SafeAreaView>
            <View>
                    <Image 
                            style={{
                                      
                                        marginTop:40,

                                        resizeMode: 'contain',
                                        alignSelf:'center'

                                    }}
                            source={require('../../assets/login.png')} />
                    <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center'}}>Never forget your notes</Text>
            </View>
            <View style={{margin:25}}>
            <Input placeholder="Email" onChangeText={(text)=>setEmail(text)}/>
            <Input placeholder="Password" onChangeText={(text)=>setPassword(text)} secureTextEntry={true}/>

        {error && <Text style={{color:'red', marginTop:10}}>{error}</Text>}



        {
            loding?
            <ActivityIndicator color={"black"}/>
            :
            <Button onPress={login} customStyles={{marginTop:40, alignSelf:'center'}} title="Login"/>
        }
               
 
                


            </View>
            <TouchableOpacity onPress={navigateToSignUp} style={{marginTop:25}}>
               <Text style={{textAlign:'center'}}>
                        Don't have an account?     <Text style={{color:'#18B18D', fontWeight:'bold'}}>Sign up</Text>
               </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


