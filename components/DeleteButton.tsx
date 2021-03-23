import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";


const Text=styled.Text`
    font-size: 13px;
    color: white;
`;
const ButtonContainer = styled.View`
    padding: 7px 7px;
    border-radius: 20px;
    background-color: #E40117;
    box-shadow: 0px 0px 1px gray;
`;


const DeleteButton = ({buttonStyle, onPress, title,textStyle, containerStyle}: any) => {
    return (
        <TouchableOpacity style={{...buttonStyle}} onPress={onPress}>
            <ButtonContainer style={{...containerStyle}}>
                <Text style={{...textStyle}}>{title}</Text>
            </ButtonContainer>
        </TouchableOpacity>
    );
};

export default DeleteButton;