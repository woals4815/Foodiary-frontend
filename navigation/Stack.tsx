import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";

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
    </Stack.Navigator>
)