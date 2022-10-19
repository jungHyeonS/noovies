import React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { Text, View,TouchableOpacity,Button, useColorScheme } from "react-native";
import { YELLOW_COLOR,BLACK_COLOR,WHITE_COLOR } from "../colors";
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
        <NativeStack.Navigator screenOptions={{
            headerBackTitleVisible:false,
            headerStyle:{
                backgroundColor:isDark ? BLACK_COLOR:"white"
            },
            headerTitleStyle:{
                color:isDark?WHITE_COLOR:BLACK_COLOR,
            },
        }}>
            <NativeStack.Screen name="Detail" component={Detail}/>
        </NativeStack.Navigator>
    )
}
export default Stack;