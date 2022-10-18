import React, { useState } from 'react';
import styled from 'styled-components/native';
import {View,Text, Alert} from "react-native"
import { useQuery } from 'react-query';
import { moviesApi, tvApi } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';

const Container = styled.ScrollView``;


const SearchBar = styled.TextInput`
    background-color: white;
    padding: 5px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
    margin-bottom: 30px;
`;
// placeholder="Search fro Movie of tv Show"
                // placeholderTextColor="grey"
const Search = () => {
    const [query,setQuery] = useState("");
    const {isLoading:loadingMovie,data:moviesData,refetch:searchMovie} = useQuery(["searchMovie",query],moviesApi.search,{enabled:false})
    const {isLoading:loadingTv,data:tvData,refetch:searchTv} = useQuery(["searchMovie",query],tvApi.search,{enabled:false})

    const onChangeText = (text:string)  => {
        setQuery(text)
    }
    const onSubmit = () => {
        if(query === ""){
            return;
        }
        searchMovie()
        searchTv();
    }
    return (
        <Container>
            <SearchBar 
                placeholder="Search fro Movie of tv Show" 
                placeholderTextColor="grey"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
            {loadingMovie || loadingTv ? <Loader/> : null}
            {
                moviesData ? 
                <HList
                    title="Movie Results"
                    data={moviesData.results}
                /> : null
            }

            {
                tvData ? 
                <HList
                    title="Tv Results"
                    data={tvData.results}
                /> : null
            }
        </Container>
    )
}

export default Search