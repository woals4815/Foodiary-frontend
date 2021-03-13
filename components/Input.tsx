import React from "react";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
    background-color: white;
    color: black;
    margin-bottom: 15px;
    width: 80%;
    borderBottomWidth : 1.5px;
    height: 5%;
    font-size: 20px;
` 

const Input = ({placeholder, onChange, inputStyle, multiline}: any) => (
    <TextInput 
        placeholder={placeholder}
        onChangeText={onChange}
        style={{
            ...inputStyle
        }}
        multiline={multiline}
    />
)

export default Input;
