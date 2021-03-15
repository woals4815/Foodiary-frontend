import { useReactiveVar } from "@apollo/client";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { isLoggedInVar } from "../apollo";
import Home from "../screens/Home/Home";
import Login from "../screens/Login";
import Join from "../screens/Join";
import AddDiary from "../screens/AddDiary/AddDiary";
import { Dimensions } from "react-native";
import Profile from "../screens/EditProfile/Profile";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Tabs = createBottomTabNavigator();

const tabBarStyles = {
    labelStyle: {
        color: "black"
    },
    activeBackgroundColor: "#FED048",
    inactiveBackgroundColor: "#F9F3F3",
    inactiveTintColor: "gray",
    activeTintColor: "black"
}

export const getHeaderName = (route: any) => {
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
            tabBarOptions={{...tabBarStyles}}
        >
            <Tabs.Screen name="Home" component={Home}/>
            <Tabs.Screen name="AddDiary" component={AddDiary} />
            <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
    ): (
    <Tabs.Navigator
        tabBarOptions={{...tabBarStyles}}
    >
        <Tabs.Screen name="Join" component={Join} />
        <Tabs.Screen name="Login" component={Login} />
    </Tabs.Navigator>)
}