import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Image, Text,useColorScheme,View } from 'react-native';
import * as Font from "expo-font"
import {Ionicons} from "@expo/vector-icons"
import { Asset, useAssets } from 'expo-asset';
import { NavigationContainer,DarkTheme,DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import Stack from './navigation/Stack';
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './styled';
import {QueryClient,QueryClientProvider} from "react-query"

const queryClient = new QueryClient();

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
  const isDark = useColorScheme() == "dark";
  if(!assets || !loaded){
    return (
      <AppLoading/>
     );
  }

  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Root/>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
    
    
  );
  
}


