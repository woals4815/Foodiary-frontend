import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";


const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const container = styled.View``;

const SearchText = styled.TextInput`
  background-color: white;
  padding: 10px 20px;
  border-radius: 15px;
`;

const SearchInput = ({placeholder, value, onChange, onSubmit, inputStyle}: any) => {
    return (
        <SearchText 
            onChangeText={onChange}
            placeholder={placeholder}
            value={value}
            onSubmitEditing={onSubmit}
            returnKeyType={"search"}
            style={{
                ...inputStyle
            }}
        />
    );
}

export default SearchInput;