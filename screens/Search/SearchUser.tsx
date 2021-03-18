import { gql } from "@apollo/client";
import {useLazyQuery} from "@apollo/client/react/hooks";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
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
                        width: "90%"
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
                                <UserContainer>
                                    <UserProfilePicContainer>
                                        <ImagePresenter 
                                            imageUri={user.profilePic}
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
                                    {/*여기에 다이어리 개수나 무슨 추가적인 정보 ㅊ
                                    추가해야 함*/ }
                                </UserContainer>
                            </>
                        ))}
                    </SearchContainer>
                ) : <></>}
        </ScrollContainer>
        </InputContainer>
    )
};

export default SearchUser;