import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import CameraRoll from "../screens/CameraRoll/CameraRoll";
import MyDiary from "../screens/MyDiary/MyDiary";

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "white",
                borderBottomColor: "white",
                shadowColor: "white"
            }
        }}
    >
        <Stack.Screen name={"Tabs"} component={Tabs} />
        <Stack.Screen name={"CameraRoll"} component={CameraRoll} />
        <Stack.Screen name={"MyDiary"} component={MyDiary} />
    </Stack.Navigator>
)