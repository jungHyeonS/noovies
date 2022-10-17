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
import { moviesApi } from '../api';

// https://api.themoviedb.org/3/movie/now_playing?api_key=cec1dbc5f2281d2a147e666dc08b5e0f&language=en-US&page=1&region=KR



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

const VSeparator = styled.View`
    width: 20px;
`
const HSeparator = styled.View`
    height: 20px;
`

const {height : SCREEN_HEIGHT} = Dimensions.get("window");

const renderVMedia = ({item}) => (
    <VMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        voteAverage={item.vote_average}
    />
)

const renderHMedia = ({item}) => (
    <HMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        overview={item.overview}
        releaseDate={item.release_date}  
    />
)



const Movies:React.FC<NativeStackScreenProps<any,'Movies'>> = () => {
    const queryClient = useQueryClient();
    const {
        isLoading:nowPlayingLoading,
        data:nowPlayingData,
        isRefetching:isRefetchingNowPlaying
    } = useQuery(["movies","nowPlaying"],moviesApi.getNowPlaying)
    const {
        isLoading:upComingLoading,
        data:upComingData,
        isRefetching:isRefetchingUpComing
    } = useQuery(["movies","upComing"],moviesApi.getUpcoming)
    const {
        isLoading:trendingLoading,
        data:trendingData,
        isRefetching:isRefetchingTrending
    } = useQuery(["movies","trending"],moviesApi.getTrending)
    const onRefresh = async () => {
        queryClient.refetchQueries(["movies"]);
    };  

    const movieKeyExtractor = (item) => item.id+""
    const loading = nowPlayingLoading || upComingLoading || trendingLoading
    const refreshing =  isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpComing
    return loading ? 
    <Loader>
        <ActivityIndicator size="large"/>
    </Loader>
     : (
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
                        {nowPlayingData.results.map(movie => 
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
                            data={trendingData.results}
                            horizontal 
                            keyExtractor={movieKeyExtractor}
                            contentContainerStyle={{paddingHorizontal:30}}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <VSeparator/>}
                            renderItem={renderVMedia}
                        />
                    </ListContainer>
                    <CommingSoonTitle>Comming soon</CommingSoonTitle>
                </>
            }
            keyExtractor={movieKeyExtractor}
            ItemSeparatorComponent={() => <HSeparator/>}
            renderItem={renderHMedia}
        />
           
    )
}



export default Movies