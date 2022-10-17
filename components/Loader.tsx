import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Wapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Loader = () => <Wapper>
    <ActivityIndicator size="large"/>
</Wapper>

export default Loader;