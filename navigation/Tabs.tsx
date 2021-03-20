import { useReactiveVar } from "@apollo/client";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { isLoggedInVar } from "../apollo";
import Home from "../screens/Home/Home";
import { Ionicons } from "@expo/vector-icons";
import Login from "../screens/Login";
import Join from "../screens/Join";
import AddDiary from "../screens/AddDiary/AddDiary";
import { Dimensions, Platform } from "react-native";
import Profile from "../screens/Profile/Profile";
import SearchUser from "../screens/Search/SearchUser";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Tabs = createMaterialBottomTabNavigator();

export const getHeaderName = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Join";
    return routeName; //route?.state?.routeNames[route.state.index] || "Movies"; (temporary solution)
  };
export default (props: any) => {
    const {navigation , route} = props;
    useLayoutEffect(() => {
        const title = getHeaderName(route);
        navigation.setOptions({
          title: title === "Search" ? "Search User": title,
        });
      }, [route]);
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return isLoggedIn ? (
        <Tabs.Navigator
            initialRouteName="Home"
            activeColor="black"
            inactiveColor="gray"
            shifting={true}
            labeled={true}
            barStyle={{ backgroundColor: '#F9F3F3' }}
        >
            <Tabs.Screen name="Home" component={Home}/>
            <Tabs.Screen name="Search" component={SearchUser} />
            <Tabs.Screen name="Add Diary" component={AddDiary} />
            <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
    ): (
    <Tabs.Navigator
        initialRouteName="Join"
        activeColor="black"
        inactiveColor="gray"
        barStyle={{ backgroundColor: '#E3FBFF' }}
        shifting={true}
    >
        <Tabs.Screen name="Join" component={Join} />
        <Tabs.Screen name="Login" component={Login} />
    </Tabs.Navigator>)
}