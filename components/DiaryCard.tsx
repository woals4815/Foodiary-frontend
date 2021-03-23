import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Dimensions, ScrollView, TouchableOpacity } from "react-native";
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
import * as MediaLibrary from 'expo-media-library';
import axios from "axios";

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
    box-shadow: 0px 0px 5px gray;
`;
const DescriptionContainer = styled.View`
    height: ${HEIGHT/3}px;
    border-radius: 10px;
    margin: 10px 5px 10px 5px;
    background-color: white;
    box-shadow: 0px 0px 8px gray;
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

const NewImageContainer = styled.View``;

const Text = styled.Text``;

const DiaryCard = ({images, description, rating, publicOrNot, createdAt, diaryId,refreshFn, props}: any) => {
    const {navigation, route: {params}} = props;
    const [isEdit, setIsEdit] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [keyword, setKeyword] = useState<any>();
    const [AddImages, setAddImages] = useState([]);
    const { getValues, setValue, errors, handleSubmit, register } = useForm();
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
            setIsEditLoading(false);
            setIsEdit(false);
            Alert.alert("수정 완료");
            refreshFn();
        };
        setAddImages([]);
    };
    const editOnPress = () => {
        if (isEdit){
            params?.selectImages?.splice(0, params?.selectImages?.length);
            delete params?.diaryId;
            setIsEdit(false);
        }else {
            setIsEdit(true);
        };

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
            const bodyFormData = new FormData();
            let axiosData;
           if (AddImages && AddImages?.length > 0){ AddImages?.forEach((image: any) => bodyFormData.append('file', { uri: image.uri, name: image.filename, type: 'image/jpeg'}));
                if (AddImages.length + images?.length > 10){
                    params?.selectImages?.splice(0, params?.selectImages?.length);
                    delete params?.diaryId;
                    setAddImages([]);
                    setIsEdit(false);
                    Alert.alert("사진은 최대 10개까지 업로드 가능합니다.", '', [
                        {
                            text: "확인",
                            onPress: () => null
                        }
                    ]);
                }else {
                    setIsEditLoading(true);
                    const { data } = await axios("https://food-vicion-backend.herokuapp.com/uploads", {
                        method: 'post',
                        data: bodyFormData,
                        headers: {
                            'content-type': 'multipart/form-data',
                            },
                        });
                    axiosData=data;
                };
            };
            await editDiary({
                variables: {
                    editDiaryInput: {
                        diaryId,
                        description: description ?? keyword,
                        images: axiosData ?? [],
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
    const getAssetsPress = async() => {
        const result= await MediaLibrary.getAssetsAsync({first: 300});
        const paramsName = "DiaryCard";
        const {assets: images} = result;
        navigation.navigate("CameraRoll", {images, paramsName, diaryId});
    }
    useEffect(() => {
        register("description");
        if (params?.selectImages) {
            setAddImages(params?.selectImages);
        }
    }, [register, params?.selectImages]);
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
                              fontSize: 14,
                              paddingBottom: 2
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
                    <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 5, paddingVertical: 7}} showsHorizontalScrollIndicator={false}>
                        <>
                            {images.map((image:any, index: any) => (
                                <ImagePresenter 
                                  imageUri={image} 
                                  imageStyle={{width: WIDTH / 3, 
                                  height: WIDTH / 3, 
                                  marginRight: 15, 
                                  borderRadius: 10,
                                }} key={index} 
                                />
                            ))}
                            {AddImages?.length > 0 && params?.diaryId === diaryId ? AddImages?.map((image: any, index: any) =>
                                <NewImageContainer key={index}> 
                                     <DeleteButton 
                                        title={"⏤"}
                                        buttonStyle={{
                                            zIndex: 12,
                                            position: "absolute",
                                            left: -10,
                                            top: -5
                                        }}
                                        key={image.id}
                                        onPress={() => setAddImages(AddImages.filter((item) => item.id !== image.id))}
                                     />
                                    <ImagePresenter imageUri={image.uri} imageStyle={{width: WIDTH / 3, height: WIDTH / 3, marginRight: 15, borderRadius: 10}} key={index} />
                                </NewImageContainer>
                            ) :<></>}
                            {isEdit?
                            <TouchableOpacity onPress={getAssetsPress}>
                                <AddPhotoContainer>
                                    <Ionicons
                                        name={"add"}
                                        color={"gray"}
                                        size={50}
                                    />
                                </AddPhotoContainer>
                            </TouchableOpacity> : 
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
                {isEdit && !editLoading? 
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
                {editLoading || isEditLoading || loading && (<ActivityIndicator color="black" size="small" style={{position: "absolute", right: "48%", bottom: "1%" }}/>) }
                <DeleteButton
                    buttonStyle={{
                        width: "20%",
                        alignItems: "center",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                    }}
                    onPress={onPress} 
                    title={"Delete"}
                />
           </CardContainer>
    )
}

export default DiaryCard;