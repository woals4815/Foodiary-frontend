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
    margin-left: 10px;
    box-shadow: 0px 0px 3px gray;
`;

const DELETE_DIARY_MUTATION = gql`
    mutation deleteDiary($deleteDiaryInput: DeleteDiaryInput!){
        deleteDiary(input: $deleteDiaryInput){
            error
            ok
        }
    }
`;

const DeleteButton = ({buttonStyle, onPress}: any) => {
    return (
        <TouchableOpacity style={{...buttonStyle}} onPress={onPress}>
            <ButtonContainer>
                <Text>X</Text>
            </ButtonContainer>
        </TouchableOpacity>
    );
};

export default DeleteButton;