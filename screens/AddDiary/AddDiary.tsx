import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Dimensions, Platform, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Input from "../../components/Input";
import { createDiaryMutation, createDiaryMutationVariables } from "../../__generated__/createDiaryMutation";
import * as MediaLibrary from 'expo-media-library';



const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;
const ImageContainer = styled.View`
    flex: 1;
    flex-direction: row;
    flexWrap: wrap;
`
const Image = styled.Image`
    width: ${WIDTH / 3}px;
    height: ${WIDTH / 3}px;
`;

const Text = styled.Text`
    font-size: 20px;
`;
const ButtonContainer = styled.View`
    padding: 7px;
    background-color: blue;
`
const ButtonText=styled.Text`
    font-size: 20px;
`

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
    const [images, setImages] = useState<any>([]);
    const {
      navigation, route: { params } 
    } = props;
    const onCompleted = () => {
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
    }, [params?.selectImages]);
    const onPress = async() => {
        const result= await MediaLibrary.getAssetsAsync();
        const {assets: images} = result;
        navigation.navigate("CameraRoll", {images});
    }
    const deleteAllImage = () => {
        setImages([]);
    }
    console.log(images);
    const {setValue, getValues, errors, register, handleSubmit} = useForm();
    const [createDiaryMutation, {data, loading, error}] = useMutation<createDiaryMutation, createDiaryMutationVariables>(CREATE_DIARY_MUTATION);
    return (
            <Container>
                <TouchableOpacity onPress={onPress}>
                    <Text>Let's Image!</Text>
                </TouchableOpacity>
                <ImageContainer>
                    {images && (
                        images.map((image, index) => <Image source={{uri: image}} key={index} />)
                    )}
                </ImageContainer>
                {images.length > 0 && (
                    <TouchableOpacity onPress={deleteAllImage}>
                        <ButtonContainer>
                            <ButtonText>Delete All images</ButtonText>
                        </ButtonContainer>
                    </TouchableOpacity>
                )}
            </Container>
    )
}