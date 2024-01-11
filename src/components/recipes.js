import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';


export default function Recipes({categories, meals}) {
    const navigation = useNavigation();
  return (
    <View className={tw`mx-4 my-3`}>
      <Text style={{fontSize: hp(4)}} className={tw`font-semibold text-neutral-600`}>Recipes</Text>
      <View>
        {
            categories.length==0 || meals.length==0?(
                <Loading size="large" className={tw`mt-20`} />
            ): (
                <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
                    // refreshing={isLoadingNext}
                    // onRefresh={() => refetch({first: ITEM_CNT})}
                    onEndReachedThreshold={0.1}
                    // onEndReached={() => loadNext(ITEM_CNT)}
                />
            )
        }
            
      </View>
    </View>
  )
}

const RecipeCard = ({item, index, navigation})=>{
    let isEven = index%2==0;
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable
                style={{width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven?8:0}}
                className={tw`flex justify-center mb-4`}
                onPress={()=> navigation.navigate('RecipeDetail', {...item})}
            >
                {/* <Image 
                    source={{uri: item.strMealThumb}}
                    style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35}}
                    className="bg-black/5"
                /> */}
                <CachedImage
                    uri= {item.strMealThumb}
                    style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35}}
                    className={tw`bg-black/5`}
                />
                
                <Text style={{fontSize: hp(2)}} className={tw`font-semibold ml-2 text-neutral-600`}>
                    {
                        item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}