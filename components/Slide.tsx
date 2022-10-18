import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const View = styled.View`
    flex: 1;
`

const BgImg = styled.Image`
`



const Title = styled.Text<{isDark : boolean}>`
    font-size: 16px;
    font-weight: 600;
    color:${(props) => (props.isDark ? "white" : props.theme.textColor) };
`

const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`

const Overview = styled.Text<{isDark:boolean}>`
    color:${props => props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8"};
    margin-top: 10px;
`

const Votes = styled(Overview)`
    margin-top: 5px;
    font-size: 12px;
`

interface SlideProps {
    backdrop_path:string,
    poster_path:string,
    original_title:string,
    vote_average:number,
    overview:string
}


const Slide:React.FC<SlideProps> = ({backdrop_path,poster_path,original_title,vote_average,overview}) => {
    const isDark = useColorScheme() == "dark";
    const navgation = useNavigation();
    const goToDetail = () => {
        navgation.navigate("Stack",{screen:"Detail"})
    }
    return (
        <TouchableWithoutFeedback onPress={goToDetail}>
            <View>
                <BgImg style={StyleSheet.absoluteFill} source={{uri:makeImgPath(backdrop_path)}}/>
                <BlurView  
                tint={isDark ? "dark" : "light"}
                intensity={95}
                style={StyleSheet.absoluteFill}>
                    <Wrapper>
                        <Poster path={poster_path}/>
                        <Column>
                            <Title isDark={isDark}>{original_title}</Title>
                            {vote_average > 0 ? (<Votes isDark={isDark}>{vote_average}/10</Votes>) : null}
                            <Overview isDark={isDark}>{overview.slice(0,80)}...</Overview>
                        </Column>
                    </Wrapper>
                </BlurView>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default Slide