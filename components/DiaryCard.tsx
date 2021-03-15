import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { cacheImages } from "../App";
import { formatDate } from "../utils";
import ImagePresenter from "./ImagePresenter";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");
const commonStyle = {
    "border-radius": "7px",
    "box-shadow": "0px 0px 4px gray",
    "backround-color-white": "#F6F5F5",
    "padding": "4px"
};

const Container = styled.View`
    flex: 1;
    align-items: center;
`;
const CardContainer = styled.View`
    width: ${WIDTH / 1.2}px;
    height: ${HEIGHT/ 1.3}px;
    border-radius: 14px;
    margin-top: 30px;
    background-color: #94B5C0;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 0px 4px #94B5C0;
`;
const ImageContainer = styled.View`
    width: ${WIDTH / 1.4}px;
    height: ${HEIGHT / 3.3}px;
    margin-top: 20px;
    margin-left: 7px;
    box-shadow: 0px 0px 4px black;
    border-radius: 7px;
`;
const DescriptionContainer = styled.View`
    width: ${WIDTH/ 1.4}px;
    height: ${HEIGHT / 4.5}px;
    margin-top: 20px;
    border-radius: ${commonStyle["border-radius"]};
    background-color: ${commonStyle["backround-color-white"]};
    box-shadow: ${commonStyle["box-shadow"]};
    padding: ${commonStyle.padding};
`;
const DescriptionTitleContainer = styled.View`
    height: 20px;
    width: ${WIDTH/ 4}px;
    background-color: gray;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;
const RatingContainer = styled.View`
    width: ${WIDTH / 1.4}px;
    height: ${HEIGHT / 30}px;
    border-radius: ${commonStyle["border-radius"]};
    background-color: ${commonStyle["backround-color-white"]};
    box-shadow: ${commonStyle["box-shadow"]};
    padding: ${commonStyle.padding};
    flex-direction: row;
    align-items: center;
`;
const RatingTitleContainer = styled.View`
    height: 20px;
    width: ${WIDTH/ 7}px;
    background-color: gray;
    justify-content: center;
    border-radius: 4px;
    align-items: center;
    margin-right: 7px;
`;
const PublicOrNotContainer = styled.View`
    width: ${WIDTH / 1.4}px;
    height: ${HEIGHT / 30}px;
    border-radius: ${commonStyle["border-radius"]};
    background-color: ${commonStyle["backround-color-white"]};
    box-shadow: ${commonStyle["box-shadow"]};
    flex-direction: row;
    align-items:center;
    padding: ${commonStyle.padding};
`;
const PublicTitleContainer = styled.View`
    height: 20px;
    width: ${WIDTH/ 7}px;
    background-color: gray;
    justify-content: center;
    border-radius: 4px;
    align-items: center;
    margin-right: 7px;
`;
const CreateDateContainer = styled.View`
    width: ${WIDTH / 1.4}px;
    height: ${HEIGHT / 30}px;
    border-radius: ${commonStyle["border-radius"]};
    background-color: ${commonStyle["backround-color-white"]};
    box-shadow: ${commonStyle["box-shadow"]};
    margin-bottom: 13px;
    flex-direction: row;
    align-items: center;
    padding: ${commonStyle.padding};
`;
const CreateDateTitleContainer = styled.View`
    height: 20px;
    width: ${WIDTH/ 4}px;
    background-color: gray;
    justify-content: center;
    border-radius: 4px;
    align-items: center;
    margin-right: 7px;
`;
const TitleText= styled.Text`
    font-size: 14px;
    font-weight: 700;
    color: white;
`;
const Text= styled.Text`
    font-size: 14px;
    font-weight: 500;
`;
const DiaryCard = ({images, description, rating, publicOrNot, createdAt}: any) => {
    return (
        <Container>
            <CardContainer>
                <ImageContainer>
                    <Swiper 
                    showsButtons={false} 
                    loop
                    paginationStyle={{
                        bottom: -25
                    }}
                    >
                        {images?.map((image: any, index: any): any => (
                            <ImagePresenter imageUri={image} key={index} />
                        ))}
                    </Swiper>
                </ImageContainer>
                <DescriptionContainer>
                    <DescriptionTitleContainer>
                        <TitleText>Description</TitleText>
                    </DescriptionTitleContainer>
                    <Text>{description}</Text>
                </DescriptionContainer>
                <RatingContainer>
                    <RatingTitleContainer>
                        <TitleText>Rating</TitleText>
                    </RatingTitleContainer>
                    <Text>{`${rating} / 5`}</Text>
                </RatingContainer>
                <PublicOrNotContainer>
                    <PublicTitleContainer>
                        <TitleText>Public</TitleText>
                    </PublicTitleContainer>
                    <Text>{`${publicOrNot}`}</Text>
                </PublicOrNotContainer>
                <CreateDateContainer>
                    <CreateDateTitleContainer>
                        <TitleText>Created date</TitleText>
                    </CreateDateTitleContainer>
                    <Text>{formatDate(createdAt)}</Text>
                </CreateDateContainer>
            </CardContainer>
        </Container>
    )
}

export default DiaryCard;