import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { formatDate, trimText } from "../utils";
import ImagePresenter from "./ImagePresenter";
import ScrollContainer from "./ScrollContainer";

const { width: WIDTH , height: HEIGHT } = Dimensions.get("window");

const ListCardContainer = styled.View`
    height: ${HEIGHT /4}px;
    width: 100%;
    marginBottom: 5px;
    border-radius: 5px;
    background-color: #EDEEF7;
    box-shadow: 0px 0px 7px gray;
    marginBottom: 20px;
    flex-direction: row;
    justify-content: space-between;
`;
const ImageContainer = styled.View`
    height: 70%;
    width: 40%;
    background-color: white;
    marginTop: 3%;
    marginLeft: 3%;
    border-radius: 4px;
    box-shadow: 0px 0px 8px gray;
`;

const DataContainer = styled.View`
    flex-direction: column;
    width: 55%;
    height: 100%;
`;

const DescriptionContainer = styled.View`
    height: 70%;
    width: 100%;
`;

const DateContainer = styled.View`
    width: 100%;
    height: 30%;
    justify-content: center;
`;
const Text = styled.Text`
    font-size: 27px;
    font-weight: 200;
`;
const DescriptionText = styled.Text`
    font-size: 11px;
`;

const List = ({diary, images, createdAt,description}: any) => (
    <ListCardContainer>
        <ImageContainer>
            <ImagePresenter imageUri={images[0]} imageStyle={{borderRadius: 4}} />
        </ImageContainer>
        <DataContainer>
            <DateContainer>
                <Text>{formatDate(createdAt)}</Text>
            </DateContainer>
            <ScrollContainer
                contentContainerStyle={{
                    paddingBottom: 5
                }}
            >
                <DescriptionText>{trimText(description, 400)}</DescriptionText>
            </ScrollContainer>
        </DataContainer>
    </ListCardContainer>
);


export default List;