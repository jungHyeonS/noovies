import React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { Text, View,TouchableOpacity,Button } from "react-native";
import { YELLOW_COLOR } from "../colors";
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
    return (
        <NativeStack.Navigator >
            <NativeStack.Screen name="Detail" component={Detail}/>
        </NativeStack.Navigator>
    )
}
export default Stack;