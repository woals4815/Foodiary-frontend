import { gql, useApolloClient } from "@apollo/client";
import { useMutation, useQuery} from "@apollo/client/react/hooks";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import JoinButton from "../../components/Button";
import ImagePresenter from "../../components/ImagePresenter";
import Input from "../../components/Input";
import ScrollContainer from "../../components/ScrollContainer";
import { editProfile, editProfileVariables } from "../../__generated__/editProfile";
import { getMe } from "../../__generated__/getMe";
import * as MediaLibrary from 'expo-media-library';
import { getMyDiaries } from "../../__generated__/getMyDiaries";
import axios from "axios";
import DeleteButton from "../../components/DeleteButton";

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
`
const ProfileImageContainer = styled.View`
    height: ${WIDTH / 3}px;
    width: ${WIDTH / 3}px;
    border-radius: ${WIDTH / 3}px;
    box-shadow: 0px 2px 2px gray;
    align-items: center;
    justify-content: center;
    background-color: black;
`
const ContentContainer = styled.View`
    height: ${HEIGHT/2.2}px;
    width: 100%;
    border-radius: 8px;
    flex-direction: column;
    background-color: white;
    box-shadow: 0px 0px 3px gray;
`
const EmailContainer = styled.View`
    flex-direction: row;
    width: 100%;
    paddingHorizontal: 70px;
    flex: 2;
    justify-content: center;
    align-items: center;
`;
const EmailText= styled.Text`
    font-size: 20px;
`;
const NameContainer = styled.View`
    flex-direction: row;
    flex: 2;
    justify-content: center;
    paddingHorizontal: 70px;
    align-items: center;
    width: 100%;
`;

const NameText = styled.Text`
    font-size: 20px;
`;

const MyDiaryContainer =styled.View`
    flex-direction: row;
    flex: 2;
    paddingHorizontal: 40px;
    justify-content: space-around;
    align-items: center;
`;

const MyDiaryText = styled.Text`
    font-size: 20px;
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
`
const EditBarText = styled.Text`
    font-size: 20px;
`

interface IFormProps {
    email?: string;
    name?: string;
    profilePic?: string;
};
const Profile = ({navigation, route: { params } }: any) => {
    const {data: myData, loading, error, refetch} = useQuery<getMe>(GET_ME_QUERY);
    const [isEdit, setIsEdit] =useState(false);//이건 필수
    const [profilePic, setProfilePic] = useState(myData?.getMe.profilePic); //이건 캐시 업데이트
    const [existSelectImage, setExistSelectImage] = useState(params?.selectImages[0]); //이건 카메라롤 갔다 온 파람 저장용, useEffect로 계속 업데이트 시킴.
    const paramsName = "Profile";
    const client = useApolloClient();
    const onPressEdit = () => {
        if (isEdit){
            params?.selectImages?.splice(0, params?.selectImages?.length);
            setExistSelectImage(null);
            setIsEdit(false);
        } else {
            setIsEdit(true);
        }
    }
    const {register, handleSubmit,watch, errors, setValue, getValues} = useForm<IFormProps>({
        mode: "onChange"
    });
    const onCompleted = (data: editProfile) => {
        const {
            editProfile: {
                ok, error
            }
        } = data;
        const { email, name } = getValues();
        if (ok) {
            console.log(email, name);
            Alert.alert("Edit Success!");
        };
        if (params?.selectImages.length > 0) {
            params?.selectImages?.splice(0, params?.selectImages.length);
        }
        setExistSelectImage(null);
        setIsEdit(false);
    };
    const [editProfile, {data, loading: editLoading, error: editError}] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MUTATION, {
        onCompleted,
    });
    const onPressPhotho = async() => {
        const result= await MediaLibrary.getAssetsAsync({first: 300});
        const {assets: images} = result;
        navigation.navigate("CameraRoll", {images, paramsName});
    }
    const onSubmit = async() => {
        const { email, name } = getValues();
        //console.log('onSubmit', existSelectImage); 선택한 이미지 useEffect로 넘어오는건 완전히 잘 작동
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
            setProfilePic(data[0]); //여기도 잘 작동
            await editProfile({
                variables: {
                    editProfileInput: {
                        profilePic: profilePic, email, name
                    }
                }
            });
        }
        await editProfile({
            variables: {
                editProfileInput: {
                    email, name
                }
            }
        });
    }
    useEffect(() => {
        register("email", { pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/});
        register("name");
        if (params?.selectImages){
            setExistSelectImage(params?.selectImages[0]); //잘 작동함
        }
    },[register, params?.selectImages]);
    return(
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
                        imageUri={myData?.getMe.profilePic}
                        imageStyle={{
                            borderRadius: WIDTH/3,
                        }}
                    />
                  </ProfileImageContainer>
                }
                <JoinButton 
                        title={`${isEdit? "Cancel" : "Edit Profile"}`}
                        onPress={onPressEdit}
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
                <ContentContainer>
                    <EmailContainer>
                        <EmailText
                            style={{
                                fontWeight: '800'
                            }}
                        >Email: </EmailText>
                        {isEdit? 
                            <Input 
                                placeholder={"Email"}
                                onChange={(text: string) => {
                                    setValue('email', text);
                                }}
                                inputStyle={{
                                    fontSize: 20,
                                    paddingLeft: 5
                                }}
                                defaultValue={myData?.getMe.email}
                            />
                        : <EmailText>{myData?.getMe.email}</EmailText>}
                    </EmailContainer>
                    <NameContainer>
                        <NameText
                            style={{
                                fontWeight: '800'
                            }}
                        >Name: </NameText>
                            {isEdit? 
                            <Input 
                                placeholder={"Name"}
                                onChange={(text: string) => {
                                    setValue('name', text);
                                }}
                                inputStyle={{
                                    fontSize: 20,
                                    paddingLeft: 5
                                }}
                                defaultValue={myData?.getMe.name}
                            />
                        : <NameText>{myData?.getMe.name}</NameText>}
                    </NameContainer>
                    <MyDiaryContainer>
                        <MyDiaryText
                            style={{
                                fontWeight: '800'
                            }}
                        >My Diary: </MyDiaryText>
                        <MyDiaryText>{myData?.getMyDiaries.myDiaries?.length} diaries</MyDiaryText>
                        <JoinButton 
                            title={"My Diary"}
                            onPress={() => navigation.navigate("My Diary", { myData })}
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
                            }}
                        />
                    </MyDiaryContainer>
                    {isEdit? 
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
                </ContentContainer>
            </Container>
        </ScrollContainer>
    )
};

export default Profile;