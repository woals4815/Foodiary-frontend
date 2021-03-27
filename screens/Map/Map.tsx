import React from "react";
import MapView from 'react-native-maps';
import styled from "styled-components/native";


const Container = styled.View`
    flex: 1;
`;

const Map = () => {
    return (
        <Container>
            <MapView 
                style={{
                    width: "100%",
                    height: "100%"
                }}
            />
        </Container>
    )
};

export default Map;