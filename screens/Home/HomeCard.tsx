import React from "react";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import ImagePresenter from "../../components/ImagePresenter";
import { trimText } from "../../utils";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("screen");

const Container = styled.View`
    height: 100%;
    width: 100%;
    paddingHorizontal: 20px;
    background-color: white;
    paddingVertical: 20px;
    justify-content: space-between;
    border-radius: 15px;
    box-shadow: 0px 0px 8px gray;
`;
const ImageContainer = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    background-color: rgba(0,0,0,0.8);
    box-shadow: 0px 0px 10px gray;
`;
const ContentContainer = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    
    z-index: -1;
`;

const ContentTitleContainer = styled.View`
    background-color: white;
    width: 33%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
`;
const ContentLabelContainer = styled.View`
    width: 80%;
    height: 10%;
    background-color: gray;
    flex-direction: column;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 3px gray;
`;
const ContentDataContainer = styled.View`
    width: 67%;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    padding-right: 8px;
`;
const ContentDataContentsContainer = styled.View`
    flex: 1;
    width: 100%;
    background-color: white;
    borderBottomWidth: 1px;
    borderBottomColor: #FED048;
    marginVertical: 5px;
`;
const Text = styled.Text``;

const HomeCard = ({diary}: any) => {
    return (
        <Container>
            <ImageContainer>
                <Swiper
                    showsButtons={diary.images.length > 1 ? true : false}
                    loop
                    paginationStyle={{
                        zIndex: 13,
                        bottom: -15
                    }}
                    //버튼 스타일 바꿔야 함 
                >
                    {diary.images.map((image, index) => (
                        <ImagePresenter 
                            imageUri={image}
                            key={index}
                            resizeMode={"contain"}
                        />
                    ))}
                </Swiper>
            </ImageContainer>
            <ContentContainer>
              <ContentTitleContainer>
                  <ContentLabelContainer>
                      <Text
                        style={{
                            fontWeight: "500",
                            color: "#FED048",
                            fontSize: 10
                        }}
                      >Rating</Text>
                  </ContentLabelContainer>
                  <ContentLabelContainer>
                      <Text
                        style={{
                            fontWeight: "500",
                            color: "#FED048",
                            fontSize: 10
                        }}
                      >Description</Text>
                  </ContentLabelContainer>
                  {/* <ContentLabelContainer>
                      <Text
                      style={{
                        fontWeight: "500",
                        color: "#FED048",
                        fontSize: 10
                    }}
                    >Comments</Text>
                  </ContentLabelContainer> */}
                  <ContentLabelContainer>
                      <Text
                        style={{
                            fontWeight: "500",
                            color: "#FED048",
                            fontSize: 10
                        }}
                      >Creator</Text>
                  </ContentLabelContainer>
              </ContentTitleContainer>
              <ContentDataContainer>
                  <ContentDataContentsContainer
                    style={{
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}
                  >
                      <Text>{diary.rating} / 5</Text>
                  </ContentDataContentsContainer>
                  <ContentDataContentsContainer>
                      <Text>
                          {trimText(diary.description, 40)}
                      </Text>
                  </ContentDataContentsContainer>
                  {/* <ContentDataContentsContainer>
                      <Text>{diary.comments}</Text>
                  </ContentDataContentsContainer> */}
                  <ContentDataContentsContainer
                    style={{
                        justifyContent: "center"
                    }}
                  >
                      <Text>{diary.creator.name}</Text>
                  </ContentDataContentsContainer>
              </ContentDataContainer>
          </ContentContainer>
      </Container>  
    )
}

export default HomeCard;