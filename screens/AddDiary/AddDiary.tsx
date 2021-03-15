import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  Alert, Dimensions, Platform, Switch, TouchableOpacity } from "react-native";
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

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 100%;
`;
const InputsContainer = styled.View`
    width: ${WIDTH / 1.2}px;
    height: ${HEIGHT/ 2}px;
    border-radius: 14px;
    margin-top: 60px;
    background-color: #94B5C0;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 4px #94B5C0;
`
const ImageContainer = styled.View`
    width: ${WIDTH/ 1.5}px;
    height: ${HEIGHT / 4}px;
`;

const Text = styled.Text`
    font-size: 20px;
`;
const ButtonContainer = styled.View`
    padding: 7px;
    background-color: blue;
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


export default (props: any) => {
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
        console.log(loading);
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
        <Container>
            <ScrollContainer>
                {images.length > 0 && (
                    <>
                        <ImageContainer>
                            <Swiper showsButtons={false}>
                                {images?.map((image: any, index: any) => (
                                    <ImagePresenter imageUri={image.uri} key={image.id} />
                                ))}
                            </Swiper>
                        </ImageContainer>
                    </>
                )}
                <TouchableOpacity onPress={onPress}>
                    <Text>Let's Image!</Text>
                </TouchableOpacity>
                {images.length > 0 && (
                    <TouchableOpacity onPress={deleteAllImage}>
                        <ButtonContainer>
                            <ButtonText>Delete All images</ButtonText>
                        </ButtonContainer>
                    </TouchableOpacity>
                )}
                <JoinButton 
                    title={"Create Diary!"}
                    onPress={handleSubmit(onSubmit)}
                />
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={5}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => {
                        setRangeValue(value);
                        setValue('rating',value);
                    }}
                    step={1}
                    value={rangeValue}
                />
                <Text>{rangeValue}</Text>
                <Switch 
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    ref={register}
                />
                <Input 
                    placeholder={"Write Description"} 
                    onChange={(text:string) => setValue('description', text)} 
                    inputStyle={{
                        height: "70%",
                        flexShrink: 1,
                    }}
                    multiline={true}
                />
                <TouchableOpacity onPress={() => navigation.navigate("MyDiary")}>
                    <Text>Go to My Diary</Text>
                </TouchableOpacity>
            </ScrollContainer>
        </Container>
    )
}