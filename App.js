import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Image, Text } from 'react-native';
import * as Font from "expo-font"
import {Ionicons} from "@expo/vector-icons"
import { Asset, useAssets } from 'expo-asset';


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
  // const [ready,setReady] = useState(false);

  // const onFinish = () => setReady(true);
  // const startLoading = async() => {
  //   const fonts = loadFonts([Ionicons.font])
  //   const assets = loadImages([require("./images.png"),"http://cogly.net/rainbow.png"])
  //   await Promise.all([...fonts,...assets])
  // } 
  if(!assets || !loaded){
    return (
      <AppLoading/>
      // <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.log('abc')}/>
     );
  }
  return <Text>We are done l1oading</Text>;
  
}


