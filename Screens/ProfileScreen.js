import React, { useEffect } from 'react'
import { View, Text, Image,TouchableOpacity, AsyncStorage, BackHandler, Alert,ToastAndroid } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {selectUser} from '../slices';
import {useSelector} from 'react-redux'
const ProfileScreen = ({navigation,route}) => {


    console.log(route);

    const user = useSelector(selectUser);

    console.log(user);

    const insets = useSafeAreaInsets();
    return (
        <View style={{padding:insets.top,backgroundColor:'#131D23',flex:1}} >
           <View style={{flexDirection:'row',alignItems:'center',marginVertical:20}} ><Image
                source={{
                   uri:`https://couple-dating-app.herokuapp.com/static/images/${user.photo}`
                }}
                style={{
                    height:50,
                    width:50,
                    borderRadius:2,
                    marginRight:10
                }}
           /><View><Text style={{color:'white',fontWeight:'700',fontSize:18}} >{user.name}</Text><Text  style={{color:'white'}}>{user.age}</Text></View></View>
        <View style={{paddingVertical:20,borderTopColor:'gray',borderTopWidth:1,borderBottomColor:'gray',borderBottomWidth:1}} >
            <TouchableOpacity onPress={()=>navigation.navigate('data')}  style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View style={{flexDirection:'row',alignItems:'center'}} ><Icon name="account-circle" color="white" style={{margin:10}} /><Text style={{color:'white'}} >Personal Data</Text></View><Icon name="chevron-right" color="white" /></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('premium')} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View style={{flexDirection:'row',alignItems:'center'}} ><Icon name="verified" color="white" style={{margin:10}}/><Text style={{color:'white'}} >Couple Premium</Text></View><Icon name="chevron-right" color="white" /></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('refer')}  style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View style={{flexDirection:'row',alignItems:'center'}} ><Icon name="favorite" color="white" style={{margin:10}} /><Text style={{color:'white'}} >Refferal Code</Text></View><Icon name="chevron-right" color="white" /></TouchableOpacity>
        </View>
        <View style={{paddingVertical:20,borderBottomColor:'gray',borderBottomWidth:1}} >
            <TouchableOpacity onPress={()=>navigation.navigate('contact')} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View style={{flexDirection:'row',alignItems:'center'}} ><Icon name="headset-mic" color="white" style={{margin:10}} /><Text style={{color:'white'}} >Contact Us</Text></View><Icon name="chevron-right" color="white" /></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('privacy')} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View style={{flexDirection:'row',alignItems:'center'}} ><Icon name="policy" color="white" style={{margin:10}}/><Text style={{color:'white'}} >Privacy Policy</Text></View><Icon name="chevron-right" color="white" /></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('terms')} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View style={{flexDirection:'row',alignItems:'center'}} ><Icon name="receipt" color="white" style={{margin:10}} /><Text style={{color:'white'}} >Terms and Conditions</Text></View><Icon name="chevron-right" color="white" /></TouchableOpacity>
            
        </View>
        <TouchableOpacity onPress={async ()=>{
            await route.params.setInitial('login');
            await AsyncStorage.removeItem('id');
            navigation.navigate('login');

        }} style={{padding:10,alignItems:'center'}} ><Text style={{color:'white',fontSize:16}} >Log Out</Text></TouchableOpacity>
        <Text style={{textAlign:'center',color:'white',marginVertical:20}}>App Version :- 1.0.0</Text>
        </View>
    )
}

export default ProfileScreen;
