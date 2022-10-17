import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native' ;
import {Dimensions, ActivityIndicator, ScrollView, RefreshControl, FlatList,View,Text} from "react-native"
import {  NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import Poster from '../components/Poster';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { Movie, MovieResponse, moviesApi } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';

// https://api.themoviedb.org/3/movie/now_playing?api_key=cec1dbc5f2281d2a147e666dc08b5e0f&language=en-US&page=1&region=KR



const Container = styled.ScrollView`
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

const VSeparator = styled.View`
    width: 20px;
`
const HSeparator = styled.View`
    height: 20px;
`

const {height : SCREEN_HEIGHT} = Dimensions.get("window");






const Movies:React.FC<NativeStackScreenProps<any,'Movies'>> = () => {
    const queryClient = useQueryClient();
    const {
        isLoading:nowPlayingLoading,
        data:nowPlayingData,
        isRefetching:isRefetchingNowPlaying
    } = useQuery<MovieResponse>(["movies","nowPlaying"],moviesApi.getNowPlaying)
    const {
        isLoading:upComingLoading,
        data:upComingData,
        isRefetching:isRefetchingUpComing
    } = useQuery<MovieResponse>(["movies","upComing"],moviesApi.getUpcoming)
    const {
        isLoading:trendingLoading,
        data:trendingData,
        isRefetching:isRefetchingTrending
    } = useQuery<MovieResponse>(["movies","trending"],moviesApi.getTrending)
    const onRefresh = async () => {
        queryClient.refetchQueries(["movies"]);
    };  

    const loading = nowPlayingLoading || upComingLoading || trendingLoading
    const refreshing =  isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpComing
    // console.log(Object.values(nowPlayingData.results[0]).map(v => typeof v));
    return loading ? 
    <Loader/>
     : (

        upComingData ? 
        <FlatList
            data={upComingData.results}
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
                        {nowPlayingData?.results.map(movie => 
                            <Slide 
                                key={movie.id}
                                backdrop_path={movie.backdrop_path || ""}
                                poster_path={movie.poster_path || ""}
                                original_title={movie.original_title}
                                vote_average={movie.vote_average}
                                overview={movie.overview}
                            />
                        )}
                    </Swiper>
                    {trendingData ? <HList title='Trending Movies' data={trendingData?.results}/> : null}
                    <CommingSoonTitle>Comming soon</CommingSoonTitle>
                </>
            }
            keyExtractor={(item) => item.id + ""}
            ItemSeparatorComponent={() => <HSeparator/>}
            renderItem={({item}) => (
                <HMedia
                    posterPath={item.poster_path || ""}
                    originalTitle={item.original_title}
                    overview={item.overview}
                    releaseDate={item.release_date}  
                />
            )}
        /> : null
           
    ) 
}



export default Movies