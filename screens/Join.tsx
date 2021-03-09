import { gql } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import JoinButton from "../components/Button";
import Input from "../components/Input";
import Password from "../components/Password";
import {useMutation} from "@apollo/client/react/hooks";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";
import { Alert } from "react-native";

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
}

const Container = styled.View`
    flex-direction: column;
    height: 100%;
    width:100%;
    align-items:center;
    padding-top: 100px;
    background-color: white;
`
const TextContainer = styled.View`
    width: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 8%;
    margin-bottom: 20px;
    border-radius: 20px
`
const Text = styled.Text`
    font-size: 36px;
    color: black;
    font-weight: 500;
`

export default ({navigation, route}: any) => {
    const {register, handleSubmit,watch, errors, setValue, getValues} = useForm<ICreateAccountFrom>({
        mode: 'onChange'
    });
    console.log(navigation);
    const onCompleted = (data: createAccountMutation) => {
        const {
            createAccount: 
            {
                ok, error
                
        }} =data;
        console.log(ok, error);
        if (ok){
            Alert.alert("Join Success!", " Let's log in 🚀");
            navigation.navigate({
                name: "Login"
            });
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
        <>
            <Container>
                <TextContainer>
                    <Text>Let's join!</Text>
                </TextContainer>
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
                <JoinButton 
                    title={"Join!"}
                    onPress={handleSubmit(onSubmit)}
                />
            </Container>
        </>
    )
}