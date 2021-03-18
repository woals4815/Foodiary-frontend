import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  Alert, Dimensions, Keyboard, KeyboardAvoidingView, Platform, Switch, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import Input from "../../components/Input";
import { createDiaryMutation, createDiaryMutationVariables } from "../../__generated__/createDiaryMutation";
import * as MediaLibrary from 'expo-media-library';
import ImagePresenter from "../../components/ImagePresenter";
import JoinButton from "../../components/Button";
import axios from "axios";
import Slider from '@react-native-community/slider';
import ScrollContainer from "../../components/ScrollContainer";
import Swiper from "react-native-swiper";
import SearchInput from "../../components/SearchInput";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex-direction: column;
    align-items: center;
    background-color: white;
    flex: 1;
`;
const InputsContainer = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background-color: #94B5C0;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 4px #94B5C0;
    paddingHorizontal: 20px;
`
const ImageContainer = styled.View`
    width: 100%;
    height: ${HEIGHT / 2}px;
    padding-bottom: 30px;
`;
const DescriptionContainer = styled.View`
    height: ${HEIGHT/4}px;
    width: 100%;
    justify-content: center;
`;
const PublicContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const PublicTextContaier = styled.View`
    paddingVertical: 7px;
    paddingHorizontal: 10px;
    background-color: gray;
    border-radius: 50px;
`;
const PublicText = styled.Text`
    font-size: 12px;
    color: #FED048;
    font-weight: 700;
`;

const RangeContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
const RangeTextContainer = styled.View`
    paddingVertical: 7px;
    paddingHorizontal: 10px;
    background-color: gray;
    border-radius: 50px;
`;

const Text = styled.Text`
    font-size: 12px;
    color: #FED048;
    font-weight: 700;
`;
const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;
const ButtonText=styled.Text`
    font-size: 20px;
`;

const CREATE_DIARY_MUTATION = gql`
    mutation createDiaryMutation($createDiaryMutationInput: CreateDiaryInput!){
        createDiary(input: $createDiaryMutationInput) {
            ok
            error
            diaryId
        }
    }
`;


const AddDiary =  (props: any) => {
    // state 항목 관리
    const [images, setImages] = useState<any>([]);
    const [uploadImages, setUploadImages] = useState<any>([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [rangeValue, setRangeValue] = useState(3);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const {setValue, getValues, errors, register, handleSubmit} = useForm({
        mode: 'onChange'
    });
    let {
      navigation, route: { params } 
    } = props;
    //mutation을 마쳤을 때
    const onCompleted = (data: createDiaryMutation) => {
        console.log(data);
        const {
            createDiary: {
                ok, error, diaryId
            }
        } = data;
        if (ok) {
            Alert.alert("Create your FooDiary!", "Let's go to check 🚀", [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate({
                            name: 'MyDiary'
                        });
                    },
                },
            ]);
        }
        setValue("description", "");
        deleteAllImage();
    }
    //앨범 버튼 누른 순간
    const onPress = async() => {
        const result= await MediaLibrary.getAssetsAsync({first: 300});
        const {assets: images} = result;
        navigation.navigate("CameraRoll", {images});
    }
    //이미지 선택 항목 싹 지우기
    const deleteAllImage = () => {
        if (params?.selectImages.length > 0) {
            params?.selectImages.splice(0, params?.selectImages.length);
        }
        setImages([]);
    }
    //submit 버튼 누른 순간
    const [createDiaryMutation, {data, loading, error}] = useMutation<createDiaryMutation, createDiaryMutationVariables>(CREATE_DIARY_MUTATION, {
        onCompleted
    });
    const onSubmit = async() => {
        const bodyFormData = new FormData();
        images.forEach((image: any) => bodyFormData.append('file', { uri: image.uri, name: image.filename, type: 'image/jpeg'}));
        const {data} = await axios("https://food-vicion-backend.herokuapp.com/uploads", {
            method: 'post',
            data: bodyFormData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        setUploadImages([]);
        setUploadImages(data);
        const {description, rating} = getValues();
        if (!loading) {
            try {
                await createDiaryMutation({
                    variables: {
                        createDiaryMutationInput: {
                            description,
                            publicOrNot: isEnabled,
                            images: data,
                            rating
                        }
                    }
                });
            }catch(error){ 
                console.log(error);
            }
        }
        
    }
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
        if (params?.selectImages) {
            setImages(params?.selectImages);
        }
        register('description');
        register('rating');
    }, [params?.selectImages, images, register]);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 1
            }}
        >
            <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            >
            <ScrollContainer
              loading={loading}
              contentContainerStyle={{
                  height: HEIGHT,
                  width: WIDTH
              }}
            >
                <InputsContainer>
                    <ImageContainer>
                    {images.length > 0 && (
                        <>
                                <Swiper 
                                showsButtons={false} 
                                paginationStyle={{
                                    bottom: -25
                                }}
                                >
                                    {images?.map((image: any, index: any) => (
                                        <ImagePresenter 
                                            imageUri={image.uri} 
                                            key={image.id}  
                                            imageStyle={{
                                                height: HEIGHT / 2
                                            }}
                                        />
                                    ))}
                                </Swiper>
                        </>
                    )}
                    </ImageContainer>
                    <ButtonContainer>
                        <JoinButton 
                            title={"Add pictures"}
                            onPress={onPress}
                            buttonStyle={{
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                backgroundColor: "#FED048",
                                borderRadius: "8px",
                                shadowColor: "#FED048",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                shadowOpacity: 0.7,
                                marginBottom: "5%"
                            }}
                            textStyle={{
                                fontWeight: "300"
                            }}
                        />
                        {images.length > 0 && (
                            <JoinButton 
                            title={"Delete all"}
                            onPress={deleteAllImage}
                            buttonStyle={{
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                backgroundColor: "#FED048",
                                borderRadius: "8px",
                                shadowColor: "#FED048",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                shadowOpacity: 0.7
                            }}
                            textStyle={{
                                fontWeight: "300"
                            }}
                        />
                    )}
                    </ButtonContainer>
                    <DescriptionContainer>
                        <Input 
                            placeholder={"Write Description"} 
                            onChange={(text:string) => setValue('description', text)} 
                            inputStyle={{
                                height: "70%",
                                flexShrink: 1,
                                fontSize: 13
                            }}
                            multiline={true}
                        />
                    </DescriptionContainer>
                    <RangeContainer>
                        <RangeTextContainer>
                            <Text>Rating: {rangeValue}</Text>
                        </RangeTextContainer>
                        <Slider
                            style={
                                {width: 200, height: 40, alignSelf: "flex-start" }
                            }
                            minimumValue={0}
                            maximumValue={5}
                            minimumTrackTintColor="#FED048"
                            maximumTrackTintColor="#000000"
                            onValueChange={(value) => {
                                setRangeValue(value);
                                setValue('rating',value);
                            }}
                            step={1}
                            value={rangeValue}
                        />
                    </RangeContainer>
                    <PublicContainer>
                        <PublicTextContaier>
                            <PublicText>Public ? </PublicText>
                        </PublicTextContaier>
                        <Switch 
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            ref={register}
                        />
                    </PublicContainer>
                    <JoinButton 
                        title={"Create Diary!"}
                        onPress={handleSubmit(onSubmit)}
                        buttonStyle={{
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            backgroundColor: "#FED048",
                            borderRadius: "8px",
                            shadowColor: "#FED048",
                                shadowOffset: {
                                    width: 0,
                                    height: 1
                                },
                            shadowOpacity: 0.7,
                        }}
                        textStyle={{
                            fontWeight: "300"
                        }}
                    />
                </InputsContainer>
            </ScrollContainer>    
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    )
}

export default AddDiary;