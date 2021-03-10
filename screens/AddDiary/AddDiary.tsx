import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Image, Platform, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Input from "../../components/Input";
import { createDiaryMutation, createDiaryMutationVariables } from "../../__generated__/createDiaryMutation";
import * as MediaLibrary from 'expo-media-library';


const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Text = styled.Text`
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

export default () => {
    const [image, setImage] = useState<any>()
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
      }, []);
    const onPress = async() => {
        
    }
    const {setValue, getValues, errors, register, handleSubmit} = useForm();
    const [createDiaryMutation, {data, loading, error}] = useMutation<createDiaryMutation, createDiaryMutationVariables>(CREATE_DIARY_MUTATION);
    
    return (
            <Container>
                {/* <Text>Add Diary Screen</Text>
                <Input placeholder={"Description"} onChange={(text: string) => {
                            setValue('password', text);
                }}/> */}
                <TouchableOpacity onPress={onPress}>
                    <Text>Let's Image!</Text>
                </TouchableOpacity>
            </Container>
    )
}