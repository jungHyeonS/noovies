import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native' ;
import {Text,TouchableOpacity,StyleSheet,Dimensions, ActivityIndicator} from "react-native"
import {  NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-web-swiper';
import { makeImgPath } from '../utils';
import { BlurView} from "@react-native-community/blur";

// https://api.themoviedb.org/3/movie/now_playing?api_key=cec1dbc5f2281d2a147e666dc08b5e0f&language=en-US&page=1&region=KR

const API_KEY = "cec1dbc5f2281d2a147e666dc08b5e0f";


const Container = styled.ScrollView`
`

const View = styled.View`
    flex: 1;
`

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mainBgClolor};
`

const BgImg = styled.Image`
`

const Title = styled.Text`
    
`

const {height : SCREEN_HEIGHT} = Dimensions.get("window");

const Movies:React.FC<NativeStackScreenProps<any,'Movies'>> = () => {
    const [loading,setLoading] = useState(true);
    const [nowPlaying,setNowPlaying] = useState([])
    const getNoewPlaying = async () => {
        const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json();
        setNowPlaying(results);
        setLoading(false);
    }

    useEffect(()=>{
        getNoewPlaying();
    },[])
    return loading ? 
    <Loader>
        <ActivityIndicator size="large"/>
    </Loader>
     : (
        <Container>
            <Swiper loop={true} timeout={3.5} controlsEnabled={false} containerStyle={{width:"100%",height:SCREEN_HEIGHT / 4}}>
                {nowPlaying.map(movie => <View key={movie.id}>
                    <BgImg style={StyleSheet.absoluteFill} source={{uri:makeImgPath(movie.backdrop_path)}}/>
                    <BlurView  
                    blurAmount={1}
                    style={StyleSheet.absoluteFill}>
                        <Title>{movie.original_title}</Title>
                    </BlurView>
                </View>)}
            </Swiper>
        </Container>
    )
}



export default Movies