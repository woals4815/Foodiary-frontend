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
    background-color: #FED048;
    paddingVertical: 20px;
    justify-content: space-between;
    border-radius: 15px;
`;
const ImageContainer = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    background-color: rgba(0,0,0,0.8);
    box-shadow: 0px 0px 3px black;
`;
const ContentContainer = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0px 0px 3px gray;
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
    height: 15%;
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
                    showsButtons={true}
                    loop
                    //버튼 스타일 바꿔야 함 
                >
                    <ImagePresenter
                        imageUri={"https://vicion-food.s3.ap-northeast-2.amazonaws.com/1615634367465IMG_0814.HEIC"}
                    />
                    <ImagePresenter
                        imageUri={"https://vicion-food.s3.ap-northeast-2.amazonaws.com/1615634367465IMG_0814.HEIC"}
                    />
                </Swiper>
            </ImageContainer>
            <ContentContainer>
              <ContentTitleContainer>
                  <ContentLabelContainer>
                      <Text
                        style={{
                            fontWeight: "700",
                            color: "#FED048"
                        }}
                      >Rating</Text>
                  </ContentLabelContainer>
                  <ContentLabelContainer>
                      <Text
                        style={{
                            fontWeight: "700",
                            color: "#FED048",
                            fontSize: 12
                        }}
                      >Description</Text>
                  </ContentLabelContainer>
                  <ContentLabelContainer>
                      <Text
                      style={{
                        fontWeight: "700",
                        color: "#FED048",
                        fontSize: 12
                    }}
                    >Comments</Text>
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
                          {trimText(diary.description, 100)}
                      </Text>
                  </ContentDataContentsContainer>
                  <ContentDataContentsContainer>
                      <Text>hi</Text>
                  </ContentDataContentsContainer>
              </ContentDataContainer>
          </ContentContainer>
      </Container>  
    )
}

export default HomeCard;