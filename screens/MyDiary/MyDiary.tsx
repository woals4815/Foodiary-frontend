import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react/hooks";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
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

const DELETE_DIARY_MUTATION = gql`
    mutation deleteDiary($deleteDiaryInput: DeleteDiaryInput!){
        deleteDiary(input: $deleteDiaryInput){
            error
            ok
        }
    }
`;

const Text = styled.Text`
    font-size: 20px;
`;
const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F9F3F3;
    height: 100%;
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
    border-radius: 10;
    background-color: skyblue;
    box-shadow: 0px 0px 3px gray;
`;

const MyDiary =  (props: any) => {
    const { navigation, route } = props;
    const [isList, setIsList] = useState(false);
    let { data, loading, error, refetch} = useQuery<getMyDiaries>(GET_MY_DIARIES_QUERY);
    console.log(data?.getMyDiaries.myDiaries);
    useEffect(() => {
        refetch();
    }, [data]);
    return (
        <>
            <TouchableOpacity style={{zIndex: 10}}>
                <ListButton>
                    <Text style={{fontSize: 13}}>{isList ? "Full" : "List"}</Text>
                </ListButton>
            </TouchableOpacity>
            <ScrollContainer
                loading={loading}
                refreshFn={refetch}
                contentContainerStyle={{
                    width: WIDTH,
                    backgroundColor: "#F9F3F3",
                }}
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
            </ScrollContainer>
        </>
    )
}

export default MyDiary;