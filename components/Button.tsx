import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

const Button = styled.View`
`
const ButtonText = styled.Text`
  color: black;
`;


const JoinButton = ({title, onPress, buttonStyle, textStyle}: any) => (
    <TouchableOpacity onPress={onPress}>
        <Button style={{...buttonStyle}}>
            <ButtonText style={{...textStyle}}>{title}</ButtonText>
        </Button>
    </TouchableOpacity>
)

export default JoinButton;