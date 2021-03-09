import React from "react";
import styled from "styled-components/native";


const Container = styled.View`
    height: 100%;
    width: 100%;
    background-color: white;
`

const Text = styled.Text`
    color: red;
    font-size: 30px;
`

export default () => {
    return (
        <Container>
            <Text>Login Screen</Text>
        </Container>
    )
}