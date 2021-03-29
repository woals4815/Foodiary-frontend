import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import Input from "../components/Input";
import JoinButton from "../components/Button";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import Password from "../components/Password";
import AsyncStorage from "@react-native-community/async-storage";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { ActivityIndicator, Dimensions, Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ScrollContainer from "../components/ScrollContainer";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex-direction: column;
    height: ${HEIGHT}px;
    width:${WIDTH}px;
    align-items:center;
    justify-content: space-around;
    background-color: #F9F3F3;
`
const TextContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    paddingVertical: 10px;
    paddingHorizontal: 80px;
    top: 20px;
`;
const InputsContainer = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT/1.2}px;
    background-color: #F9F3F3;
    justify-content: space-around;
    align-items: center;
`;
const InputContainer = styled.View`
    width: ${WIDTH / 1.5}px;
    height: ${HEIGHT / 3}px;
    justify-content: space-around;
`;
const Text = styled.Text`
    font-size: 25px;
    color: black;
    font-weight: 700;
`;
const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginIntput!) {
        login(input: $loginInput) {
            ok
            error
            token
        }
    }
`;

interface ILoginForm {
    email: string;
    password: string;
};

const Login =  () => {
    const {setValue, errors, register, handleSubmit, getValues, formState} = useForm<ILoginForm>({
        mode: 'onChange'
    });
    const [emailKeyword, setEmailKeyword] = useState<string>();
    const [passwordKeyword, setPasswordKeyword] = useState<string>();
    const onCompleted = async(data: loginMutation) => {
            try{
            const {
                login: 
                { ok, token, error}
            } = data;
            console.log(ok, token);
            if (ok && token) {
                await AsyncStorage.setItem(LOCALSTORAGE_TOKEN, token);
                authTokenVar(token);
                isLoggedInVar(true);
            }}catch(error){
                console.log(error);
            }
    };
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
                            email: emailKeyword ?? email,
                            password: passwordKeyword ?? password,
                        }
                    }
                });
            }catch(error){
                console.log(error);
            }
        }
        return;
    };
    useEffect(() => {
        register('email');
        register('password');
    }, [register]);
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {!loading ? 
                    <ScrollContainer>
                        <InputsContainer>
                            <TextContainer>
                                <Text>FooDiary</Text>
                            </TextContainer>
                            <InputContainer>
                                <Input
                                    placeholder={"Email"}
                                    onChange={(text: string) => {
                                        setValue('email', text);
                                        setEmailKeyword(text);
                                    }}
                                    register={register}
                                />
                                <Password
                                    placeholder={"Password"}
                                    onChange={(text: string) => {
                                        setValue('password', text);
                                        setPasswordKeyword(text);
                                    }}
                                    register={register}
                                />
                            </InputContainer>
                            <JoinButton 
                                title={"Log In"}
                                onPress={handleSubmit(onSubmit)}
                                buttonStyle={{
                                    backgroundColor: "#FED048",
                                    paddingHorizontal: 30,
                                    paddingVertical: 15,
                                    borderRadius: "8%",
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
                    </ScrollContainer>
                    :
                    <Container>
                        <ActivityIndicator color="black" size="large" />
                    </Container>    
                    }
        </TouchableWithoutFeedback>
    )
};

export default Login;
