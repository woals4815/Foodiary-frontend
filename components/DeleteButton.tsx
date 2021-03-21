import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { deleteDiary, deleteDiaryVariables } from "../__generated__/deleteDiary";

const Text=styled.Text`
    font-size: 13px;
    color: white;
`;
const ButtonContainer = styled.View`
    padding: 7px 10px;
    border-radius: 20px;
    background-color: red;
    box-shadow: 0px 0px 1px gray;
`;


const DeleteButton = ({buttonStyle, onPress}: any) => {
    return (
        <TouchableOpacity style={{...buttonStyle}} onPress={onPress}>
            <ButtonContainer>
                <Text>Delete</Text>
            </ButtonContainer>
        </TouchableOpacity>
    );
};

export default DeleteButton;