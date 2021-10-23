import React from 'react'
import { View, Text, SafeAreaView, Pressable } from 'react-native'
import {firebase} from '../../config';

export default function Home() {
    return (
        <SafeAreaView>
        <View>
            <Text>Home Screens</Text>
            <Pressable onPress={()=>firebase.auth().signOut()}>
            <Text>Logout</Text>


            </Pressable>
        </View>
        </SafeAreaView>
    )
}
