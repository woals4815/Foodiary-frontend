import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";


const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Image = styled.Image`
    width: 100%;
    height: 100%;
`;

const ImagePresenter = ({imageUri, imageStyle, resizeMode}: any) => {
    return (
            <Image 
            source={{uri: imageUri}}
            resizeMethod="resize"
            resizeMode={resizeMode}
            style={{
                ...imageStyle
            }}
            />
    )
}

export default ImagePresenter;