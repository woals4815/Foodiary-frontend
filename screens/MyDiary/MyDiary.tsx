import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react/hooks";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import JoinButton from "../../components/Button";
import DiaryCard from "../../components/DiaryCard";
import ScrollContainer from "../../components/ScrollContainer";
import { deleteDiary, deleteDiaryVariables } from "../../__generated__/deleteDiary";
import { getMyDiaries } from "../../__generated__/getMyDiaries";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

export const GET_MY_DIARIES_QUERY = gql`
    query getMyDiaries {
        getMyDiaries {
            error
            ok
            myDiaries {
                id
                comments{
                    id
                    comment
                    creator{
                        id
                        name
                    }
                    createdAt
                }
                images
                rating
                publicOrNot
                description
                createdAt
            }
        }
    }
`;

const Text = styled.Text`
    font-size: 20px;
`;

const ListButton = styled.View`
    height: ${WIDTH/10}px;
    justify-content: center;
    align-items: center;
    width: ${WIDTH/10}px;
    position: absolute;
    z-index: 10;
    top: 5;
    right: 5;
    border-radius: 20px;
    background-color: skyblue;
    box-shadow: 0px 0px 3px gray;
    border: 2.5px;
    borderColor: #F9F3F3;
`;

const MyDiary =  (props: any) => {
    const { navigation, route } = props;
    const [isList, setIsList] = useState(false);
    let { data, loading, error, refetch} = useQuery<getMyDiaries>(GET_MY_DIARIES_QUERY);
    useEffect(() => {
        refetch();
    }, [data]);
    return (
        <ScrollContainer
            loading={loading}
            refreshFn={refetch}
            contentContainerStyle={{
                paddingBottom: 10
            }}
        >
            <TouchableOpacity style={{zIndex: 10}}>
                <ListButton>
                    <Text style={{fontSize: 13}}>{isList ? "Full" : "List"}</Text>
                </ListButton>
            </TouchableOpacity>
            {!loading?
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {data?.getMyDiaries.myDiaries?.slice(0).reverse().map(diary => (
                    <DiaryCard 
                        images={diary.images}
                        description={diary.description}
                        rating={diary.rating}
                        publicOrNot={diary.publicOrNot}
                        createdAt={diary.createdAt}
                        key={diary.id}
                        diaryId={diary.id}
                        refreshFn={refetch}
                    />
                ))}
            </KeyboardAvoidingView> 
            : <ActivityIndicator size="large" color="black" />}
        </ScrollContainer>
    )
}

export default MyDiary;