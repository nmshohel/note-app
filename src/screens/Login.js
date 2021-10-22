import React from 'react'
import { View, Text,Image,StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Login() {
    return (
        <SafeAreaView>
            <View>
                    <Image 
                            style={{
                                        width: 200,
                                        height: 200,
                                        marginTop:80,

                                        resizeMode: 'contain',
                                        alignSelf:'center'

                                    }}
                            source={require('../../assets/rsz_user-login.png')} />
                    <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center'}}>Never forget your notes</Text>
            </View>
            <View style={{margin:25}}>
                <Input placeholder="Email"/>
                <Input placeholder="Password"/>
                <Button customStyles={{marginTop:20, alignSelf:'center'}} title="Login"/>
            </View>
            <View style={{marginTop:25}}>
               <Text style={{textAlign:'center'}}>
                        Don't have an account?     <Text style={{color:'#18B18D', fontWeight:'bold'}}>Sign up</Text>
               </Text>
            </View>
        </SafeAreaView>
    )
}


