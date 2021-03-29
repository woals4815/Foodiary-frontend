import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react/hooks";
import { useAssets } from "expo-asset";
import React, { useLayoutEffect } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import DiaryCard from "../../components/DiaryCard";
import ImagePresenter from "../../components/ImagePresenter";
import ScrollContainer from "../../components/ScrollContainer";
import UserDiary from "../../components/UserDiary";
import { userProfile, userProfileVariables } from "../../__generated__/userProfile";


export const GET_USER_PROFILE_QUERY = gql`
    query userProfile($userId: Float!) {
        userProfile(userId: $userId) {
            error
            ok
            user{
                id
                name
                email
                profilePic
                myDiaries{
                    id
                    comments{
                        id
                        comment
                        creator{
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                    createdAt
                    description
                    images
                    publicOrNot
                    rating
                    updatedAt
                    address
                }
            }
        }
    }
`;

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const textStyles= {
    width: WIDTH/8.5, 
    textAlign: "center",
    fontWeight: "600"
};
const styles = {
    marginLeft: 5
};

const UserProfileContinaer = styled.View`
    width: 100%;
    height: ${WIDTH/3}px;
    flex-direction: row;
    borderBottomWidth: 0.4px;
    borderColor: rgba(0,0,0,0.4);
    align-items: center;
`;
const UserPicContainer = styled.View`
    height: ${WIDTH / 4.1}px;
    width: ${WIDTH / 4.1}px;
    align-items: center;
    flex: 1;
    box-shadow: 0px 0px 3px gray;
`;
const UserInfoContainer = styled.View`
    height: 100%;
    width: 100%;
    flex: 2;
    justify-content: space-around;
`;

const DiaryContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;
const LabelContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;
const LabelStyleContainer = styled.View`
    background-color: white;
    padding: 5px 10px;
    border-radius: 15px;
    box-shadow: 0px 0px 2px gray;
`;


const Text = styled.Text``;

const PersonDiary = (props: any) => {
    const { navigation, route: { params } } = props;
    const [getUserProfile, { data, loading, error, refetch }] = useLazyQuery<userProfile, userProfileVariables>(GET_USER_PROFILE_QUERY);
    useLayoutEffect(() => {
        navigation.setOptions({
          title: params.name
        });
        getUserProfile({
            variables: {
                userId: params.id
            }
        })
    }, [params]);
    return (
        <ScrollContainer
            contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: "#F9F3F3",
            }}
            loading={loading}
            refreshFn={refetch}
        >
            <UserProfileContinaer>
                <UserPicContainer>
                    <ImagePresenter
                        imageStyle={{
                            width: WIDTH / 4.1,
                            height: WIDTH / 4.1,
                            borderRadius: WIDTH / 4.1,
                        }}
                        imageUri={!data?.userProfile.user?.profilePic ? params.profilePic || "https://images.unsplash.com/photo-1587815073078-f636169821e3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80": data.userProfile.user.profilePic}
                    />
                </UserPicContainer>
                <UserInfoContainer>
                    <LabelContainer>
                        <LabelStyleContainer>
                            <Text style={{...textStyles}}>Name</Text>  
                        </LabelStyleContainer>
                        <Text style={{...styles}}>{data?.userProfile.user?.name}</Text>
                    </LabelContainer>
                    <LabelContainer>
                        <LabelStyleContainer>
                            <Text style={{...textStyles}} >Email</Text>
                        </LabelStyleContainer>
                        <Text style={{...styles}}>{data?.userProfile.user?.email}</Text>
                    </LabelContainer>
                    <LabelContainer>
                        <LabelStyleContainer>
                            <Text style={{...textStyles, width: WIDTH /4.3}}>Diary Cards</Text>
                        </LabelStyleContainer>
                        <Text style={{...styles}}>{data?.userProfile.user?.myDiaries.length} cards</Text>
                    </LabelContainer>
                    {/* <Text>Comments: {data?.userProfile.user.}</Text>  이거 처리해야함*/}
                </UserInfoContainer>
            </UserProfileContinaer>
            <DiaryContainer>
                {data?.userProfile.user?.myDiaries.map((diary: any) => (
                    <UserDiary 
                        diary={diary}
                        key={diary.id}
                    />
                ))}
            </DiaryContainer>
        </ScrollContainer>
    )
}

export default PersonDiary;