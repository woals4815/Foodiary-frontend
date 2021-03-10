import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

const Button = styled.View`
    padding: 7px 10px;
    background-color: blue;
    border-radius: 3px;
`
const ButtonText = styled.Text`
  color: white;
`;


const JoinButton = ({title, onPress}: any) => (
    <TouchableOpacity onPress={onPress}>
        <Button>
            <ButtonText>{title}</ButtonText>
        </Button>
    </TouchableOpacity>
)

export default JoinButton;