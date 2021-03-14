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
const Container = styled.View``;

const TestImages = ["https://vicion-food.s3.ap-northeast-2.amazonaws.com/1615646617193IMG_0003.JPG", "https://vicion-food.s3.ap-northeast-2.amazonaws.com/1615636257168IMG_0810.HEIC"];


export default (props: any) => {
    const { navigation, route } = props;
    let { data, loading, error, refetch} = useQuery<getMyDiaries>(GET_MY_DIARIES_QUERY);
    useEffect(() => {
        refetch();
        console.log(data);
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
            <ScrollContainer>
                {data?.getMyDiaries.myDiaries?.map(diary => (
                    <DiaryCard 
                        images={diary.images}
                        description={diary.description}
                        rating={diary.rating}
                        publicOrNot={diary.publicOrNot}
                        createdAt={diary.createdAt}
                    />
                ))}
                {/* <DiaryCard 
                    images={TestImages} 
                    description={data?.getMyDiaries.myDiaries[8].description} 
                    rating={data?.getMyDiaries.myDiaries[8].rating} 
                    publicOrNot={data?.getMyDiaries.myDiaries[8].publicOrNot}
                    createdAt={data?.getMyDiaries.myDiaries[8].createdAt}
                    /> */}
            </ScrollContainer>
        )
    }
}