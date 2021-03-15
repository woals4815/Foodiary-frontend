import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { getAllDiaries } from "../../__generated__/getAllDiaries";
import {useQuery} from "@apollo/client/react/hooks"
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import ScrollContainer from "../../components/ScrollContainer";
import ImagePresenter from "../../components/ImagePresenter";

const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
`
const Text= styled.Text`
    font-size: 20px;
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
  return (
      <Container>
        <ScrollContainer>
        </ScrollContainer>
      </Container>
  );
}