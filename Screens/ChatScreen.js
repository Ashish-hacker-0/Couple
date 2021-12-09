import React, { useState } from 'react'
import { View, Text ,Dimensions, TouchableOpacity, Image,ScrollView, FlatList} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import {profile} from '../constants/image';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices';
const ChatScreen = ({navigation}) => {

    const user = useSelector(selectUser);

    const insets = useSafeAreaInsets();
    const [loaded] = useFonts({
        Montserrat: require('../assets/fonts/Montserrat.ttf'),
    });

    const [data,setData] = useState(user.chats);



    const render = ({item}) => {
        return(
            <TouchableOpacity onPress={()=>navigation.navigate('messanger',{
                item:item
            })}  style={{backgroundColor:'#111224',flexDirection:'row',padding:20,alignItems:'center'}} >
                <Image
                    source={profile}
                    height={8}
                    width={8}
                    style={{
                        height:30,
                        width:30,
                        borderRadius:15,
                        marginHorizontal:5
                    }}
                />
                <View style={{flex:1}} >
                    <Text style={{fontWeight:'700',color:'white'}} >
                        {item.name}
                    </Text>
                    <Text style={{color:'white'}} >
                    </Text>
                </View>
                <View style={{backgroundColor:'#3AA1FF',height:20,width:20,alignItems:'center',justifyContent:'center',borderRadius:10,borderColor:'white',borderWidth:1}} ><Text style={{color:'white'}} >3</Text></View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex:1,backgroundColor:'white'}} >
            <View style={{paddingTop:insets.top,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,backgroundColor:'#131D23'}} >
                <View style={{flexDirection:'row',alignItems:'center'}} ><TouchableOpacity onPress={()=>navigation.navigate('home')} ><Text style={{fontFamily: 'Montserrat',margin:10,fontSize:18,color:'white'}} >Dating</Text></TouchableOpacity><Text style={{fontFamily: 'Montserrat',fontWeight:'700',fontSize:18,color:'white'}} >Chats</Text></View>
                <TouchableOpacity>
                    <Image
                        source={profile}
                        height={10}
                        width={10}
                        style={{
                            height:40,
                            width:40,
                            borderRadius:20
                        }}
                    />
                    <View style={{backgroundColor:'#F2A241',position:'absolute',height:30,width:30,alignItems:'center',justifyContent:'center',borderRadius:15,borderColor:'white',borderWidth:3,right:30}} ><Text style={{color:'white'}} >3</Text></View>
                </TouchableOpacity>
            </View>
           <View style={{flex:1,backgroundColor:'#111224'}} >
               <FlatList
                   data={data}
                   keyExtractor={item=>item.id}
                   renderItem={render}
               />
           </View>
        </View>
    )
}

export default ChatScreen
