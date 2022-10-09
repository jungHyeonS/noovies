import React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { Text, View,TouchableOpacity,Button } from "react-native";
import { YELLOW_COLOR } from "../colors";

const ScreenOne = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={() => navigate("Two",{})}>
        <Text>go to tow</Text>
    </TouchableOpacity>
)
const ScreenTwo = () => (
    // onPress={() => navigate("Three")}
    // {navigation : {navigate}}
    <TouchableOpacity>
        <Text>go to three</Text>
    </TouchableOpacity>
)
const ScreenThree = ({navigation : {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Tabs",{screen:"Search"})}>
        <Text>Change Title</Text>
    </TouchableOpacity>
)



const NativeStack = createNativeStackNavigator();

const Stack = () => {
    return (
        <NativeStack.Navigator screenOptions={{
            headerBackTitle:"",
            headerShown:true,
            headerTintColor:YELLOW_COLOR,
            presentation:"card",
            animation:"flip"
        }}>
            <NativeStack.Screen name="One" component={ScreenOne}/>
            <NativeStack.Screen name="Two" component={ScreenTwo}/>
            <NativeStack.Screen name="Three" component={ScreenThree}/>
        </NativeStack.Navigator>
    )
}
export default Stack;