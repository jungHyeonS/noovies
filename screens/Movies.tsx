import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native' ;
import {Dimensions, ActivityIndicator, ScrollView, RefreshControl, FlatList,View,Text} from "react-native"
import {  NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import Poster from '../components/Poster';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { QueryClient, useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
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
    const [refreshing,setRefreshing] = useState(false);
    const {
        isLoading:nowPlayingLoading,
        data:nowPlayingData,
        isRefetching:isRefetchingNowPlaying
    } = useQuery<MovieResponse>(["movies","nowPlaying"],moviesApi.getNowPlaying)
    const {
        isLoading:upComingLoading,
        data:upComingData,
        isRefetching:isRefetchingUpComing,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery<MovieResponse>(["movies","upComing"],moviesApi.getUpcoming,{
        getNextPageParam:(currentPage) => {
            const nextPage = currentPage.page + 1;
            return nextPage > currentPage.total_pages ? null : nextPage;
        }
    })
    const {
        isLoading:trendingLoading,
        data:trendingData,
        isRefetching:isRefetchingTrending
    } = useQuery<MovieResponse>(["movies","trending"],moviesApi.getTrending)
    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["movies"]);
        setRefreshing(false);
    };  

    const loading = nowPlayingLoading || upComingLoading || trendingLoading
    const loadMore = () => {
        if(hasNextPage){
            fetchNextPage()
        }
    }
    console.log(upComingData)
    // console.log(Object.values(nowPlayingData.results[0]).map(v => typeof v));
    return loading ? 
    <Loader/>
     : (

        upComingData ? 
        <FlatList
            data={upComingData.pages.map(page => page.results).flat()}
            refreshing={refreshing} 
            onRefresh={onRefresh}
            // onEndReachedThreshold={0.4}
            onEndReached={loadMore}
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
                                fullData={movie}
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
                    fullData={item}
                />
            )}
        /> : null
           
    ) 
}



export default Movies