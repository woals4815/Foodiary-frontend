import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";


const Text=styled.Text`
    font-size: 13px;
    color: white;
`;
const ButtonContainer = styled.View`
    padding: 7px 10px;
    border-radius: 20px;
    background-color: #9FD7DF;
    box-shadow: 0px 0px 1px gray;
`;


const EditButton = ({buttonStyle, onPress, title}: any) => {
    return (
        <TouchableOpacity style={{...buttonStyle}} onPress={onPress}>
            <ButtonContainer>
                <Text>{title}</Text>
            </ButtonContainer>
        </TouchableOpacity>
    );
};

export default EditButton;