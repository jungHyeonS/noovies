import React, { useState } from 'react';

import {View,Text, ScrollView, FlatList, RefreshControl} from "react-native"
import { useQuery, useQueryClient } from 'react-query';
import { tvApi } from '../api';
import HList, { HListSeparator } from '../components/HList';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';

const Tv = () =>{ 

    const queryClinet = useQueryClient();
    const [refreshing,setRefreshing] = useState(false);
    const {isLoading:todayLoading,data:todayData,isRefetching:todayRefetching} = useQuery(["tv","today"],tvApi.airingToday)
    const {isLoading:topLoading,data:topData,isRefetching : topRefetching} = useQuery(["tv","top"],tvApi.topRate)
    const {isLoading:trendingLoading,data:trendingData,isRefetching:trendingRefetching} = useQuery(["tv","trending"],tvApi.getTrending)

    const onRefresh = async () => {
        setRefreshing(true);
        await queryClinet.refetchQueries(["tv"])
        setRefreshing(false)
    }
    const loading = todayLoading || topLoading || trendingLoading
    if(loading){
        return <Loader/>
    }
    return (
        <ScrollView 
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        contentContainerStyle={{paddingVertical:30}}>
            <HList title='Trending Tv' data={trendingData.results}/>
            <HList title='Airing Today' data={todayData.results}/>
            <HList title='Top Rate Tv' data={topData.results}/>
            
        </ScrollView>
    )
}

export default Tv