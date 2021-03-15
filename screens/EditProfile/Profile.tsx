import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    background-color: #94B5C0;
    height: ${HEIGHT}px;
    width: ${WIDTH}px;
`

const Profile = () => {

    return(
        <>
            <Container>
            </Container>
        </>
    )
};

export default Profile;