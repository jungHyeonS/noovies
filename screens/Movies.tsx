import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native' ;
import {Dimensions, ActivityIndicator} from "react-native"
import {  NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';

// https://api.themoviedb.org/3/movie/now_playing?api_key=cec1dbc5f2281d2a147e666dc08b5e0f&language=en-US&page=1&region=KR

const API_KEY = "cec1dbc5f2281d2a147e666dc08b5e0f";


const Container = styled.ScrollView`
`


const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mainBgClolor};
`


const {height : SCREEN_HEIGHT} = Dimensions.get("window");

const Movies:React.FC<NativeStackScreenProps<any,'Movies'>> = () => {
    
    const [loading,setLoading] = useState(true);
    const [nowPlaying,setNowPlaying] = useState([])
    const [upcoming,setUpcoming] = useState([])
    const [trending,setTrending] = useState([]);
    const getTrending = async() => {
        const {results} = await (await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json();
        setTrending(results);
    }
    const getUpcoming = async() => {
        const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json();
        setUpcoming(results);
    }
    const getNoewPlaying = async () => {
        const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json();
        setNowPlaying(results);
        
    }

    const getData = async () => {
        await Promise.all([getTrending(),getUpcoming(),getNoewPlaying()])
        setLoading(false);
    }

    useEffect(()=>{
        getData();
    },[])
    return loading ? 
    <Loader>
        <ActivityIndicator size="large"/>
    </Loader>
     : (
        <Container>
            <Swiper
            horizontal
            loop={true} 
            autoplay 
            autoplayTimeout={3.5} 
            showsPagination={false} 
            showsButtons={false} 
            containerStyle={{width:"100%",height:SCREEN_HEIGHT / 4}}>
                {nowPlaying.map(movie => 
                    <Slide 
                        key={movie.id}
                        backdrop_path={movie.backdrop_path}
                        poster_path={movie.poster_path}
                        original_title={movie.original_title}
                        vote_average={movie.vote_average}
                        overview={movie.overview}
                    />
                )}
            </Swiper>
        </Container>
    )
}



export default Movies