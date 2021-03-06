import { gql } from "@apollo/client";
import {useLazyQuery} from "@apollo/client/react/hooks";
import { useAssets } from "expo-asset";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import ImagePresenter from "../../components/ImagePresenter";
import ScrollContainer from "../../components/ScrollContainer";
import SearchInput from "../../components/SearchInput";
import { searchUser, searchUserVariables } from "../../__generated__/searchUser";


const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const InputContainer = styled.View`
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 5px 0px;
    background-color: #F9F3F3;
`;

const SearchContainer = styled.View`
    height: 100%;
    width: 100%;
`;

const UserContainer = styled.View`
    flex-direction: row;
    width: 100%;
    height: ${WIDTH/6.3};
    align-items: center;
    padding: 0px 5px;
    borderBottomWidth: 0.3px;
    borderColor: rgba(0,0,0,0.3);
`;
const UserProfilePicContainer = styled.View`
    height: ${WIDTH/7}px;
    width: ${WIDTH/7}px;
    border-radius: ${WIDTH/7}px;
    box-shadow: 0px 0px 3px gray;
    border: 0.3px;
    borderColor: rgba(0,0,0,0.3);
`;

const UserContentContainer = styled.View`
    width: 100%;
    height: 100%;
    justify-content: space-around;
    padding: 0px 0px 0px 20px;
    flex: 1;

`

const Text = styled.Text``;

export const SEARCH_USER_QUERY = gql`
    query searchUser($searchInput: SearchUserInput!){
        searchUser(input: $searchInput){
            error
            ok
            users{
                id
                name
                email
                profilePic
            }
        }
    }
`;


const SearchUser = (props: any) => {
    const { navigation, route } = props;
    const [keyword, setKeyword] = useState("");
    const [assets] = useAssets([require("../../assets/blank-profile-picture-973460_640.png")]);
    const [searchUser, {data, loading, error, refetch}] = useLazyQuery<searchUser, searchUserVariables>(SEARCH_USER_QUERY);
    return (
        <InputContainer>
            <SearchInput
                    placeholder={"Search user by name"}
                    onChange={(text: string) => {
                        setKeyword(text)
                        searchUser({
                            variables: {
                                searchInput: {
                                    query: text
                                }
                            }
                        });
                    }}
                    value={keyword}
                    inputStyle={{
                        width: "90%",
                        shadowColor: "gray",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.7
                    }}
            />
            <ScrollContainer
                contentContainerStyle={{
                    height: HEIGHT,
                    width: WIDTH,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }}
                refreshFn={() => {
                    setKeyword("");
                }}
                loading={loading}
            >
                {data?.searchUser.users?.length > 0 ? (
                    <SearchContainer>
                        {data?.searchUser.users?.map(user => (
                            <>
                                <TouchableOpacity onPress={() => navigation.navigate("Person Diary", { id: user.id, name: user.name, profilePic: assets[0].uri })}>
                                    <UserContainer>
                                        <UserProfilePicContainer>
                                            <ImagePresenter 
                                                imageUri={user.profilePic ?? assets[0].uri}
                                                imageStyle={{
                                                    height: (WIDTH / 7),
                                                    width: (WIDTH / 7),
                                                    borderRadius: (WIDTH / 7)
                                                }}
                                            />
                                        </UserProfilePicContainer>
                                        <UserContentContainer>
                                            <Text key={user.id} style={{fontSize: 17}}>{user.name}</Text>
                                            <Text key={user.email} style={{fontSize: 9, fontWeight: "500"}}>{user.email}</Text>
                                        </UserContentContainer>
                                        {/*????????? ???????????? ????????? ?????? ???????????? ?????? ???
                                        ???????????? ???*/ }
                                    </UserContainer>
                                </TouchableOpacity>
                            </>
                        ))}
                    </SearchContainer>
                ) : <></>
                }
        </ScrollContainer>
        </InputContainer>
    )
};

export default SearchUser;