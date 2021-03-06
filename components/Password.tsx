import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
    background-color: transparent;
    color: black;
    borderBottomWidth : 1px;
    font-size: 20px;
    border-color: gray;
`
const View = styled.View`
    width: 100%;
` 

const Password = ({placeholder, onChange, focused, inputStyle}: any) => {
    const [isFocused, setIsFocused] = useState(false);
    return(
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <View>
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
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Password;
