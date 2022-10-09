import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text,View } from "react-native";
const Tab = createBottomTabNavigator();


const Tabs = () => (
    <Tab.Navigator >

        {/* screenOptions={{
            tabBarActiveTintColor:"red",
            tabBarInactiveTintColor:"purple",
            tabBarStyle: { backgroundColor:"tomato" },
        }} */}
        {/* options={{  
            headerTitleStyle:{color:"tomato"},
            headerRight:() => <View><Text>hello</Text></View>
        }} */}
        <Tab.Screen name="Movies" component={Movies} 
        />
        {/* options={{tabBarBadge:5}} */}
        {/* tabBarActiveTintColor */}
        <Tab.Screen name="Tv" component={Tv}  />
        <Tab.Screen name="Search" component={Search}/>
    </Tab.Navigator>
)


export default Tabs;