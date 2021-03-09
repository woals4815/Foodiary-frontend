import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import Input from "../components/Input";
import JoinButton from "../components/Button";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import Password from "../components/Password";
import AsyncStorage from "@react-native-community/async-storage";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { authTokenVar, isLoggedInVar } from "../apollo";

const Container = styled.View`
    height: 100%;
    width: 100%;
    background-color: white;
`

const Text = styled.Text`
    color: red;
    font-size: 30px;
`
const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginIntput!) {
        login(input: $loginInput) {
            ok
            error
            token
        }
    }
`

export default () => {
    const {setValue, errors, register, handleSubmit, getValues} = useForm({
        mode: 'onChange'
    });
    
    const onCompleted = async(data: loginMutation) => {
        const {login: 
            { ok, token, error}
        } = data;
        console.log(ok, token);
        if (ok && token) {
            await AsyncStorage.setItem(LOCALSTORAGE_TOKEN, token);
            authTokenVar(token);
            isLoggedInVar(true);
        }
    }
    const [loginMutation, {data, loading, error}] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
        onCompleted
    });
    const onSubmit = async() => {
        const {email, password} = await getValues();
        if (!loading) {
            try {
                await loginMutation({
                    variables: {
                        loginInput: {
                            email,
                            password,
                        }
                    }
                });
            }catch(error){
                console.log(error);
            }
        }
        return;
    }
    useEffect(() => {
        register('email');
        register('password');
    }, [register]);
    return (
        <Container>
            <Text>Login Screen</Text>
            <Input
                    placeholder={"Email"}
                    onChange={(text: string) => {
                        setValue('email', text);
                    }}
            />
            <Password
                    placeholder={"Password"}
                    onChange={(text: string) => {
                        setValue('password', text);
                    }}
            />
            <JoinButton 
                    title={"Log in!"}
                    onPress={handleSubmit(onSubmit)}
                />
        </Container>
    )
}