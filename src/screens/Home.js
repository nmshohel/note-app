import React, { useState,useEffect } from 'react'
import { View, Text, SafeAreaView, Pressable, Image } from 'react-native'
import {firebase} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';
import Button from '../components/Button'
import { AntDesign } from '@expo/vector-icons'; 

const slides = [
    {
      key: 'one',
      title: 'Document',
      subtitle:'make yourself better',
      text: 'Learn new stuffs and get professional',
      image: require('../../assets/banner1.png'),
    },
    {
      key: 'two',
      title: 'Lern',
      subtitle:'Learn and grow',
      text: 'You can earn professionally with our notes',
      image: require('../../assets/banner2.png'),

    },
    {
      key: 'three',
      title: 'Help',
      subtitle:'Help others by educating',
      text: 'Create your own notes and help others',
      image: require('../../assets/banner3.png'),
    }
  ];


const Onboarding=({setOnboarded})=>{
    const makeOnBoardingTrue= async ()=>{
        try{
                await AsyncStorage.setItem('onboarding', 'true');
        }
        catch (e)
        {
            console.log(e);
        }
    }



    useEffect(()=>{
        makeOnBoardingTrue();
    },[])

    const renderItem=({item})=>{
        const {key,title, subtitle, text, image}=item;
        return(
            <View style={{flex:1}}>
                <Image source={image} style={{width:'100%', height:300}} resizeMode="contain"/>

                <View style={{marginTop:30}}>
                    <Text style={{textAlign:'center', fontSize:32, fontWeight:'bold', color:'#18B18D'}}>{title}</Text>
                    <Text style={{textAlign:'center', fontSize:22, color:'#18B18D', marginTop:20}}>{subtitle}</Text>
                    <Text style={{textAlign:'center', fontSize:18, fontWeight:'bold', color:'black', marginTop:20, marginHorizontal:40}}>{text}</Text>

                </View>


            </View>
        )
    }
    const onDone=()=>{
        setOnboarded(true);

    }
    const renderDoneButton=()=>{
        return(
            <View style={{width:50, height:50, borderRadius:25, backgroundColor:'green', justifyContent:'center', alignItems:'center'}}>
                <AntDesign name="check" size={30} color="white" />
            </View>
        )
    }

    return (
        <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        keyExtractor={item=>item.key}
        activeDotStyle={{backgroundColor:'green'}}
        renderDoneButton={renderDoneButton}

        />
    )
}

export default function Home() {
    const [checking, setChecking]=useState(true);
    const [onboarded, setOnboarded]=useState(false);



    const getOnboardingValue=async ()=>{

        await AsyncStorage.removeItem('onboarding')
        try{
            const value= await AsyncStorage.setItem('onboarding')
            if(value !== null)
            {
                setOnboarded(true);
                
            }
            setChecking(false);


        }
        catch (e) {
            console.log(e);
            setChecking(false);

        }
    }

    useEffect(() => {
        getOnboardingValue();
       

    }, [])


    if (checking)
    {
        return null;
    }


    if(!onboarded)
    {
        return (
            <SafeAreaView style={{flex:1, marginTop:50}}>
                <Onboarding setOnboarded={setOnboarded}/>
            </SafeAreaView>
        )
    }


    return (
        <SafeAreaView style={{marginTop:40}}>
        <View>
            <Text>Home Screens</Text>
            <Pressable onPress={()=>firebase.auth().signOut()}>
            <Text>Logout</Text>


            </Pressable>
        </View>
        </SafeAreaView>
    )
}
