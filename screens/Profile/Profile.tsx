import { gql } from "@apollo/client";
import { useMutation, useQuery} from "@apollo/client/react/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Dimensions, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import JoinButton from "../../components/Button";
import ImagePresenter from "../../components/ImagePresenter";
import Input from "../../components/Input";
import ScrollContainer from "../../components/ScrollContainer";
import { editProfile, editProfileVariables } from "../../__generated__/editProfile";
import { getMe } from "../../__generated__/getMe";
import * as MediaLibrary from 'expo-media-library';
import axios from "axios";
import Loading from "../../components/Loading";
import Password from "../../components/Password";
import { useAssets } from "expo-asset";
import GooglePlacesInput from "../../components/LocationSearch";

export const GET_ME_QUERY = gql`
    query getMe{
        getMe{
            id
            email
            name
            profilePic
        }
        getMyDiaries{
            ok
            error
            myDiaries{
                id
            }
        }
    }
`;
const EDIT_PROFILE_MUTATION = gql`
    mutation editProfile($editProfileInput: EditProfileInput!){
        editProfile(input: $editProfileInput){
            ok
            error
        }
    }
`

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    background-color: #F9F3F3;
    height: ${HEIGHT/1.2}px;
    width: ${WIDTH}px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    paddingHorizontal: 20px;
`;
const ProfileImageContainer = styled.View`
    height: ${WIDTH / 3}px;
    width: ${WIDTH / 3}px;
    border-radius: ${WIDTH / 3}px;
    box-shadow: 0px 2px 2px gray;
    align-items: center;
    justify-content: center;
    background-color: black;
    marginBottom: 10px;
`;
const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;
const ContentContainer = styled.View`
    height: ${HEIGHT/2.2}px;
    width: 100%;
    border-radius: 8px;
    flex-direction: row;
    background-color: white;
    box-shadow: 0px 0px 3px gray;
`;
const LabelContainer = styled.View`
    width: 33%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;
const LabelTitleContainer = styled.View`
    background-color: #F3F4ED;
    border-radius: 5px;
    paddingHorizontal: 10px;
    paddingVertical: 5px;
    box-shadow: 0px 4px 4px gray;
`;
const DataContainer = styled.View`
    width: 67%;
    flex-direction: column;
    justify-content: space-around;
    paddingLeft: 10px;
`;

const SubmitContaier = styled.View`
    flex-direction: row;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const EditBarContaier = styled.View`
    width: ${WIDTH / 5.4}px;
    z-index: 9;
    position: absolute;
    height: ${WIDTH/15}px;
    bottom: 10px;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px
`;
const EditBarText = styled.Text`
    font-size: 20px;
`;
const Text= styled.Text`
    font-size: 18px;
`;

interface IFormProps {
    email?: string;
    name?: string;
    profilePic?: string;
    password?:string;
    confirmPassword?: string;
};
const Profile = ({navigation, route: { params } }: any) => {
    const {data: myData, loading, error, refetch} = useQuery<getMe>(GET_ME_QUERY);
    const [isEdit, setIsEdit] =useState(false);//이건 필수
    const [existSelectImage, setExistSelectImage] = useState(params?.selectImages[0]); //이건 카메라롤 갔다 온 파람 저장용, useEffect로 계속 업데이트 시킴.
    const [emailKeyword, setEmailKeyword] = useState(myData?.getMe.email);
    const [nameKeyword, setNameKeyword] = useState(myData?.getMe.name);
    const [assets] = useAssets([require("../../assets/blank-profile-picture-973460_640.png")]);
    const paramsName = "Profile";
    const onPressEdit = () => {
        if (isEdit){
            params?.selectImages?.splice(0, params?.selectImages?.length);
            setExistSelectImage(null);
            setIsEdit(false);
        } else {
            setIsEdit(true);
        }
    };
    const {register, handleSubmit,watch, errors, setValue, getValues} = useForm<IFormProps>({
        mode: "onChange"
    });
    const onCompleted = (data: editProfile) => {
        const {
            editProfile: {
                ok, error
            }
        } = data;
        if (ok) {
            Alert.alert("수정 완료", '', [
                {
                    text: "확인",
                    onPress: () => {
                        refetch();
                    }
                }
            ]);
        };
        if (error){
            Alert.alert(`${error}`);
        }
        if (params?.selectImages.length > 0) {
            params?.selectImages?.splice(0, params?.selectImages.length);
        }
        setExistSelectImage(null);
        setIsEdit(false);
        refetch();
    };
    const [editProfile, {data, loading: editLoading, error: editError}] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MUTATION, {
        onCompleted,
    });
    const onPressPhotho = async() => {
        const result= await MediaLibrary.getAssetsAsync({first: 500});
        const {assets: images, hasNextPage} = result;
        console.log(hasNextPage);
        navigation.navigate("CameraRoll", {images, paramsName});
    };
    const onSubmit = async() => {
        const { email, name, password, confirmPassword } = getValues();
        let axiosData =[myData?.getMe.profilePic];
        if (existSelectImage) {
            const bodyFormData = new FormData();
            bodyFormData.append('file', { uri: existSelectImage.uri, name: existSelectImage.filename, type: 'image/jpeg'});
            const { data } = await axios("https://food-vicion-backend.herokuapp.com/uploads", {
                method: 'post',
                data: bodyFormData,
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });//여기까지도 잘 작동
            axiosData=data;
        };
        await editProfile({
            variables: {
                editProfileInput: {
                    email: emailKeyword ?? email,
                    name: nameKeyword ?? name,
                    profilePic: axiosData[0],
                    password,
                    confirmPassword
                }
            }
        });
    };
    useEffect(() => {
        register("email", { pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/});
        register("name");
        register("password");
        register("confirmPassword");
        if (params?.selectImages){
            setExistSelectImage(params?.selectImages[0]); //잘 작동함
        };
        refetch();
    },[register, params?.selectImages, myData?.getMe]);
    return !loading?
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 1
            }}
        >
            <ScrollContainer
            loading={loading}
            refreshFn={refetch}
        >
            <Container>
                {isEdit ?
                <TouchableOpacity onPress={onPressPhotho}>
                    <ProfileImageContainer>
                        <ImagePresenter 
                            imageUri={existSelectImage ? existSelectImage.uri : myData?.getMe.profilePic}
                            imageStyle={{
                                borderRadius: WIDTH/3,
                            }}
                        />
                        <EditBarContaier>
                            <EditBarText>✏️</EditBarText>
                        </EditBarContaier>
                    </ProfileImageContainer>
                </TouchableOpacity> 
                : <ProfileImageContainer>
                    <ImagePresenter 
                        imageUri={myData?.getMe.profilePic || assets[0].uri || "https://images.unsplash.com/photo-1587815073078-f636169821e3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"}
                        imageStyle={{
                            borderRadius: WIDTH/3,
                        }}
                    />
                  </ProfileImageContainer>
                }
                <ButtonContainer>
                    <JoinButton 
                            title={`${isEdit? "Cancel" : "Edit Profile"}`}
                            onPress={onPressEdit}
                            buttonStyle={{
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                backgroundColor: "white",
                                borderRadius: "4px",
                                shadowColor: "gray",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                shadowOpacity: 0.4,
                                marginBottom: "5%"
                            }}
                            textStyle={{
                                fontWeight: "500"
                            }}
                    />
                    <JoinButton 
                        title={"My Diary"}
                        onPress={() => navigation.navigate("My Diary")}
                        buttonStyle={{
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            backgroundColor: "white",
                            borderRadius: "4px",
                            shadowColor: "gray",
                                shadowOffset: {
                                    width: 0,
                                    height: 1
                                },
                            shadowOpacity: 0.4,
                            marginBottom: "5%"
                        }}
                        textStyle={{
                            fontWeight: "500"
                        }}
                    />
                </ButtonContainer>
                <ContentContainer>
                    <LabelContainer>
                        <LabelTitleContainer>
                            <Text>Email</Text>
                        </LabelTitleContainer>
                        <LabelTitleContainer>
                            <Text>Name</Text>
                        </LabelTitleContainer>
                        {isEdit?
                        <> 
                            <LabelTitleContainer>
                                <Text style={{fontSize: 10}}>New{"\n"}Password</Text>
                            </LabelTitleContainer>
                            <LabelTitleContainer>
                                <Text style={{fontSize: 10}}>Confirm Password</Text>
                            </LabelTitleContainer>
                        </>
                        : <></>}
                        <LabelTitleContainer>
                            <Text>Diary</Text>
                        </LabelTitleContainer>
                    </LabelContainer>
                    <DataContainer>
                        {isEdit?  
                            <Input 
                                defaultValue={myData?.getMe.email}
                                onChange={(text: string) => {
                                    setValue("email", text);
                                    setEmailKeyword(text);
                                }}
                                inputStyle={{
                                    fontSize: 14,
                                    width: "95%",
                                    paddingBottom: 5
                                }}
                            />
                        : <Text style={{fontSize: 14}}>{myData?.getMe.email}</Text>}
                        {isEdit?  
                            <Input 
                                defaultValue={myData?.getMe.name}
                                onChange={(text: string) => {
                                    setValue("name", text);
                                    setNameKeyword(text);
                                }}
                                inputStyle={{
                                    fontSize: 14,
                                    width: "95%",
                                    paddingBottom: 5
                                }}
                            />
                        : <Text style={{fontSize: 14}}>{myData?.getMe.name}</Text>}
                        {isEdit?  
                            <Password 
                                onChange={(text: string) => {
                                    setValue("password", text);
                                }}
                                inputStyle={{
                                    fontSize: 14,
                                    width: "95%",
                                    paddingBottom: 5
                                }}
                            />
                        : <></>}
                        {isEdit?  
                            <Password 
                                onChange={(text: string) => {
                                    setValue("confirmPassword", text);
                                }}
                                inputStyle={{
                                    fontSize: 14,
                                    width: "95%",
                                    paddingBottom: 5
                                }}
                            />
                        : <></>}
                        <Text style={{fontSize: 14}}>{myData?.getMyDiaries.myDiaries ? `${myData.getMyDiaries.myDiaries.length} Cards` : "0 Card"}</Text>
                    </DataContainer>
                </ContentContainer>
                {isEdit && !editLoading ? 
                    <SubmitContaier>
                        <JoinButton 
                            title={"Submit"}
                            onPress={handleSubmit(onSubmit)}
                            buttonStyle={{
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                backgroundColor: "#FED048",
                                borderRadius: "8px",
                                shadowColor: "gray",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                shadowOpacity: 0.7,
                                marginBottom: "5%"
                            }}
                            textStyle={{
                                fontWeight: "500"
                            }}
                        />
                    </SubmitContaier>
                    : <></>
                    }
                    {editLoading && (
                        <ActivityIndicator size="small" color="black" />
                    )}
            </Container>
            </ScrollContainer>
        </KeyboardAvoidingView> 
        : <Loading />
    
};

export default Profile;