import { View, Text, ScrollView, Image, TextInput, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
import tw from 'twrnc';


export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory = category=>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async ()=>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      // console.log('got categories: ',response.data);
      if(response && response.data){
        setCategories(response.data.categories);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  const getRecipes = async (category="Beef")=>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log('got recipes: ',response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar/>
    <View className={tw`flex-1 bg-white`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className={tw`pt-14`}
      >
        {/* avatar and bell icon */}
        <View className={tw`mx-4 flex-row justify-between items-center mb-2`} style={{marginLeft: 5}}>
          <Image source={require('../../assets/images/avatar.png')} style={{height: hp(5), width: hp(5.5)}} />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings and punchline */}
        <View className={tw`mx-4 mb-2`} style={{marginLeft: 6}}>
          <Text style={{fontSize: hp(1.7), color: "rgb(82 82 82)"}} className={tw`text-neutral-600`}>Hello, Harshul!</Text>
          <View>
            <Text style={{fontSize: hp(3.8), color: "rgb(82 82 82)"}} className={tw`font-semibold text-neutral-600`}>Make your own food,</Text>
          </View>
          <Text style={{fontSize: hp(3.8), color: "rgb(82 82 82)"}} className={tw`font-semibold text-neutral-600`}>
            stay at <Text className={tw`text-amber-400`} style={{color: "rgb(251 191 36)"}}>home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className={tw`mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]`} style={{ marginLeft: 5, flex: 1, flexDirection: "row", marginTop: 3, marginBottom: 4 }}>
  <View className={tw`bg-white rounded-full p-3`}>
    <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
  </View>
  <TextInput
    placeholder='Search any recipe'
    placeholderTextColor={'gray'}
    style={{ fontSize: hp(1.7), marginLeft: 5 }} // Added marginLeft to create space between the icon and text
    className={tw`text-base mb-1 pl-3 tracking-wider flex-1`}
  />
</View>

        {/* categories */}
        <View style={{marginTop: 4}}>
          { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  )
}