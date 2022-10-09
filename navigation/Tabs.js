import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text,View ,useColorScheme} from "react-native";
import { BLACK_COLOR, DARK_GRAY_COLOR, GRAY_COLOR, WHITE_COLOR, YELLOW_COLOR } from "../colors";
import {Ionicons} from "@expo/vector-icons"
const Tab = createBottomTabNavigator();


const Tabs = () =>{
    const isDark = useColorScheme() == "dark";
    
    return (
        <Tab.Navigator screenOptions={{
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
        }}>

            {/* screenOptions={{
                tabBarActiveTintColor:"red",
                tabBarInactiveTintColor:"purple",
                tabBarStyle: { backgroundColor:"tomato" },
            }} */}
            {/* options={{  
                headerTitleStyle:{color:"tomato"},
                headerRight:() => <View><Text>hello</Text></View>
            }} */}

            {/* options={{tabBarBadge:5}} */}
            {/* tabBarActiveTintColor */}

            <Tab.Screen name="Movies" component={Movies} 
                options={{
                    tabBarIcon:({focused,color,size}) => {
                        return <Ionicons name={focused?"film":"film-outline"} size={size} color={color} />
                    }
                }}
            />
        
            <Tab.Screen name="Tv" component={Tv}  
                options={{
                    tabBarIcon:({focused,color,size}) => {
                        return <Ionicons name={focused?"tv":"tv-outline"} size={size} color={color} />
                    }
                }}
            />
            <Tab.Screen name="Search" component={Search}
                options={{
                    tabBarIcon:({focused,color,size}) => {
                        return <Ionicons name={focused?"search":"search-outline"} size={size} color={color} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}


export default Tabs;