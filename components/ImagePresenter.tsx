import { Asset } from "expo-asset";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import ScrollContainer from "./ScrollContainer";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
    width: 100%;
    height: 100%;
`

const Image = styled.Image`
    width: 100%;
    height: 100%;
`;

const ImagePresenter = ({imageUri, imageStyle}: any) => {

    return (
            <Image 
            source={{uri: imageUri}}
            resizeMethod="resize" 
            style={{
                ...imageStyle
            }}
            />
    )
}

export default ImagePresenter;