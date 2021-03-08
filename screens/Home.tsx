import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    background-color: white;
    height: 100%;
    width: 100%;
`


export default () => {
    return (
        <Container>
            <Text>Hiiiiii</Text>
        </Container>
    )
}