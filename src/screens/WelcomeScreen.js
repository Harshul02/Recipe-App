import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

export default function WelcomeScreen() {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(()=>{
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp('5')), 100);
        setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp('5.5')), 300);

        // setTimeout(()=> navigation.navigate('Home'), 2500)
    },[])
  return (
    <View style={tw`flex-1 justify-center items-center bg-amber-500`}>
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View className={tw`bg-white/20 rounded-full shadow`} style={{padding: ring2padding}}>
        <Animated.View className={tw`bg-white/20 rounded-full`} style={{padding: ring1padding}}>
            <Image source={require('../../assets/images/welcome.png')}
                style={{width: hp('20'), height: hp('20'), backgroundColor: "rgba(255,255,255, 0.2)", borderRadius: 100}} />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className={tw`flex items-center`}>
        <Text style={{fontSize: hp('7'), color: "white"}} className={tw`text-lg font-bold text-white tracking-widest flex`}>
            Foody
        </Text>
        <Text style={{fontSize: hp('2'), color: "white"}} className={tw`text-sm font-medium text-white tracking-widest`}>
            Food is always right
        </Text>
      </View>
    </View>
  )
}