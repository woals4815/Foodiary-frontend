import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";


const ButtonContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255, 0.3);
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`;
const Text = styled.Text`
    font-size: 9px;
`;

const MoreButton = ({onPress, buttonStyle, textStyle}: any) => (
    <TouchableOpacity style={{width: 40, height: 20}} onPress={onPress}>
        <ButtonContainer style={{...buttonStyle}}>
                <Text style={{...textStyle}}>더 보기</Text>
        </ButtonContainer>
    </TouchableOpacity>
)

export default MoreButton;