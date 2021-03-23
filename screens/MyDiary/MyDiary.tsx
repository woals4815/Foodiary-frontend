import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react/hooks";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import DiaryCard from "../../components/DiaryCard";
import List from "../../components/List";
import ScrollContainer from "../../components/ScrollContainer";
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
    color: white;
`;

const ListButton = styled.View`
    height: ${WIDTH/10}px;
    justify-content: center;
    align-items: center;
    width: ${WIDTH/10}px;
    position: absolute;
    z-index: 10;
    top: 5px;
    right: 5px;
    border-radius: 20px;
    background-color: #9FD7DF;
    box-shadow: 0px 0px 3px gray;
`;

const MyDiary =  (props: any) => {
    const { navigation, route } = props;
    const [isList, setIsList] = useState(false);
    let { data, loading, error, refetch} = useQuery<getMyDiaries>(GET_MY_DIARIES_QUERY);
    const listPress = () => {
        if (isList){
            setIsList(false);
        } else{
            setIsList(true);
        }
    }
    useEffect(() => {
        refetch();
    }, [data]);
    return (
        <ScrollContainer
            loading={loading}
            refreshFn={refetch}
            contentContainerStyle={{
                paddingVertical: 10,
                paddingHorizontal: isList? 10 : 0,
            }}
        >
            <TouchableOpacity style={{zIndex: 10}} onPress={listPress}>
                <ListButton>
                    <Text style={{fontSize: 13}}>{isList ? "Full" : "List"}</Text>
                </ListButton>
            </TouchableOpacity>
            {!loading?
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {!isList ? data?.getMyDiaries.myDiaries?.slice(0).sort(function(a,b){return a.id-b.id}).reverse().map(diary => (
                    <DiaryCard 
                        images={diary.images}
                        description={diary.description}
                        rating={diary.rating}
                        publicOrNot={diary.publicOrNot}
                        createdAt={diary.createdAt}
                        key={diary.id}
                        diaryId={diary.id}
                        refreshFn={refetch}
                        props={props}
                    />
                )): data?.getMyDiaries.myDiaries?.slice(0).sort(function(a,b){return a.id-b.id}).reverse().map(diary => (
                    <List 
                      key={diary.id}
                      images={diary.images}
                      createdAt={diary.createdAt}
                      description={diary.description}
                    />
                ))}
            </KeyboardAvoidingView> 
            : <ActivityIndicator size="large" color="black" />}
        </ScrollContainer>
    )
}

export default MyDiary;