import { useReactiveVar } from "@apollo/client";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { isLoggedInVar } from "../apollo";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Join from "../screens/Join";
import AddDiary from "../screens/AddDiary";
import EditProfile from "../screens/EditProfile";

const Tabs = createBottomTabNavigator();

const getHeaderName = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Join";
    return routeName; //route?.state?.routeNames[route.state.index] || "Movies"; (temporary solution)
  };
export default (props: any) => {
    const {navigation , route} = props;
    useLayoutEffect(() => {
        const title = getHeaderName(route);
        navigation.setOptions({
          title: title,
        });
      }, [route]);
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return isLoggedIn ?(
        <Tabs.Navigator
            tabBarOptions={{
                labelStyle: {
                    color: "black"
                },
                style: {
                    height: "7%",
                },
                activeBackgroundColor: "red"
            }}
        >
            <Tabs.Screen name="Home" component={Home}/>
            <Tabs.Screen name="AddDiary" component={AddDiary} />
            <Tabs.Screen name="EditProfile" component={EditProfile} />
        </Tabs.Navigator>
    ): (
    <Tabs.Navigator>
        <Tabs.Screen name="Join" component={Join} />
        <Tabs.Screen name="Login" component={Login} />
    </Tabs.Navigator>)
}