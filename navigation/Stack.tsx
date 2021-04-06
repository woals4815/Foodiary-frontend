import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import CameraRoll from "../screens/CameraRoll/CameraRoll";
import MyDiary from "../screens/MyDiary/MyDiary";
import PersonDiary from "../screens/PersonDiary/PersonDiary";
import OneDiary from "../screens/OneDiary/OneDiary";

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#F9F3F3",
                borderBottomColor: "#F9F3F3",
                shadowColor: "#F9F3F3",
            },
            headerTitleAlign: "center",
            cardStyle: {
                backgroundColor: "#F9F3F3"
            }
        }}
    >
        <Stack.Screen name={"Tabs"} component={Tabs} />
        <Stack.Screen name={"CameraRoll"} component={CameraRoll} />
        <Stack.Screen name={"My Diary"} component={MyDiary} />
        <Stack.Screen name={"Person Diary"} component={PersonDiary} />
        <Stack.Screen name={"One Diary"} component={OneDiary} />
    </Stack.Navigator>
)