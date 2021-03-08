import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import JoinButton from "../components/Button";
import Input from "../components/Input";
import Password from "../components/Password";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";


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

export default () => {
    const {register, handleSubmit, watch, errors, setValue} = useForm<ICreateAccountFrom>({
        mode: 'onChange'
    });
    const onSubmit = (data: createAccountMutation) => {
        
    }
    const onCompleted = (data: createAccountMutation) => {
        const {createAccount: 
            {ok
        }} =data;
        if (ok){
            console.log("It's workkkkkkk!!!");
        }
    }
    const [createAccountMutation, {loading, data}] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
        onCompleted
    });
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