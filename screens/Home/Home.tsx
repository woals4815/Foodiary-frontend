import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { getAllDiaries } from "../../__generated__/getAllDiaries";
import {useQuery} from "@apollo/client/react/hooks"
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: white;
`
const Text= styled.Text`
    font-size: 100px;
`
export const GET_ALL_DIARIES = gql`
    query getAllDiaries{
        getAllDiaries{
            ok
            error
            diaries{
                id
                creator{
                    id
                    name
                    profilePic
                }
                comments{
                    comment
                    createdAt
                    updatedAt
                    creator{
                        name
                        profilePic
                    }
                }
                createdAt
                images
                publicOrNot
                rating
                updatedAt
                description
            }
        }
    }
`

export default () => {
  const {data, error, loading} = useQuery<getAllDiaries>(GET_ALL_DIARIES);
  console.log(data, error, loading);
  return (
      <Container>
        {data?.getAllDiaries.diaries?.map(diary => <Text key={diary.id}>{diary.description}</Text>)}
        <Text>돼라 제발</Text>
      </Container>
  );
}