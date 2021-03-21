import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { formatDate } from "../utils";
import { deleteDiary, deleteDiaryVariables } from "../__generated__/deleteDiary";
import { editDiary, editDiaryVariables } from "../__generated__/editDiary";
import DeleteButton from "./DeleteButton";
import ImagePresenter from "./ImagePresenter";
import Input from "./Input";
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
const EDIT_DIARY_MUTATION = gql`
    mutation editDiary($editDiaryInput: EditDiaryInput!) {
        editDiary(input: $editDiaryInput){
            ok
            error
        }
    }
`;

const Container = styled.View`
    height: ${HEIGHT}px;
    width: ${WIDTH}px;
`;
const ImageContainer = styled.View`
    background-color: #F9F3F3;
    height: ${HEIGHT/2}px;
    marginBottom: 5px;
`;
const DataContainer = styled.View`
    height: 50%;
    padding: 0px 10px;
`;
const DateContainer = styled.View`
    paddingHorizontal: 5px;
    borderBottomWidth: 0.3px;
    marginBottom: 20px;
    paddingBottom: 10px;
`;
const RateContainer = styled.View`
    height: 5%;
    width: 25%;
    padding: 0px 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 0px 1px gray;
`;
const DescriptionContainer = styled.View`
    height: 70%;
    padding: 20px 5px 0px 5px;
`;
const Label = styled.View`
    height: 10%;
    align-items: center;
    justify-content: center;
    marginTop: 5px;
`;
const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const Text = styled.Text``;

const DiaryCard = ({images, description, rating, publicOrNot, createdAt, diaryId,refreshFn}: any) => {
    const [isEdit, setIsEdit] = useState(false);
    const {getValues, setValue, errors, handleSubmit, register} = useForm();
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
    const editOnCompleted = async(data: editDiary) => {
        const {editDiary: {
            ok, error
        }} = data;
        if (ok) {
            setIsEdit(false);
            Alert.alert("수정 완료");
            await refreshFn();
        };
    };
    const editOnPress = () => {
        if (isEdit){
            setIsEdit(false);
        }else {
            setIsEdit(true);
        }
    }
    const [deleteDiary, {data, error, loading}] = useMutation<deleteDiary, deleteDiaryVariables>(DELETE_DIARY_MUTATION, {
        onCompleted
    });
    const [editDiary, {data: editData, error: editError, loading: editLoading}] = useMutation<editDiary, editDiaryVariables>(EDIT_DIARY_MUTATION, {
        onCompleted: editOnCompleted,
    });
    const editOnSubmit = async() => {
        const { description } = getValues();
        try{    await editDiary({
                variables: {
                    editDiaryInput: {
                        diaryId,
                        description
                    }
                }
            })
        }catch(e) {
            console.log(e);
            Alert.alert("수정에 실패 했습니다.");
        }
    }
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
    };
    useEffect(() => {
        register("description");
    }, [register]);
    return (
        <Container>
            <DateContainer>
                <Text style={{fontWeight: "200", fontSize: 25}}>{formatDate(createdAt)}</Text>
            </DateContainer>
            <ImageContainer>
              <Swiper
                showsButtons={false}
                paginationStyle={{
                    bottom: -15
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
                <RateContainer>
                    <Text style={{fontSize: 10}}>{"⭐️".repeat(rating)}</Text>
                </RateContainer>
                    <DescriptionContainer>
                    <ButtonContainer>
                        <TouchableOpacity 
                            style={{
                                paddingVertical: 7, 
                                paddingHorizontal: 10, 
                                borderRadius: 20, 
                                backgroundColor: "#FED048",
                                shadowColor: "gray",
                                shadowOffset: {
                                    width: 0,
                                    height: 1
                                },
                                shadowOpacity: 0.5,
                            }}
                            onPress={editOnPress}
                        >
                            <Text>{isEdit? "Cancel": "Edit"}</Text>
                        </TouchableOpacity>
                        <DeleteButton 
                        onPress={onPress}
                        />
                    </ButtonContainer>
                    <Label>
                        <Text>이 날의 맛집 일기</Text>
                    </Label>
                    <ScrollContainer 
                        contentContainerStyle={{
                            paddingVertical: 5, 
                            paddingHorizontal: 5, 
                            borderRadius: 5, 
                            backgroundColor: "white",
                            }}
                    >
                        {!isEdit ?
                        (
                        <Text>
                            {description}
                        </Text>
                        ): <Input
                          defaultValue={description}
                          multiline={true}
                          inputStyle={{
                              fontSize: 16,
                          }}
                          onChange={(text: any) => setValue("description", text)}
                          
                        />
                        }
                    </ScrollContainer>
                    {isEdit ?  
                        <TouchableOpacity 
                            style={{
                                marginTop: 10, 
                                backgroundColor: "#FED048",
                                paddingVertical: 7, 
                                paddingHorizontal: 10, 
                                borderRadius: 20, 
                                shadowColor: "gray",
                                shadowOffset: {
                                    width: 0,
                                    height: 1
                                },
                                shadowOpacity: 0.5,
                                justifyContent: "center",
                                alignItems: "center"
                                }}
                            onPress={editOnSubmit}
                        >
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    : <></>}
                </DescriptionContainer>
            </DataContainer>
        </Container>
    )
}

export default DiaryCard;