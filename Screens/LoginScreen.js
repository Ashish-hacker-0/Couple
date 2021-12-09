import React, { useEffect, useRef, useState } from 'react'
import { View, Text ,Image, TouchableOpacity, TextInput,KeyboardAvoidingView,Platform,Dimensions ,ScrollView, Alert, AsyncStorage, BackHandler, ToastAndroid} from 'react-native'

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {login,logo} from '../constants/image';
import { useFonts } from 'expo-font';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMars,faVenus } from '@fortawesome/free-solid-svg-icons'
import {getStates} from 'country-state-picker';
import picker, { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import CheckBox from 'expo-checkbox';
const querystring = require('querystring');
import firebase from '../firebase';
import { detectFacesAsync } from 'expo-face-detector';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices';
const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [gender,setGender] = useState(true);
    const [msg,setMsg] = useState('');
    const recaptchaVerifier = useRef(null);
    const [number,setNumber] = useState('');
    const [password,setPassword] = useState('');
    const [otp,setOtp] = useState('');
    const [verificationId,setVerificationId] = useState('');
    const [name,setName] = useState('');
    const [state,setState] = useState('');
    const [city,setCity] = useState('');
    const [about,setAbout] = useState('');
    const [cp,setCp] = useState('');
    const [reff,setReff] = useState('');

    const [profession,setProfession] = useState('');

    const [image,setImage] = useState('')

    const [imagename,setImagename] = useState('Select Image');

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', () => {

            return false;
        });
    },[])

    const onChange = (event, selectedDate) => {
        console.log(date);
        const currentDate = selectedDate || date;
        console.log(currentDate);
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
        if (!result.cancelled) {
            
            detectFacesAsync(result.uri)
            .then(res=>{
                if(res.faces.length!=1){
                    Alert.alert(
                        "Error",
                        'Please upload a image that contains only you!',
                       [
                           { text: "OK", onPress: () => console.log("OK Pressed") }
                       ]
                    )
                    setImage('');
                    setImagename('Select Image');
                }else{
                    setImagename(result.uri.split('/')[result.uri.split('/').length-1]);
                    setImage(result.uri);
                }
            });
        }
    };
    
    const [loaded] = useFonts({
        Montserrat: require('../assets/fonts/Montserrat.ttf'),
    });
    
    const loginHandler = () => {
        console.log(number,password);
        try{
            fetch('https://couple-dating-app.herokuapp.com/login',{
                method:'POST',
                body:querystring.stringify({
                    phone:number,
                    password:password
                }),
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            })
            .then(res=>res.json())
            .then(async(data)=>{
                if(data.msg){
                    setMsg(data.msg);
                }else{
                    await dispatch(setUser(data));
                    AsyncStorage.setItem('id',data._id);
                    setMsg('');
                    navigation.navigate('home');
                }
            })
        }catch(err){
            console.log(err);
            setMsg(err.msg);
        };
    }

    const registerHandler = async() => {
        console.log(number,otp,name,date.getFullYear(),gender,state,city,image,about.length,password,cp,reff);
        if(verificationId!=''){
            const credential = await firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                otp
            );
            try{
            await firebase
                .auth()
                .signInWithCredential(credential)
                .then(async (res)=>{
                    if(password==cp){

                        if(about.length<=30){
                            Alert.alert(
                                "Error",
                                'Please write about in minimum 30 words!',
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                            )
                        }else{
                            const age = 2021-date.getFullYear();
                            if(age<18){
                                Alert.alert(
                                    "Under Age",
                                    'You need to be atleast 18 years old!',
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                                )
                            }else{
                                if(name==''||city==''||image==''){
                                    Alert.alert(
                                        "Error",
                                        'Please fill the details correctly!',
                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ]
                                    )
                                }else{
                                    const formData = new FormData();
                                    formData.append('name',name);
                                    formData.append('number',number);
                                    formData.append('birth',date);
                                    formData.append('age',age);
                                    formData.append('state',state);
                                    formData.append('city',city);
                                    formData.append("image", {
                                        name:number+'.jpg',
                                        uri:image,
                                        type:'image/jpg'
                                    });
                                    formData.append('about',about);
                                    formData.append('password',password);
                                    formData.append('admin',false);
                                    formData.append('gender',gender);
                                
                                    formData.append('profession',profession)

                                    await fetch('https://couple-dating-app.herokuapp.com/register',{
                                    method:'POST',
                                    mode:'cors',
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                       body:formData
                                    }) 
                                    .then(res=>res.json())
                                    .then(data=>{console.log(data);dispatch(setUser(data));navigation.navigate('home')})
                                    .catch((e)=>{
                                        console.log(e);
                                        setLogin(true);setRegister(false);setInvi(false);
                                        setMsg('Register done. Please login')
                                    })
                                    
                                }
                            }
                        }

                    }else{
                        Alert.alert(
                            "Password Mismatched!",
                            'Password and Confirm password Not matched!',
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                        )
                    }
                })
                .catch((err)=>{
                    if(err){
                        console.log('sign In error',err);
                        Alert.alert(
                            "Invalid Otp",
                            'Please enter the valid OTP!',
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                        )
                    }
                });
                }
                catch(e){
                    console.log('otp error',e);
                    Alert.alert(
                        "Invalid Otp",
                        'Please enter the valid OTP!',
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                    )
                }
        }else{
            Alert.alert(
                "Invalid Otp",
                'Please enter the valid OTP!',
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
            )
        }

    }

    const otpHandler = async () => {
        console.log('Otp Handler');
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
            `+91${number}`,
            // @ts-ignore
            recaptchaVerifier.current
        );
        setVerificationId(verificationId);
        console.log('vid',verificationId);
        setInvi(false);
    }

    const [loginb,setLogin] = useState(true);
    const [invi,setInvi] = useState(false);
    const [registerb,setRegister] = useState(false);

    const insets = useSafeAreaInsets();
    if(loaded){
        return (
            <View style={{paddingTop:insets.top,alignItems:'center',flex:1,backgroundColor:'#F4EDE5'}} >
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
                attemptInvisibleVerification={invi}
            />
            {loginb&&
            <View style={{marginTop:insets.top,backgroundColor:'#F4EDE5'}} >
                <View style={{flex:1,}} >
                    <Image 
                        source={login}
                        height='80%'
                        width='100%'
                        style={{
                            maxHeight:'80%',
                            maxWidth:'100%',
                            marginTop:insets.top
                        }}
                    />
                </View>
                <View style={{flex:1,padding:insets.top}} >
                   <Text style={{fontWeight:'700',fontSize:30,color:'gray'}} >Sign In</Text>
                   {msg!=''&&<Text style={{color:'#F2A241'}} >* {msg}</Text>}
                   <Text style={{color:'gray',margin:5,marginTop:14}} >Mobile Number</Text>
                   <View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center'}} >
                   <Text>+91 </Text>
                   <TextInput
                       placeholder="9876543210"
                       inlineImageLeft="search_icon"
                       keyboardType='decimal-pad'
                       style={{flex:1}}
                       value={number}
                       onChangeText={setNumber}

                   />
                   </View>
                   <Text style={{color:'gray',margin:5,marginTop:14}} >Password</Text>
                   <TextInput
                       style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10}}
                       placeholder="xxxxxxxxxxxx"
                       secureTextEntry
                       value={password}
                       onChangeText={setPassword}
                   />
                   <TouchableOpacity style={{alignSelf:'flex-end'}} ><Text style={{color:'#F2A241',fontWeight:'700',marginVertical:10}} >Forgot Password</Text></TouchableOpacity>
                   <TouchableOpacity onPress={()=>loginHandler()} style={{width:'100%',backgroundColor:'#F2A241',alignItems:'center',padding:15,borderRadius:10}} ><Text style={{color:'black'}}>Sign In</Text></TouchableOpacity>
                   <TouchableOpacity onPress={()=>{setLogin(false);setRegister(true);setInvi(true)}} style={{alignSelf:'center',marginTop:10}} ><Text style={{color:'gray'}} >Don't have an account? <Text style={{color:'#F2A241',fontWeight:'700'}} >Register</Text></Text></TouchableOpacity>
                </View>
            </View>}
            {registerb&&<View style={{flex:1}} >
                <View style={{width:100,height:100,alignSelf:'center',position:'absolute',top:40,zIndex:100,backgroundColor:'white',shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 5,borderRadius:10}} >
                    <Image
                       source={logo}
                       style={{width:100,height:100}} 
                    />
                </View>
                <View style={{flex:1,backgroundColor:'white',alignSelf:'stretch',width:screenWidth,marginTop:100,borderTopLeftRadius:40,borderTopRightRadius:40,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 5,paddingTop:50,paddingHorizontal:10}} >
                <ScrollView>
                   <View style={{flexDirection:'row',alignItems:'center'}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >Mobile Number</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><Text>+91 </Text><TextInput placeholder="9876543210" inlineImageLeft="search_icon" keyboardType='decimal-pad' style={{flex:1}} value={number} onChangeText={setNumber} /></View></View>
                   <TouchableOpacity onPress={()=>otpHandler()} style={{alignSelf:'flex-end',padding:5,backgroundColor:'#F2A241',margin:5,borderRadius:4}} ><Text style={{color:'white'}} >GET OTP</Text></TouchableOpacity>
                   <View style={{flexDirection:'row',alignItems:'center'}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >OTP</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><TextInput placeholder="XXX-XXX" inlineImageLeft="search_icon" keyboardType='decimal-pad' style={{flex:1}} value={otp} onChangeText={setOtp} /></View></View>
                   <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >My Name</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><TextInput placeholder="John Wick" inlineImageLeft="search_icon" textContentType='name'  style={{flex:1}} value={name} onChangeText={setName} /></View></View>
                   <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >My Profession</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><TextInput placeholder="Student / engineer / doctor" inlineImageLeft="search_icon"  style={{flex:1}} value={profession} onChangeText={setProfession} /></View></View>
                   <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >My Birthday</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><TouchableOpacity  style={{flexDirection:'row',alignItems:'center'}}  onPress={()=>setShow(true)} title="Show date picker!" ><Icon name="event"/><Text style={{marginHorizontal:10}} >{date.getDate()} - {date.getMonth()} - {date.getFullYear()}</Text></TouchableOpacity>{show&&<DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} display="default" onChange={onChange}/>}</View></View>
                   <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >My Gender</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} >{gender&&<TouchableOpacity onPress={()=>setGender(false)} style={{flexDirection:'row',alignItems:'center',flex:1}} ><FontAwesomeIcon color="#0400ff" style={{backgroundColor:'#7272ff',padding:12,margin:5,borderRadius:4}}  icon={ faMars } /><Text>Male</Text></TouchableOpacity>}{!gender&&<TouchableOpacity onPress={()=>setGender(true)} style={{flexDirection:'row',alignItems:'center',flex:1}} ><FontAwesomeIcon  color="#ff007f" style={{backgroundColor:'pink',padding:12,margin:5,borderRadius:4}}  icon={ faVenus } /><Text>Female</Text></TouchableOpacity>}</View></View>
                   <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >My State</Text><View style={{flex:2,borderWidth:1,borderColor:'gray',padding:0,borderRadius:10,flexDirection:'row',alignItems:'center',}} ><Picker
                      style={{flex:2}}
                      selectedValue={state}
                      onValueChange={setState}
                    >
                    {getStates('in').map(s=><Picker.Item value={s} label={s} />)}
                    </Picker></View></View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >My City</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><TextInput style={{flex:1}} placeholder="Your City" value={city} onChangeText={setCity} /></View></View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >Profile Photo</Text><TouchableOpacity onPress={()=>pickImage()}  style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><Icon name="photo"/><Text>{imagename.slice(0,17)}...</Text></TouchableOpacity></View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >About Me</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><TextInput style={{flex:1}} multiline={true} numberOfLines={5}  placeholder="Write something about you..." value={about} onChangeText={setAbout} /></View></View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >Create Password</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><TextInput style={{flex:1}} placeholder="Enter password" value={password} onChangeText={setPassword} /></View></View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >Confirm Password</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><TextInput style={{flex:1}} placeholder="Enter password again" secureTextEntry value={cp} onChangeText={setCp}  /></View></View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} ><Text style={{fontSize:13,fontWeight:'600',fontFamily: 'Montserrat',flex:1}} >Refferal Code</Text><View style={{borderWidth:1,borderColor:'gray',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center',flex:2,marginLeft:10}} ><TextInput style={{flex:1}} placeholder="Enter Code" value={reff} onChangeText={setReff}  /></View></View>
                    </ScrollView>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}><CheckBox value={true} color={'#F2A241'} style={{height:15,width:15}}  /><Text style={{marginHorizontal:5,fontSize:12,paddingHorizontal:5,color:'gray'}} >I hereby declare that the above information is true and best of my knowledge.</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}><CheckBox value={true} color={'#F2A241'} style={{height:15,width:15}}  /><Text style={{marginHorizontal:5,fontSize:12,paddingHorizontal:5,color:'gray'}} >I have read and agree to the <Text  style={{color:'blue'}}>Terms and Conditions</Text> and <Text style={{color:'blue'}}>Privacy Policy.</Text></Text></View>
                    <TouchableOpacity onPress={()=>registerHandler()} style={{width:'100%',backgroundColor:'#F2A241',alignItems:'center',padding:15,borderRadius:10,marginTop:5}} ><Text style={{color:'black'}}>Sign Up</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setLogin(true);setRegister(false);setInvi(false)}} style={{alignSelf:'center',marginVertical:10}} ><Text style={{color:'gray'}} >Already have an account? <Text style={{color:'#F2A241',fontWeight:'700'}} >Login Now</Text></Text></TouchableOpacity> 
                </View>
            </View>}
              
            </View>
        )
    }else{
        return <View></View>
    }
}


export default LoginScreen
