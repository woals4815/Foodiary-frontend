import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { getAllDiaries } from "../../__generated__/getAllDiaries";
import {useQuery} from "@apollo/client/react/hooks"
import { ActivityIndicator, Dimensions, PanResponder, Animated } from "react-native";
import styled from "styled-components/native";
import ScrollContainer from "../../components/ScrollContainer";
import ImagePresenter from "../../components/ImagePresenter";
import HomeCard from "./HomeCard";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #94B5C0;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
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
`;

export default () => {
  const [topIndex, setTopIndex] = useState(0);
  const {data, error, loading, refetch} = useQuery<getAllDiaries>(GET_ALL_DIARIES);
  const position = new Animated.ValueXY();
  const nextCard = () => setTopIndex((currentValue) => currentValue + 1);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, { dx, dy }) => {
      position.setValue({ x: dx, y: dy });
      console.log(position);
    },
    onPanResponderRelease: (evt, { dx, dy }) => {
        if (dx >= 250) {
          Animated.spring(position, {
            toValue: {
              x: WIDTH + 100,
              y: dy,
            },
            useNativeDriver: true
          }).start();
        } else if (dx <= -250) {
          Animated.spring(position, {
            toValue: {
              x: -WIDTH - 100,
              y: dy,
            },
            useNativeDriver: true
          }).start();
        } else {
          Animated.spring(position, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true
          }).start();
        }
      },
  });
  const rotationValues = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: ["-8deg", "0deg", "8deg"],
    extrapolate: "clamp",
  });
  const secondCardOpacity = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.2, 1],
    extrapolate: "clamp",
  });
  const secondCardScale = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });
  useEffect(() => {
    position.setValue({ x: 0, y: 0 });
  }, [topIndex]);
  return (
        <ScrollContainer
          loading={loading}
          refreshFn={refetch}
        >
          <Container>
            <Animated.View
                style={{
                top: 50,
                height: HEIGHT / 1.5,
                width: "90%",
                position: "absolute",
                }}
                key={1}
                {...panResponder.panHandlers}
            >
                <HomeCard diary={data?.getAllDiaries?.diaries[0]} />
            </Animated.View>
        </Container>
      </ScrollContainer>
  );
}