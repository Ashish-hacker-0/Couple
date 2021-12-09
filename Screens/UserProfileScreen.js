import React, { useState } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacityBase, TouchableOpacity } from 'react-native'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const UserProfileScreen = ({navigation,route}) => {

    console.log(navigation,route);
    
    const [data,setData] = useState(route.params.data);

    return (
        <View style={{flex:1}} >
            <Image
                source={{
                    uri:`https://couple-dating-app.herokuapp.com/static/images/${data.photo}`
                }}
                style={{
                    height:screenHeight/2,
                    width:screenWidth,
                    position:'absolute'
                }}
            />
            <View style={{backgroundColor:'#131D23',flex:1,padding:30,borderTopLeftRadius:30,marginTop:screenHeight/2.3,borderTopRightRadius:30,justifyContent:'space-between'}} >
                <View><Text style={{fontSize:23,fontWeight:'700',marginVertical:20,color:'white'}} >{data.name}</Text>
                <Text style={{color:'gray',marginVertical:5}} >Profession</Text>
                <Text style={{fontSize:14,fontWeight:'700',marginBottom:20,color:'white'}}>{data.profession?data.profession:'Not Provided'}</Text>
                 <Text style={{color:'gray',marginVertical:5}} >Location</Text>
                <Text style={{fontSize:14,fontWeight:'700',marginBottom:20,color:'white'}}>{data.city}, {data.state}</Text>
                <Text style={{color:'gray',marginVertical:5}}>About</Text>
                <Text style={{color:'white'}} >{data.about}</Text>
                </View>
                <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#01C9E3',paddingHorizontal:90,paddingVertical:20,borderRadius:10}} ><Text style={{color:'white',fontWeight:'700'}} >Send Message</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default UserProfileScreen
