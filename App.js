import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Create from './src/screens/Create';
import Update from './src/screens/Update';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import { LogBox } from 'react-native';
import {firebase} from './config'

// import {YellowBox} from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
// YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);


const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:'white'
  },
};


const Stack = createNativeStackNavigator();


export default function App() {
  const [loding, setLoding]=useState(true);
  const [user, setUser]=useState(false);

  function authStateChanged(user)
  {
    setUser(user);
    setLoding(false);
  }

  useEffect(()=>{
    const subscribe=firebase.auth().onAuthStateChanged(authStateChanged);
    return subscribe;

  },[])
  if(loding)
  {
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator color="black"/>
    </View>
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
      {
        user ?(
          <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Create" component={Create}/>
              <Stack.Screen name="Update" component={Update}/>

          </>
        ):(
          <>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )
      }


    
      </Stack.Navigator>
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
