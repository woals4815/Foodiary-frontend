import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
    background-color: transparent;
    color: black;
    borderBottomWidth : 1.5px;
    font-size: 20px;
    border-color: gray;
`
const View = styled.View`
    width: 100%;
`; 

const Input = ({placeholder, onChange, inputStyle, multiline, defaultValue}: any) => {
   const [isFocused, setIsFocused] = useState(false);
   return( 
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <View>
                <TextInput 
                placeholder={placeholder}
                onChangeText={onChange}
                style={isFocused? {borderColor: "#FED048", ...inputStyle } : {
                    ...inputStyle,
                }}
                multiline={multiline}
                onFocus={(event) => setIsFocused(true)}
                onBlur={() => {
                    setIsFocused(false);
                }}
                defaultValue={defaultValue}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Input;
