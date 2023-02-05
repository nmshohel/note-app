import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Edit from './src/screens/edit';
import Create from './src/screens/create';
import Signin from './src/screens/signin';
import SignUp from './src/screens/signup';
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import FlashMessage from "react-native-flash-message";
import { useEffect, useState } from 'react';


const firebaseConfig = {
  apiKey: "AIzaSyCf6t9Qhwoc1o1-k7DcNM16ZG5SQhSrBUo",
  authDomain: "note-app-2-8952b.firebaseapp.com",
  projectId: "note-app-2-8952b",
  storageBucket: "note-app-2-8952b.appspot.com",
  messagingSenderId: "364604451720",
  appId: "1:364604451720:web:d2e99f0e9e8eb449de683d"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);


const AppTheme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background:'#fff'
  }
}
const Stack= createNativeStackNavigator();

export default function App() {
  const [loding, setLoding]=useState(true);
  const [user, setUser]=useState(null);
// sign out or log out
  // useEffect(()=>{
  //   signOut(auth);
  // })
  
    useEffect(()=>{
      const authSubcription=onAuthStateChanged(auth, (user)=>{
        if(user)
        {
          setUser(user);
          setLoding(false)
        }
        else
        {
          setUser(null);
          setLoding(false)
        }

      })
      return authSubcription;
    }, [])

    if(loding)
    {
      return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator color="blue" size="large"/>
        </View>
      )
    }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {
          user ? (
            <>
              <Stack.Screen name="Home" options={{headerShown:false}}>
                {(props)=> <Home {...props} user={user}/>}
              </Stack.Screen>
              
              <Stack.Screen name="Create" options={{headerShown:false}}>
              {(props)=> <Create {...props} user={user}/>}
              </Stack.Screen>
              <Stack.Screen name="Edit" component={Edit} options={{headerShown:false}}/>
            </>

          ):(
            <>
              <Stack.Screen name="Signin" component={Signin} options={{headerShown:false}} />
              <Stack.Screen name="Signup" component={SignUp}  options={{headerShown:false}}/>

            </>
          )
        }



      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
