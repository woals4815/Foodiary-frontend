import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width: WIDTH , height: HEIGHT } = Dimensions.get("window");

const ListCardContainer = styled.View`
    height: ${HEIGHT /4}px;
    width: 100%;
    background-color: black;
    marginBottom: 5px;
    border-radius: 5px;
`;

const List = () => (
    <ListCardContainer></ListCardContainer>
);


export default List;