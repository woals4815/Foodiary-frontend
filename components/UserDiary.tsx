import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { formatDate } from "../utils";
import ImagePresenter from "./ImagePresenter";


const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
    height: ${WIDTH/2}px;
    width: ${WIDTH/2}px;
    align-items: center;
    justify-content: space-around;
    borderBottomWidth: 0.4px;
    borderColor: rgba(0,0,0,0.4);
`;
const Text = styled.Text``;

const UserDiary = ({diary}: any) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("One Diary", {diary})}>
            <Container>
                <ImagePresenter 
                    imageUri={diary.images[0]}
                    imageStyle={{
                        height: "70%",
                        width: "70%",
                        borderRadius: 5
                    }}
                />
                <Text>{formatDate(diary.createdAt)}</Text>
            </Container>
        </TouchableOpacity>
    )
};

export default UserDiary;