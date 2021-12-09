import React from 'react'
import { View, Text, Image } from 'react-native'
import { Icon } from 'react-native-elements';
import {contact} from '../constants/image';
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const ContactScreen = () => {

    const insets = useSafeAreaInsets();

    return (
        <View style={{paddingTop:insets.top,flex:1,backgroundColor:'white'}} >
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon
                   name="chevron-left"
                />
                <Text style={{flex:1,textAlign:'center',fontSize:20,fontWeight:'700'}} >Request Help</Text>
            </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image
                    source={contact}
                    style={{
                        height:300,
                        width:300
                    }}
                />   
                <Text style={{fontSize:20,fontWeight:'700'}} >How can we help you?</Text>    
                <Text style={{padding:20,textAlign:'center'}} >It looks like you are having some problem with our sign up process or something else.</Text>         
                <Text>Please let to know us at :- coupledept@gmail.com</Text>
            </View>
        </View>
    )
}

export default ContactScreen;
