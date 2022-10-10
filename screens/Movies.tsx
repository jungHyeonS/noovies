import React from 'react';
import styled from 'styled-components/native' ;
import {Text,TouchableOpacity,StyleSheet,Dimensions} from "react-native"
import {  NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-web-swiper';

// https://api.themoviedb.org/3/movie/now_playing?api_key=cec1dbc5f2281d2a147e666dc08b5e0f&language=en-US&page=1&region=KR

const API_KEY = "cec1dbc5f2281d2a147e666dc08b5e0f";


const Container = styled.ScrollView`
    background-color: ${props => props.theme.mainBgClolor};
`

const View = styled.View`
    flex: 1;
`

const {height : SCREEN_HEIGHT} = Dimensions.get("window");

const Movies:React.FC<NativeStackScreenProps<any,'Movies'>> = () => {
    const getNoewPlaying = () => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`);
    }

    return (
        <Container>
            <Swiper loop={true} timeout={3.5} controlsEnabled={false} containerStyle={{width:"100%",height:SCREEN_HEIGHT / 4}}>
                <View style={{backgroundColor:"red"}}></View>
                <View style={{backgroundColor:"blue"}}></View>
                <View style={{backgroundColor:"red"}}></View>
                <View style={{backgroundColor:"blue"}}></View>
            </Swiper>
        </Container>
    )
}



export default Movies