import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { Transition } from "react-native-reanimated";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
    background-color: transparent;
    color: black;
    margin-bottom: 15px;
    width: 80%;
    borderBottomWidth : 1.5px;
    height: 5%;
    font-size: 20px;
    margin-top: 25px;
    border-color: gray;
` 

const Password = ({placeholder, onChange, focused, inputStyle}: any) => {
    const [isFocused, setIsFocused] = useState(false);
    return(
        <TextInput 
            placeholder={placeholder}
            onChangeText={onChange}
            secureTextEntry={true}
            style={isFocused? {borderColor: "#FED048", ...inputStyle } : {
                ...inputStyle
            }}
            onFocus={(event) => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    )
}

export default Password;
