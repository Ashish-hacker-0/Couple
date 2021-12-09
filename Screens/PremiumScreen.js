import { useFonts } from 'expo-font';
import React, { useState } from 'react'
import { View, Text, Touchable, TouchableOpacity, Image , Dimensions} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {premium} from '../constants/image';
const width = Dimensions.get('window').width;
const PremiumScreen = ({navigation,route}) => {

    const [loaded] = useFonts({
        Montserrat: require('../assets/fonts/Montserrat.ttf'),
    });

    const [selected,setSelected] = useState(0);

    const insets = useSafeAreaInsets();

    console.log(route);

    if(loaded){

    return (
        <View style={{flex:1,alignItems:'center'}} >
           <View style={{flexDirection:'row',paddingTop:insets.top,justifyContent:'space-between',alignItems:'center',padding:15,width:width}} >
              <TouchableOpacity style={{paddingVertical:10}} onPress={()=>navigation.goBack()} >
               <Icon
                   name="arrow-back"
                   color={'white'}
               />
               </TouchableOpacity>
               <Text style={{fontFamily:'Montserrat',fontSize:19,fontWeight:'700',fontFamily:'Montserrat',color:'white'}} >Couple <Text style={{fontWeight:'500',fontFamily:'Montserrat'}} >Premium</Text></Text>
               <Text></Text>
           </View>
           <View style={{position:'absolute',zIndex:-10}} >
               <Image
                   source={premium}
                   style={{
                       height:200,
                       width:width
                   }}
                   
               />
           </View>
           <View style={{flex:1,backgroundColor:'white',borderTopEndRadius:350,borderTopLeftRadius:350,width:width*2,marginTop:40,alignItems:'center'}} >
           <Text style={{marginTop:20,fontWeight:'700'}} >{route.params?.msg}.</Text>
              <View style={{flexDirection:'row',flexWrap:'wrap',width:width,justifyContent:'space-around',marginTop:20}} >
                  <TouchableOpacity onPress={()=>setSelected(0)} style={{borderWidth:selected==0?5:2,borderColor:selected==0?'#01C9E3':'gray',width:width/2.2,marginBottom:10,borderRadius:10,overflow:'hidden'}} >
                    <Text style={{backgroundColor:'#272C3D',color:'white',textAlign:'center',fontWeight:'700',padding:10}} >FREE - {`\u20B9`} 0</Text>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 10 Swipes a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 5 Likes a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 2 Mesaages a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 5 Reply a day</Text></View>
                    <Text style={{padding:5,fontWeight:'700'}} >* Price as low as breathing air.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setSelected(1)} style={{borderWidth:selected==1?5:2,borderColor:selected==1?'#01C9E3':'gray',width:width/2.2,borderRadius:10,marginBottom:10,overflow:'hidden'}}>
                    <Text style={{backgroundColor:'#272C3D',color:'white',textAlign:'center',fontWeight:'700',padding:10}} >Basic - {`\u20B9`}99/m.</Text>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > Unlimited Swipes a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 20 Likes a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 10 Mesaages a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 20 Reply a day</Text></View>
                    <Text style={{padding:5,fontWeight:'700',fontSize:12}} >* Price as low as gifting a rose to your Couple.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setSelected(2)} style={{borderWidth:selected==2?5:2,borderColor:selected==2?'#01C9E3':'gray',width:width/2.2,borderRadius:10,overflow:'hidden'}}>
                    <Text style={{backgroundColor:'#272C3D',color:'white',textAlign:'center',fontWeight:'700',padding:10}} >PREMIUM - {`\u20B9`}199/m.</Text>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > Unlimited Swipes a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 30 Likes a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 20 Mesaages a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 40 Reply a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 5 Images sharing</Text></View>
                    <Text style={{padding:5,fontWeight:'700',fontSize:12}} >* Price as low as giving chocolate to your girlfriend.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setSelected(3)} style={{borderWidth:selected==3?5:2,borderColor:selected==3?'#01C9E3':'gray',width:width/2.2,borderRadius:10,overflow:'hidden'}}>
                    <Text style={{backgroundColor:'#272C3D',color:'white',textAlign:'center',fontWeight:'700',padding:10}} >ADVANCED - {`\u20B9`}249/m.</Text>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > Unlimited Swipes a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 35 Likes a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 25 Mesaages a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 45 Reply a day</Text></View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:5}} ><View style={{height:5,width:5,borderRadius:2,backgroundColor:'#272C3D'}} ></View><Text style={{color:'#272C3D'}} > 10 Images Sharing</Text></View>
                    <Text style={{padding:5,fontWeight:'700'}} >* Price as low as a coffee date.</Text>
                  </TouchableOpacity>
              </View>
              <Text style={{width:width,padding:10,fontWeight:'700'}} >*After taking on premium plan, You can upgrade to another by paying the roundOff price.  </Text>
              <Text style={{fontSize:10}} >RoundOff price = Actual Price - ((Your Plan Value)/30)*(No. of Days used)</Text>
              <TouchableOpacity style={{backgroundColor:'#01C9E3',width:width/1.2,padding:10,borderRadius:20,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 5,marginTop:10}} ><Text style={{color:'white',fontSize:20,textAlign:'center'}} >Continue</Text></TouchableOpacity>
           </View>
        </View>
    )
    }else{
        return(
            <View>

            </View>
        )
    }
}

export default PremiumScreen
