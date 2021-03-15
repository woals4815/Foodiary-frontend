import React, { useState } from "react";
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

const Input = ({placeholder, onChange, inputStyle, multiline}: any) => {
   const [isFocused, setIsFocused] = useState(false);
   return( <TextInput 
        placeholder={placeholder}
        onChangeText={onChange}
        style={isFocused? {borderColor: "#FED048", ...inputStyle } : {
            ...inputStyle
        }}
        multiline={multiline}
        onFocus={(event) => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
    />)
}

export default Input;
