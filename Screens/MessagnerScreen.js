import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, Image, ScrollView, TextInput } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
const width = Dimensions.get('window').width;
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import io from "socket.io-client";
import {useSelector} from 'react-redux'
import { selectUser } from '../slices';
import { usePreventScreenCapture } from 'expo-screen-capture';
const socket = io("https://couple-dating-app.herokuapp.com",{ transports : ['websocket'] });
import * as ScreenCapture from 'expo-screen-capture';

const MessagnerScreen = ({navigation,route}) => {

    
    const scrollView = useRef();

    const [user,setUser] = useState(route.params.item);

    const [chats,setChats] = useState([]);

    const [messages,setMessages] = useState([]);

    const [input,setInput] = useState('');

    const state = useSelector(selectUser);


    useEffect(()=>{
        console.log(user);
        // ScreenCapture.preventScreenCaptureAsync();
        scrollView.current?.scrollToEnd();
        axios.get(`https://couple-dating-app.herokuapp.com/message/${user.id}`)
        .then(res=>{
            console.log(res.data);
            setMessages(res.data.messages)
        });
    },[]);

    useEffect(()=>{
        scrollView.current?.scrollToEnd({animated: true});
        socket.on("message", ({id,message,userId}) => {
            if(id===user.id){
                setMessages([...messages,{id:userId,message:message}])
                scrollView.current?.scrollToEnd({animated: true});
            }
        });
    });

    const insets = useSafeAreaInsets();

    const send = () => {
        console.log('Send');
        socket.emit("message",{id:user.id,message:input,userId:state.id});
        setInput('');
    }

    return (
        <View style={{flex:1,backgroundColor:'#111224'}}>
           <View style={{flexDirection:'row',paddingTop:insets.top,justifyContent:'space-between',alignItems:'center',padding:15,width:width}} >
              <TouchableOpacity style={{paddingVertical:10}} onPress={()=>navigation.goBack()} >
               <Icon
                   name="arrow-back"
                   color={'white'}
               />
               </TouchableOpacity>
               <View style={{alignItems:'center'}} ><Image
                    source={{
                        uri:`https://couple-dating-app.herokuapp.com/images/${user.userId}`
                    }}
                    height={8}
                    width={8}
                    style={{
                        height:50,
                        width:50,
                        borderRadius:25,
                        marginHorizontal:5
                    }}
                /><Text style={{color:'white',fontWeight:'700',fontSize:17}} >{user.name}</Text></View>
               <Text></Text>
           </View>
           <ScrollView ref={scrollView} style={{flex:1,margin:15,overflow:'scroll'}} >
           {messages.map(m=>{
               return(
                <View style={{alignSelf:m.id==user.userId?'flex-start':'flex-end',backgroundColor:m.id==user.userId?'#262739':'#3FA1FC',padding:10,borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomRightRadius:10,marginBottom:5}} ><Text style={{color:'white'}} >{m.message}</Text></View>
               )
           })}
          </ScrollView>
           <View style={{backgroundColor:'#262739',flexDirection:'row',margin:insets.top/2,padding:10,borderRadius:30,alignItems:'center'}} >
           <TouchableOpacity>
              <Icon
                  name="image"
                  color="#3FA1FC"
                  size={30}
              />
              </TouchableOpacity>
              <TextInput
                  placeholder={'message...'}
                  style={{flex:1,marginLeft:10,color:'white'}}
                  selectionColor={'gray'}
                  placeholderTextColor={'gray'}
                  value={input}
                  onChangeText={setInput}
              />
              <TouchableOpacity onPress={()=>send()} style={{}} >
              <Icon
                  name="send"
                  color="#3FA1FC"
                  size={30}
              />
              </TouchableOpacity>
           </View>
        </View>
    )
}

export default MessagnerScreen
