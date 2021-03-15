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
import { Dimensions, Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex-direction: column;
    height: ${HEIGHT}px;
    width:${WIDTH}px;
    align-items:center;
    justify-content: flex-start;
    background-color: white;
`
const TextContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FED048;
    border-radius: 7;
    paddingVertical: 10;
    paddingHorizontal: 80;
    top: 20px;
    box-shadow: 0px 2px 2px #FED048;
`;
const InputsContainer = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background-color: #94B5C0;
    align-items: center;
    box-shadow: 0px 0px 4px #94B5C0;
`;
const InputContainer = styled.View`
    width: ${WIDTH / 1.5}px;
    height: ${HEIGHT / 3.5}px;
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

const Login =  () => {
    const {setValue, errors, register, handleSubmit, getValues} = useForm({
        mode: 'onChange'
    });
    
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
            <InputsContainer>
                <TextContainer>
                    <Text>FooDiary</Text>
                </TextContainer>
                <InputContainer>
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
        </Container>
    </TouchableWithoutFeedback>
    )
};

export default Login;
