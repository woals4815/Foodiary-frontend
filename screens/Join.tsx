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

const TextContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    paddingVertical: 10px;
    paddingHorizontal: 80px;
    top: 20px;
    box-shadow: 0px 2px 2px #FED048;
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
        if (error) {
            Alert.alert(`You have this error`, `${error}`,[
                {
                    text: "Back",
                    onPress: () => {
                        return;
                    }
                }
            ]);
        };
    }
    const [createAccountMutation, {loading, data, error}] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
        onCompleted
    });
    const onSubmit = async() => {
        const passwordRegix = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,20}$/;
        const {email, name, password, confirmPassword} =  await getValues();
            if (!passwordRegix.test(password)) {
                Alert.alert("비밀번호는 특수문자와 영문, 숫자를 포함한 최대 길이 20자로 작성해주시기 바랍니다.");
            };
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
                    Alert.alert("비밀번호는 특수문자와 영문, 숫자를 포함한 최대 길이 20자로 작성해주시기 바랍니다.");
                    console.log(error);
                 }
            };
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
                    {!loading ?
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
                                borderRadius: 8,
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