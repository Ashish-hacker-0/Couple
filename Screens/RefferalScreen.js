import React from 'react'
import { View, Text, Share, TouchableOpacity, Dimensions, Clipboard, Alert } from 'react-native'
import { Icon } from 'react-native-elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import { useSelector } from 'react-redux';
import { selectUser } from '../slices';
const height = Dimensions.get('window').height;
const RefferalScreen = ({navigation}) => {

    const insets = useSafeAreaInsets();

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'React Native | A framework for building native apps using React',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };

    const user = useSelector(selectUser);
    console.log(user);

    return (
        <View style={{flex:1}} >
            <View style={{paddingTop:insets.top,backgroundColor:'#131D23',padding:10,height:height/2.8,zIndex:100}} >
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon
                        name="chevron-left"
                        style={{
                            alignSelf:'baseline'
                        }}
                        color='white'
                    />
                </TouchableOpacity>
                <Text style={{color:'white',textAlign:'center',fontSize:28,fontWeight:'700',paddingHorizontal:40}} >Together, We're going further</Text>
                <View style={{backgroundColor:'#FF7379',position:'absolute',bottom:-30,alignItems:'center',width:'100%',alignSelf:'center',borderRadius:10,padding:10,zIndex:100}}>
                    <Text style={{fontSize:30,color:'white'}} >I refer now!</Text>
                    <Text style={{color:'white',paddingHorizontal:70,textAlign:'center'}}>Refer and introduce the club to your friends!</Text>
                    <View style={{flexDirection:'row',backgroundColor:'white',width:'100%',marginVertical:10,padding:10,alignItems:'center',borderRadius:10}} ><TouchableOpacity style={{flex:1}} onPress={()=>{Clipboard.setString(user.code);Alert.alert('Copied to clipboard!')}}><Text style={{color:'gray'}} >{user.code}</Text></TouchableOpacity><TouchableOpacity><Icon name="ios-share" onPress={()=>onShare()} color="gray" /></TouchableOpacity></View>
                </View>

            </View>
            <View style={{backgroundColor:'white',paddingTop:40,flex:1,zIndex:0,padding:20,justifyContent:'space-between'}} >
                <View>
                    <Text style={{textAlign:'center',fontWeight:'700'}} >Share your link</Text>
                    <TouchableOpacity onPress={()=>onShare()}  style={{flexDirection:'row',justifyContent:'center'}} ><Icon name="whatsapp" type="font-awesome" color="#01CC43" style={{margin:10}} /><Icon name="email" color="#D4443D" style={{margin:10}} /><Icon name="facebook" color="#0568D6" style={{margin:10}} /><Icon name="instagram" color="#C62FAC"  type="font-awesome" style={{margin:10}}/><Icon name="share" style={{margin:10}}/></TouchableOpacity>
                </View>
                <View>
                    <View style={{flexDirection:'row',alignItems:'center'}} >
                        <Text style={{fontWeight:'700'}} >How it works!</Text>
                        <Icon name="error-outline" size={15} style={{margin:5}}  />
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}} >
                        <Icon name="looks-one" size={30} style={{margin:10}}  />
                        <View>
                            <Text style={{fontWeight:'700'}} >Invite your friends</Text>
                            <Text style={{color:'gray',fontSize:10}} >Just share your link</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}} >
                        <Icon name="looks-two" size={30} style={{margin:10}}  />
                        <View>
                            <Text style={{fontWeight:'700'}} >They signup and enter your refferal</Text>
                            <Text style={{color:'gray',fontSize:10}} >Refferal code must be entered while registering.</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}} >
                        <Icon name="looks-3" size={30} style={{margin:10}}  />
                        <View>
                            <Text style={{fontWeight:'700'}} >You will get 10% of their spent amount</Text>
                            <Text style={{color:'gray',fontSize:10}} >Which you can use to take premium</Text>
                        </View>
                    </View>
                </View>
                <View style={{}} >
                    <Text style={{fontWeight:'700'}} >Thanks to you,</Text>
                    <Text style={{fontWeight:'700'}} >the community is growing</Text>
                </View>
            </View>
            
        </View>
    )
}

export default RefferalScreen
