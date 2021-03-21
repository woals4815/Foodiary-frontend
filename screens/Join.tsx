import { gql } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import JoinButton from "../components/Button";
import Input from "../components/Input";
import Password from "../components/Password";
import {useMutation} from "@apollo/client/react/hooks";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";
import { ActivityIndicator, Alert, Dimensions, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ScrollContainer from "../components/ScrollContainer";
import { Ionicons } from '@expo/vector-icons'; 

export const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            ok
            error
            userId
        }
    }
`;

interface ICreateAccountFrom {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    profilePic?: string;
};

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex-direction: column;
    height: ${HEIGHT}px;
    width:${WIDTH}px;
    align-items:center;
    justify-content: flex-start;
    background-color: #F9F3F3;
`;
const TextContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FED048;
    border-radius: 7px;
    paddingVertical: 10px;
    paddingHorizontal: 80px;
    top: 20px;
    box-shadow: 0px 2px 2px #FED048;
`;
const InputsContainer = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background-color: #F9F3F3;
    justify-content: space-around;
    align-items: center;
`;
const InputContainer = styled.View`
    width: ${WIDTH / 1.5}px;
    height: ${HEIGHT / 4}px;
    justify-content: space-between;
`;
const Text = styled.Text`
    font-size: 25px;
    color: black;
    font-weight: 700;
`;

const Join =  ({navigation, route}: any) => {
    const {register, handleSubmit,watch, errors, setValue, getValues} = useForm<ICreateAccountFrom>({
        mode: 'onChange'
    });
    const onCompleted = (data: createAccountMutation) => {
        const {
            createAccount: 
            {
                ok, error
                
        }} =data;
        console.log(ok, error);
        if (ok){
            Alert.alert("Join Success!", " Let's log in 🚀", [
                {
                    text: "Go to Log In",
                    onPress: () => {
                        navigation.navigate({
                            name: "Login"
                        });
                    },
                    
                },
                {
                    text: "Later",
                    onPress: () => {
                        return;
                    }
                }
            ]);
        }
    }
    const [createAccountMutation, {loading, data, error}] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
        onCompleted
    });
    const onSubmit = async() => {
        const {email, name, password, confirmPassword} =  await getValues();
            if (!loading){
                try{
                    await createAccountMutation({
                        variables: {
                            createAccountInput: {
                                email,
                                name,
                                password,
                                confirmPassword,
                            }
                        }
                    });
                 }catch(error){
                     console.log(error);
                 }
            }
    }
    useEffect(() => {
        register('email');
        register('password');
        register('confirmPassword');
        register('name');
    },[register]);
    return (
        <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollContainer>
                    {!loading ?<InputsContainer>
                        <TextContainer>
                            <Text>FooDiary 😋</Text>
                        </TextContainer>
                        <InputContainer>
                            <Input 
                                placeholder={"Email"}
                                onChange={(text: string) => {
                                    setValue('email', text);
                                }}
                            />
                            <Input 
                                placeholder={"Name"}
                                onChange={(text: string) => {
                                    setValue('name', text);
                                }}
                            />
                            <Password 
                                placeholder={"Password"}
                                onChange={(text: string) => {
                                    setValue('password', text);
                                }}
                            />
                            <Password 
                                placeholder={"Password for confirm"}
                                onChange={(text: string) => {
                                    setValue('confirmPassword', text);
                                }}
                            />
                        </InputContainer>
                        <JoinButton 
                            title={"Join"}
                            onPress={handleSubmit(onSubmit)}
                            buttonStyle={{
                                backgroundColor: "#FED048",
                                paddingHorizontal: 30,
                                paddingVertical: 15,
                                borderRadius: "8px",
                                shadowColor: "#FED048",
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                shadowOpacity: 0.7
                            }}
                            textStyle={{
                                fontWeight: "700"
                            }}
                        />
                    </InputsContainer>
                    :<ActivityIndicator color="black" size="large" style={{marginTop: "75%"}} />}
                </ScrollContainer>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

export default Join;