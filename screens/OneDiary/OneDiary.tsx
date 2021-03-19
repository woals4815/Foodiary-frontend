import React, { useState } from "react";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import JoinButton from "../../components/Button";
import ImagePresenter from "../../components/ImagePresenter";
import ScrollContainer from "../../components/ScrollContainer";


const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    height: ${HEIGHT}px;
`;
const ImageContainer = styled.View`
    height: ${HEIGHT /2}px;
    width: 100%;
    background-color: rgba(0,0,0,0.1);
    margin-bottom: 10px;
`;
const Text = styled.Text``;

const OneDiary = (props: any) => {
    const {navigation, route: { params: { diary } } } = props;
    const [isAbstract, setIsAbsctract] = useState(true);
    const [loading, setLoading] = useState(false);
    const refreshFn = () => {
        setLoading(true);
        setLoading(false);
    };
    const onPress = () => {
        if (isAbstract) {
            setIsAbsctract(false);
        } else {
            setIsAbsctract(true);
        }
    }
    return (
        <ScrollContainer
            refreshFn={refreshFn}
            loading={loading}
            contentContainerStyle={{
                paddingHorizontal: 10
            }}
        >
            <Container>
                <ImageContainer>
                    <Swiper
                        showsButtons={diary.images.length > 1 ? true: false}
                        paginationStyle={{
                            bottom: -25
                        }}
                    >
                    {diary.images.map((image: any, index: any) => (
                        <ImagePresenter 
                            imageUri={image}
                            resizeMode={"contain"}
                            key={index}
                        />
                    ))}
                    </Swiper>
                </ImageContainer>
                <JoinButton 
                title={isAbstract ? "See Details": "간략히"} 
                onPress={onPress}
                buttonStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: "#E3FBFF",
                    width: WIDTH/3.5,
                    borderRadius: 10,
                    shadowColor: "gray",
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowOpacity: 0.7,
                    alignItems: "center"
                }} 
                textStyle={{
                    fontSize: 10
                }}
                />
                {!isAbstract && (
                    <Text>{diary.description}</Text>
                )}
            </Container>
        </ScrollContainer>
    )
}

export default OneDiary;