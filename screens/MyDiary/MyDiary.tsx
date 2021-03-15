import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react/hooks";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import DiaryCard from "../../components/DiaryCard";
import ScrollContainer from "../../components/ScrollContainer";
import { getMyDiaries } from "../../__generated__/getMyDiaries";


const GET_MY_DIARIES_QUERY = gql`
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
    background-color: white;
    height: 100%;
`;

export default (props: any) => {
    const { navigation, route } = props;
    let { data, loading, error, refetch} = useQuery<getMyDiaries>(GET_MY_DIARIES_QUERY);
    useEffect(() => {
        refetch();
    }, [data]);
    if (loading){
        return(
            <Container>
                <Text>Loading</Text>
            </Container>
        )
    }
    if (!loading) {
        return (
            <Container>
                <ScrollContainer
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
}