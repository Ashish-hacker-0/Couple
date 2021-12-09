import React, { useEffect, useState } from 'react'
import { View, Text,Dimensions, Image, FlatList,TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import {profile} from '../constants/image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Icon } from 'react-native-elements';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../slices';
import axios from 'axios';
import querystring from 'querystring';
const HomeScreen = ({navigation}) => {

    const insets = useSafeAreaInsets();
    const [loaded] = useFonts({
        Montserrat: require('../assets/fonts/Montserrat.ttf'),
    });

    const user = useSelector(selectUser);

    console.log(user);

    const dispatch = useDispatch();

    const [data,setData] = useState([
        {
            id:7,
            image:'https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg',
            name:'Alllen Jonas',
            age:'19',
            city:'Darbhnaga',
            state:'Bihar',
            blur:true 
        },
    ]
    )

    useEffect(()=>{

        axios.get(`https://couple-dating-app.herokuapp.com/users/${!user.gender}`)
        .then(async(res)=>{
            let newData = res.data;
            setCurrent(res.data[0]);
            await newData.push({
                id:7,
                image:'https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg',
                name:'Alllen Jonas',
                age:'19',
                city:'Darbhnaga',
                state:'Bihar',
                blur:true 
            });
            console.log(newData);
            await setData(newData);
        });
        
       
    },[])

    const [current,setCurrent] = useState();

    const sendMessage = () => {

        if(user.chats.find(i=>{
            if(i.userId==current._id){
                return true;
            }
        })==undefined){
            console.log(user,current);
            axios.post(`https://couple-dating-app.herokuapp.com/newChat`,querystring.stringify({
                id1:user.id,
                id2:current._id,
                message:'Hi',
                sname:user.name,
                rname:current.name
            }))
            .then(res=>{
                dispatch(setUser(res.data));
            });
        }else{
            console.log('Exist');
        }

        
    }

    const [i,setI] = useState(0);

    const renderItem = ({item})=>{
        if(item._id==user._id&&item.id!=7){
            return;
        }
        return(
            <TouchableOpacity onPress={()=>navigation.navigate('userProfile',{
                data:item
            })}  style={{width:screenWidth/1.1,alignSelf:'center',flex:1,backgroundColor:'#272C3D',borderWidth:10,borderColor:'#272C3D',borderRadius:20,marginTop:15,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 5,marginVertical:10,overflow:'hidden'}} >
            <View style={{flex:1}} >
               <Image
                   style={{flex:1,borderRadius:15}}
                   source={{
                       uri:(item.image?item.image:`https://couple-dating-app.herokuapp.com/static/images/${item.photo}`)
                   }}
                   blurRadius={item.blur?10:0}
               />
               <View style={{padding:7,position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
               <View>
                   <Text style={{fontSize:20,fontWeight:'700',color:'white'}} >{item.name}</Text>
                   <Text style={{color:'white'}} >{item.city},{item.state}</Text>
                   </View>
                   <View><Text style={{color:'pink',fontWeight:'700',fontSize:20}} >{item.age}</Text></View>
               </View>
               </View>
               {item.blur&&<View style={{alignItems:'center',position:'absolute',alignSelf:'center',top:'0%',backgroundColor:'rgba(0,0,0,0.6)',height:'100%',width:'100%',justifyContent:'center'}} >
                   <Text style={{color:'white',fontWeight:'700'}} >You have reached today's Swiping limit</Text>
                   <Text style={{color:'white',marginVertical:10}} >Choose from our plan to enjoy Unlimited Swiping.</Text>
                   <TouchableOpacity style={{backgroundColor:'#01C9E3',paddingHorizontal:20,paddingVertical:10}} onPress={()=>navigation.navigate('premium')} ><Text style={{color:'white',fontWeight:'700'}} >SEE PLANS</Text></TouchableOpacity>
               </View>}
            </TouchableOpacity>
        )
    }

    if(loaded){
        console.log(user.photo);
    return (
        <View style={{flex:1}}>
            <View style={{paddingTop:insets.top,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,backgroundColor:'#131D23'}} >
                <View style={{flexDirection:'row',alignItems:'center'}} ><Text style={{fontFamily: 'Montserrat',margin:10,fontWeight:'700',fontSize:20,color:'white'}} >Dating</Text><TouchableOpacity onPress={()=>navigation.navigate('chat')} ><Text style={{fontFamily: 'Montserrat',fontSize:20,color:'white'}} >Chats</Text></TouchableOpacity></View>
                <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress={()=>navigation.navigate('profile')}>
                    <Image
                        source={{
                            uri:`https://couple-dating-app.herokuapp.com/static/images/${user.photo}`
                        }}
                        height={20}
                        width={20}
                        style={{
                            height:50,
                            width:50,
                            borderRadius:25,
                            borderWidth:5,
                            borderColor:'#01C9E3'
                        }}
                    />
                    {/* <View style={{backgroundColor:'#F2A241',position:'absolute',height:30,width:30,alignItems:'center',justifyContent:'center',borderRadius:15,borderColor:'white',borderWidth:3,right:40}} ><Text style={{color:'white'}} >3</Text></View> */}
                </TouchableOpacity>
            </View>
            <View style={{flex:1,backgroundColor:'#131D23'}}>
            <View style={{flex:1,flexDirection:'row'}} >
                <Carousel
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    layout={'tinder'}
                    onBeforeSnapToItem={(i)=>console.log(i)}
                    onSnapToItem={(i)=>{
                        setCurrent(data[i])
                        if(i==6){
                            navigation.navigate('premium');
                        }
                    }}

                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:15}} >
                    <TouchableOpacity style={{backgroundColor:'#01C9E3',alignItems:'center',justifyContent:'center',padding:10,borderRadius:10}} >
                    <Icon
                        name="favorite-outline"
                        type="FontAwesome"
                        color={'white'}
                        size={35}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>sendMessage()} style={{flexDirection:'row',backgroundColor:'#998cff',alignItems:'center',borderRadius:5,paddingHorizontal:15}} ><Icon color={'white'} name="chat"/><Text style={{color:'white',padding:10,fontWeight:'700'}} >Say Hi!</Text></TouchableOpacity>
               </View>
            </View>
            </View>
    )
    }else{
        return(
            <View></View>
        )
    }
}

export default HomeScreen
