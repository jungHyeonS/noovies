import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native' ;
import {Dimensions, ActivityIndicator, ScrollView, RefreshControl, FlatList,View,Text} from "react-native"
import {  NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import Poster from '../components/Poster';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';

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


const ListTitle = styled.Text`
    color:white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`

const TrendingSroll = styled.FlatList`
    margin-top: 20px;
`

const ListContainer = styled.View`
    margin-bottom: 40px;
`


const CommingSoonTitle = styled(ListTitle)`
    margin-bottom: 10px;
`

const {height : SCREEN_HEIGHT} = Dimensions.get("window");

const Movies:React.FC<NativeStackScreenProps<any,'Movies'>> = () => {
    const [refreshing,setRefershing] = useState(false);
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
    const onRefresh = async () => {
        setRefershing(true);
        await getData();
        setRefershing(false);
    };  

    return loading ? 
    <Loader>
        <ActivityIndicator size="large"/>
    </Loader>
     : (
        <FlatList
            data={upcoming}
            refreshing={refreshing} 
            onRefresh={onRefresh}
            ListHeaderComponent={
                <>
                    <Swiper
                    horizontal
                    loop={true} 
                    autoplay 
                    autoplayTimeout={3.5} 
                    showsPagination={false} 
                    showsButtons={false} 
                    containerStyle={{marginBottom:30, width:"100%",height:SCREEN_HEIGHT / 4}}
                    >
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
                    <ListContainer>
                        <ListTitle>Trending Movies</ListTitle>
                        <TrendingSroll
                            data={trending}
                            horizontal 
                            keyExtractor={(item) => item.id+""}
                            contentContainerStyle={{paddingHorizontal:30}}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{width:30}}/>}
                            renderItem={({item}) => (
                                <VMedia
                                    posterPath={item.poster_path}
                                    originalTitle={item.original_title}
                                    voteAverage={item.vote_average}
                                />
                            )}
                        />
                    </ListContainer>
                    <CommingSoonTitle>Comming soon</CommingSoonTitle>
                </>
                
            }

            keyExtractor={(item) => item.id+""}
            ItemSeparatorComponent={() => <View style={{height:20}}/>}
            renderItem={({item}) => (
                <HMedia
                    posterPath={item.poster_path}
                    originalTitle={item.original_title}
                    overview={item.overview}
                    releaseDate={item.release_date}  
                />
            )}
        />
           
    )
}



export default Movies