import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../slices'
const querystring = require('querystring');
const PersonDataScreen = ({navigation}) => {

    const insets = useSafeAreaInsets();

    const user = useSelector(selectUser);
    const [name,setName] = useState('');
    const [state,setState] = useState('');
    const [city,setCity] = useState('');
    const [about,setAbout] = useState('');
    const [gender,setGender] = useState('');
    const [password,setPassword] = useState('');
    const [profession,setProfession] = useState('');

    const dispatch = useDispatch();

    useEffect(()=>{
       setName(user.name);
       setState(user.state);
       setCity(user.city);
       setAbout(user.about);
       setGender(user.gender);
       setPassword(user.password);
       setProfession(user.profession);
    },[]);

    const updateProfile = () => {
        axios.post('https://couple-dating-app.herokuapp.com/updateprofile',querystring.stringify({
            name:name,
            state:state,
            city:city,
            about:about,
            gender:gender,
            password:password,
            profession:profession,
            id:user.id
        }))
        .then(res=>{
            dispatch(setUser(res.data));
        });
    }

    return (
        <View style={{paddingTop:insets.top,flex:1,backgroundColor:'#131D23'}} >
            <View style={{flexDirection:'row',alignItems:'center'}} >
                <TouchableOpacity style={{padding:10}} onPress={()=>navigation.goBack()}>
                    <Icon
                        name="chevron-left"
                        color="white"
                    />
                </TouchableOpacity>
                <Text style={{fontWeight:'700',color:'white'}} >Personal Data</Text>
            </View>
            <View style={{alignItems:'center',padding:20}} >
            <TouchableOpacity>
                <Image
                    source={{
                        uri:`https://couple-dating-app.herokuapp.com/static/images/${user.photo}`
                    }}
                    style={{
                        height:80,
                        width:80,
                        borderRadius:7
                    }}
                />
                <TouchableOpacity style={{backgroundColor:'#D9DFFD',position:'absolute',bottom:-8,right:-8,borderRadius:4}} >
                <Icon
                    name="photo"

                />
                </TouchableOpacity>
            </TouchableOpacity>
            </View>
            <ScrollView style={{flex:1,padding:20}} >
            <View>
                <Text style={{color:'white',paddingVertical:10}} >Your Name</Text>
                <TextInput style={{borderWidth:1,borderColor:'gray',backgroundColor:'#D9DFFD',borderRadius:2,padding:5}} value={name} onChangeText={setName} />
            </View>
            <View>
                <Text style={{color:'white',paddingVertical:10}} >Your Profession</Text>
                <TextInput style={{borderWidth:1,borderColor:'gray',backgroundColor:'#D9DFFD',borderRadius:2,padding:5}} value={profession} onChangeText={setProfession} />
            </View>
            <View>
                <Text style={{color:'white',paddingVertical:10}} >Your State</Text>
                <TextInput style={{borderWidth:1,borderColor:'gray',backgroundColor:'#D9DFFD',borderRadius:2,padding:5}} value={state} onChangeText={setState} />
            </View>
            <View>
                <Text style={{color:'white',paddingVertical:10}} >Your City</Text>
                <TextInput style={{borderWidth:1,borderColor:'gray',backgroundColor:'#D9DFFD',borderRadius:2,padding:5}} value={city} onChangeText={setCity} />
            </View>
            <View>
                <Text style={{color:'white',paddingVertical:10}} >About</Text>
                <TextInput style={{borderWidth:1,borderColor:'gray',backgroundColor:'#D9DFFD',borderRadius:2,padding:5}} value={about} onChangeText={setAbout} numberOfLines={4} multiline={true} />
            </View>

            <View>
                <Text style={{color:'white',paddingVertical:10}} >Gender</Text>
                <View style={{flexDirection:'row'}} ><TouchableOpacity onPress={()=>setGender(true)} style={{backgroundColor:'#D9DFFD',flex:1,padding:15,flexDirection:'row',alignItems:'center',marginRight:10}} ><View style={{height:15,width:15,borderRadius:7.5,borderWidth:1,padding:2,marginRight:10}} ><View style={{backgroundColor:gender?'black':'white',flex:1,borderRadius:5}} ></View></View><Text>Male</Text></TouchableOpacity><TouchableOpacity onPress={()=>setGender(false)} style={{backgroundColor:'#D9DFFD',flex:1,padding:15,flexDirection:'row',alignItems:'center'}} ><View style={{height:15,width:15,borderRadius:7,borderWidth:1,padding:2,marginRight:10}} ><View style={{backgroundColor:gender?'white':'black',flex:1,borderRadius:5}} ></View></View><Text>Female</Text></TouchableOpacity></View>
            </View>
            <View style={{flex:1,marginBottom:25}} >
                <Text style={{color:'white',paddingVertical:10}} >Password</Text>
                <TextInput style={{borderWidth:1,borderColor:'gray',backgroundColor:'#D9DFFD',borderRadius:2,padding:5}} value={password} onChangeText={setPassword} />
            </View>
            </ScrollView>
            <View>
                <TouchableOpacity onPress={()=>updateProfile()} style={{backgroundColor:'#D9DFFD',padding:15}} ><Text style={{color:'black',textAlign:'center',fontWeight:'700'}} >SAVE CHANGES</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default PersonDataScreen
