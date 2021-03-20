import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react/hooks";
import React from "react";
import { ActivityIndicator, Alert, Dimensions, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { formatDate } from "../utils";
import { deleteDiary, deleteDiaryVariables } from "../__generated__/deleteDiary";
import DeleteButton from "./DeleteButton";
import ImagePresenter from "./ImagePresenter";
import ScrollContainer from "./ScrollContainer";
const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const DELETE_DIARY_MUTATION = gql`
    mutation deleteDiary($deleteDiaryInput: DeleteDiaryInput!){
        deleteDiary(input: $deleteDiaryInput){
            error
            ok
        }
    }
`;

const Container = styled.View`
    height: ${HEIGHT}px;
    width: ${WIDTH}px;
`;
const ImageContainer = styled.View`
    background-color: rgba(0,0,0,0.1);
    height: ${HEIGHT/2}px;
`;
const DataContainer = styled.View`
    height: 50%;
    padding: 0px 5px;
`;
const DateContainer = styled.View`
    height: 8%;
    position: absolute;
    right: 5px;
    top: 5px;
`;
const DescriptionContainer = styled.View`
    height: 70%;
    padding: 20px 0px 0px 0px;

`;
const Label = styled.View`
    height: 10%;
    align-items: flex-start;
    justify-content: center;
`;

const Text = styled.Text``;

const DiaryCard = ({images, description, rating, publicOrNot, createdAt, diaryId,refreshFn}: any) => {
    const onCompleted = (data: deleteDiary) => {
        const { deleteDiary: {
            ok, error
        }} = data;
        if (ok) {
            Alert.alert("Deleted the Diary", '', [
                {
                    text: "Ok",
                    onPress: () => {
                        refreshFn();
                    }
                }
            ])
        }
    };
    const [deleteDiary, {data, error, loading}] = useMutation<deleteDiary, deleteDiaryVariables>(DELETE_DIARY_MUTATION, {
        onCompleted
    });
    const onPress = () => {
        Alert.alert("Delete Diary", "Are you sure?",[
            {
                text: "Delete",
                onPress: async() => {
                    try {
                        await deleteDiary({
                            variables: {
                                deleteDiaryInput: { diaryId }
                            }
                        })
                    }catch(error){
                        console.log(error);
                    }
                }
            },
            {
                text: "No",
                onPress: () => null,
            }
        ])
    }
    return (
        <Container>
            <ImageContainer>
              <Swiper
                showsButtons={true}
                paginationStyle={{
                    bottom: -20
                }}
              >
                {images.map((image: any, index: any) => (
                    <ImagePresenter 
                        imageUri={image}
                        resizeMode={"contain"}
                        key={index}
                    />
                ))}
              </Swiper>
            </ImageContainer>
            <DataContainer>
                <DateContainer>
                    <Text style={{fontWeight: "500"}}>{formatDate(createdAt)}</Text>
                </DateContainer>
                <DescriptionContainer>
                    <Label>
                        <Text>Description</Text>
                    </Label>
                    <ScrollContainer contentContainerStyle={{paddingVertical: 5, borderWidth: 0.3, paddingHorizontal: 5, borderRadius: 5}}>
                        <Text>
                            {description}
                        </Text>
                    </ScrollContainer>
                </DescriptionContainer>
                
            </DataContainer>
        </Container>
    )
}

export default DiaryCard;