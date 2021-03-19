import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import CameraRoll from "../screens/CameraRoll/CameraRoll";
import MyDiary from "../screens/MyDiary/MyDiary";
import Drawer from "./Drawer";
import PersonDiary from "../screens/PersonDiary/PersonDiary";
import OneDiary from "../screens/OneDiary/OneDiary";

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#94B5C0",
                borderBottomColor: "#94B5C0",
                shadowColor: "#94B5C0",
            },
            headerTitleAlign: "center"
        }}
    >
        <Stack.Screen name={"Tabs"} component={Tabs} />
        <Stack.Screen name={"CameraRoll"} component={CameraRoll} />
        <Stack.Screen name={"MyDiary"} component={MyDiary} />
        <Stack.Screen name={"Person Diary"} component={PersonDiary} />
        <Stack.Screen name={"One Diary"} component={OneDiary} />
    </Stack.Navigator>
)