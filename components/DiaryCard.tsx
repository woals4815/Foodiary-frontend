import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Dimensions, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { formatDate } from "../utils";
import { deleteDiary, deleteDiaryVariables } from "../__generated__/deleteDiary";
import { editDiary, editDiaryVariables } from "../__generated__/editDiary";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import ImagePresenter from "./ImagePresenter";
import Input from "./Input";
import ScrollContainer from "./ScrollContainer";
import SubmitButton from "./SubmitButton";

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

const CardContainer = styled.View`
    height: ${HEIGHT/1.1}px;
    width: ${WIDTH}px;
    flex: 1;
`;
const ImageContainer = styled.View`
`;
const DescriptionContainer = styled.View`
    height: ${HEIGHT/3}px;
    border-radius: 10px;
    margin: 10px 5px 10px 5px;
    background-color: white;
    box-shadow: 0px 0px 2px gray;
`;

const DateContainer = styled.View`
    borderBottomWidth: 0.3px;
    padding: 10px 10px;
`;
const AddPhotoContainer = styled.View`
    width: ${WIDTH / 3}px;
    height: ${WIDTH / 3}px;
    border-radius: 10px;
    background-color: #D2E0EA;
    justify-content: center;
    align-items: center;
`;


const Text = styled.Text``;

const DiaryCard = ({images, description, rating, publicOrNot, createdAt, diaryId,refreshFn}: any) => {
    const [isEdit, setIsEdit] = useState(false);
    const [keyword, setKeyword] = useState<any>();
    const {getValues, setValue, errors, handleSubmit, register} = useForm();
    const onCompleted = (data: deleteDiary) => {
        const { deleteDiary: {
            ok, error
        }} = data;
        if (ok) {
            Alert.alert("삭제 완료", '', [
                {
                    text: "확인",
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
        try{    
            await editDiary({
                variables: {
                    editDiaryInput: {
                        diaryId,
                        description: description ?? keyword
                    }
                }
            });
        }catch(e) {
            console.log(e);
            Alert.alert("수정에 실패 했습니다.");
        }
    }
    const onPress = () => {
        Alert.alert("삭제 하시겠습니까?", "",[
            {
                text: "확인",
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
                text: "취소",
                onPress: () => null,
            }
        ])
    };
    useEffect(() => {
        register("description");
    }, [register]);
    if (loading){
        return (
            <ActivityIndicator size="large" color="black" />
        )
    }
    if (editLoading) {
        return (
            <ActivityIndicator size="large" color="black" />
        )
    }
    return (
           <CardContainer>
                <DateContainer>
                    <Text style={{fontSize: 30, fontWeight: "300"}}>{formatDate(createdAt)}</Text>
                </DateContainer>
                <DescriptionContainer>
                    <ScrollContainer contentContainerStyle={{
                        paddingHorizontal: 5, 
                        paddingVertical: 5, 
                        borderRadius: 10,
                    }}>
                        {!isEdit ? <Text>{description}</Text>: 
                        <Input 
                          defaultValue={description}
                          multiline={true}
                          inputStyle={{
                              height: "100%",
                              fontSize: 14
                          }}
                          onChange={(text: any) => {
                              setValue("description", text);
                              setKeyword(text);
                            }} 
                        />
                    }
                    </ScrollContainer>
                </DescriptionContainer>
                <ImageContainer>
                    <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 5}} showsHorizontalScrollIndicator={false}>
                        <>
                            {images.map((image:any, index: any) => (
                                <ImagePresenter imageUri={image} imageStyle={{width: WIDTH / 3, height: WIDTH / 3, marginRight: 10, borderRadius: 10}} ket={index} />
                            ))}
                            {isEdit? 
                            <AddPhotoContainer>
                                <Ionicons
                                    name={"add"}
                                    color={"gray"}
                                    size={50}
                                />
                            </AddPhotoContainer>: 
                            <></>}
                        </>
                    </ScrollView>
                </ImageContainer>
                <EditButton
                    title={isEdit ? "Cancel": "Edit"} 
                    buttonStyle={{
                        width: "20%",
                        alignItems: "center",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                    }}
                    onPress={editOnPress}
                />
                {isEdit? 
                    <SubmitButton 
                      title={"Submit"} 
                      buttonStyle={{
                          width: "20%",
                          position: "absolute",
                          alignItems: "center",
                          bottom: 0,
                          right: "40%"
                      }}
                      onPress={handleSubmit(editOnSubmit)}
                    /> 
                    : <></> 
                }
                <DeleteButton
                    buttonStyle={{
                        width: "20%",
                        alignItems: "center",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                    }}
                    onPress={onPress} 
                />
           </CardContainer>
    )
}

export default DiaryCard;