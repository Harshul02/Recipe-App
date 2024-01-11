import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {categoryData} from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';
import tw from 'twrnc';

export default function Categories({categories, activeCategory, handleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=""
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            categories.map((cat, index)=>{
                let isActive = cat.strCategory==activeCategory;
                let activeButtonClass = isActive? ' bg-amber-400': ' bg-black/10';
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={()=> handleChangeCategory(cat.strCategory)}
                        className={tw`flex items-center`}
                    >
                        <View className={tw`rounded-full p-[6px]  ${activeButtonClass}`}>
                            {/* <Image
                                source={{uri: cat.strCategoryThumb}}
                                style={{width: hp(6), height: hp(6)}}
                                className="rounded-full"
                            /> */}
                            <CachedImage
                                uri={cat.strCategoryThumb}
                                style={{width: hp(6), height: hp(6)}}
                                className={tw`rounded-full`}
                            />
                        </View>
                        <Text className={`text-neutral-600`} style={{fontSize: hp('1.6')}}>
                            {cat.strCategory}
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </Animated.View>
  )
}