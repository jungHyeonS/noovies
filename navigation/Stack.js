import React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { Text, View,TouchableOpacity,Button, useColorScheme } from "react-native";
import { YELLOW_COLOR,BLACK_COLOR,WHITE_COLOR, GRAY_COLOR, DARK_GRAY_COLOR } from "../colors";
import Detail from "../screens/Detail";



const NativeStack = createNativeStackNavigator();

// screenOptions={{
//     headerBackTitle:"",
//     headerShown:true,
//     headerTintColor:YELLOW_COLOR,
//     presentation:"card",
//     animation:"flip"
// }}

const Stack = () => {
    const isDark = useColorScheme() === "dark"
    return (
        <NativeStack.Navigator 
        sceneContainerStyle={{
            backgroundColor : isDark ? BLACK_COLOR : WHITE_COLOR
        }}
        screenOptions={{
            unmountOnBlur:true,
            tabBarStyle:{
                backgroundColor : isDark ? BLACK_COLOR : WHITE_COLOR
            },
            tabBarActiveTintColor:isDark?YELLOW_COLOR:BLACK_COLOR,
            tabBarInactiveTintColor:isDark?GRAY_COLOR : DARK_GRAY_COLOR,
            headerStyle:{
                backgroundColor:isDark ? BLACK_COLOR : WHITE_COLOR,
            },
            headerTitleStyle:{
                color:isDark?WHITE_COLOR:BLACK_COLOR,
            },
            tabBarLabelStyle:{
                marginTop:10,
                fontSize:12,
                fontWeight:"600"
            }
        }}
        >
            <NativeStack.Screen name="Detail" component={Detail}/>
        </NativeStack.Navigator>
    )
}
export default Stack;