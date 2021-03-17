import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react/hooks";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import DiaryCard from "../../components/DiaryCard";
import ScrollContainer from "../../components/ScrollContainer";
import { getMyDiaries } from "../../__generated__/getMyDiaries";


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
const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #94B5C0;
    height: 100%;
`;

const MyDiary =  (props: any) => {
    const { navigation, route } = props;
    let { data, loading, error, refetch} = useQuery<getMyDiaries>(GET_MY_DIARIES_QUERY);
    useEffect(() => {
        refetch();
    }, [data]);
    console.log(data);
    return (
        <Container>
            <ScrollContainer
                loading={loading}
                refreshFn={refetch}
            >
                {data?.getMyDiaries.myDiaries?.slice(0).reverse().map(diary => (
                    <DiaryCard 
                        images={diary.images}
                        description={diary.description}
                        rating={diary.rating}
                        publicOrNot={diary.publicOrNot}
                        createdAt={diary.createdAt}
                        key={diary.id}
                    />
                ))}
            </ScrollContainer>
        </Container>
    )
}

export default MyDiary;