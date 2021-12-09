import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import ChatScreen from '../Screens/ChatScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Setting from '../Screens/Setting';
import PremiumScreen from '../Screens/PremiumScreen';
import MessagnerScreen from '../Screens/MessagnerScreen';
import UserProfileScreen from '../Screens/UserProfileScreen';
import RefferalScreen from '../Screens/RefferalScreen';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonDataScreen from '../Screens/PersonDataScreen';
import ContactScreen from '../Screens/ContactScreen';
import PrivacyScree from '../Screens/PrivacyScree';
import TermsScreen from '../Screens/TermsScreen';
const Navigation = () => {

    const [initial,setInitial] = useState('login')

    const Stack = createNativeStackNavigator();

    const dispatch = useDispatch();

    useEffect(()=>{
        AsyncStorage.getItem('id')
        .then(async(res)=>{
            console.log(res);
            if(res!=null){
                console.log('axios');
                await Axios.get(`https://couple-dating-app.herokuapp.com/user/${res}`)
                .then(async(res)=>{
                    console.log('async',res.data);
                    if(res.data!='Error no user found!'){
                      await dispatch(setUser(res.data))
                      setInitial('home')
                    }
                   
                })
                
            }
        })
        .catch((e)=>{
            console.log(e);
        });
    },[])

    return (
        <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initial}
          screenOptions={{
            headerShown:false,
          }}
        >
          {initial==='login'&&<Stack.Screen name="login" component={LoginScreen}/>}
          <Stack.Screen name="home" component={HomeScreen}/>
          <Stack.Screen name="chat" component={ChatScreen}/>
          <Stack.Screen name="userProfile" component={UserProfileScreen}/>
          <Stack.Screen name="profile" component={ProfileScreen} initialParams={{setInitial:setInitial}} />
          <Stack.Screen name="setting" component={Setting}/>
          <Stack.Screen name="premium" component={PremiumScreen}/>
          <Stack.Screen name="messanger" component={MessagnerScreen}/>
          <Stack.Screen name="refer" component={RefferalScreen}/>
          <Stack.Screen name="data" component={PersonDataScreen} />
          <Stack.Screen name="contact" component={ContactScreen} />
          <Stack.Screen name="privacy" component={PrivacyScree} />
          <Stack.Screen name="terms" component={TermsScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Navigation
