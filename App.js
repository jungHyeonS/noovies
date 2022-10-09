import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Image, Text,View } from 'react-native';
import * as Font from "expo-font"
import {Ionicons} from "@expo/vector-icons"
import { Asset, useAssets } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';


// const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font))

// const loadImages = (images) => images.map(image => {
//   if(typeof image == "string"){
//     Image.prefetch(image)
//   }else{
//     Asset.loadAsync(image)
//   }
// })

export default function App() {

  const [assets] = useAssets([require("./images.png")])
  const [loaded] = Font.useFonts(Ionicons.font);
  if(!assets || !loaded){
    return (
      <AppLoading/>
     );
  }
  return (
     <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  );
  
}


