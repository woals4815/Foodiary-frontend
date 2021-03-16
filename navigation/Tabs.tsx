import { useReactiveVar } from "@apollo/client";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
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

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Tabs = createBottomTabNavigator();

const tabBarStyles = {
    showLabel: false,
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
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    let iconName = Platform.OS === "ios" ?"ios-" : "md-"
                    if (route.name === "Home") {
                        iconName +="home-sharp"
                    } else if(route.name ==="AddDiary") {
                        iconName += "add-circle-sharp"
                    } else if(route.name === "Profile") {
                        iconName += "person"
                    }
                    return(
                        <Ionicons
                          name={"mic"}
                          color={focused ? "white" : "grey"}
                          size={26}
                        />
                    );
                }
            })}
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