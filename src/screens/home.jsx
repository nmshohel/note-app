import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/button'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../App'
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
export default function Home({route, user, navigation}) {

  const [notes, setNotes]=useState([])
  const [loding, setLoding]=useState(true)



  // for note read from database 
  useEffect(()=>{
    const q=query(collection(db, "notes"), where("uid", "==", user.uid));

    // create listiner for change note 
    const noteListenerSubscription=onSnapshot(q, (querySnapshot)=>{

      const list=[];
      querySnapshot.forEach((doc)=>{
        list.push({...doc.data(), id:doc.id});
      })
      setNotes(list);
      setLoding(false)
    })

        return noteListenerSubscription;
  }, [])
    // end  note read from database 


    const renderItem=({item})=>{
      const {title, description, color,id}=item;
      console.log(item)
      return(
        <View style={{backgroundColor:color, marginBottom:25, borderRadius:16, padding:15}}>
         
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{color:'white', fontSize:24}}>{title}</Text>
          <Pressable
          onPress={()=>{
            navigation.navigate("Edit", {item});
          }}
          >
          <Entypo name="edit" size={24} color="black" />
          </Pressable>

      
          <Pressable 
              onPress={()=>{

                   

            deleteDoc(doc(db, "notes", id))
        
              }}
          >
          <AntDesign name="delete" size={24} color="white" />
          </Pressable>
          
          </View>
          
          <View>
          <Text style={{color:'white', fontSize:18, marginTop:16}}>{description}</Text>
            </View>
            
            

        </View>
      );

    }

    
  // for logout 
  const logout=()=>{
      signOut(auth);
  }
  // logout end 

  const onPressCreate=()=>{
    navigation.navigate("Create");
  }

if(loding)
{
  return(
    <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator/>
    </SafeAreaView>
  );
}



  return (
    <SafeAreaView style={{flex:1}} onPress={logout}>
      <View style={{flexDirection:'row', justifyContent:'space-between', padding:20}}>
        <Text>My Notes</Text>
        <Pressable onPress={onPressCreate}>
        <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
        <AntDesign onPress={logout} name="logout" size={24} color="black" />

      
           
  

      </View>
      <FlatList 
      data={notes} 
      renderItem={renderItem} 
      keyExtractor={(item)=>item.description}
      contentContainerStyle={{padding:20}}
      />
       
    </SafeAreaView>
  )
}