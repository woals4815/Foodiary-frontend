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
import Map from "../screens/Map/Map";

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
          title: title === "Search" ? "친구 찾기": title,
        });
      }, [route]);
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return isLoggedIn ? 
    (
        <Tabs.Navigator
            initialRouteName={"Map"}
            activeColor="black"
            inactiveColor="gray"
            shifting={true}
            labeled={true}
            barStyle={{ backgroundColor: '#F9F3F3'}}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    let iconName;
                    if (route.name === "Home") {
                      iconName = "ios-home-sharp";
                    } else if (route.name === "Add Diary") {
                      iconName = "add-circle";
                    } else if (route.name === "Search") {
                      iconName = "search";
                    } else if (route.name === "Profile") {
                      iconName = "ios-person";
                    } else if(route.name === 'Map') {
                      iconName = "pin";
                    }
                    return (
                      <Ionicons
                        name={iconName}
                        color={focused ? "black" : "grey"}
                        size={24}
                      />
                    );
                  },
            })}
        >
            <Tabs.Screen name="Home" component={Home}/>
            <Tabs.Screen name="Search" component={SearchUser} />
            <Tabs.Screen name="Map" component={Map} />
            <Tabs.Screen name="Add Diary" component={AddDiary} />
            <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
    ): (
    <Tabs.Navigator
        initialRouteName="Join"
        activeColor="black"
        inactiveColor="gray"
        barStyle={{ backgroundColor: '#F9F3F3' }}
        shifting={true}
        screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => {
                let iconName;
                if (route.name === "Join") {
                  iconName = "create";
                } else if (route.name === "Login") {
                  iconName = "log-in";
                }
                return (
                  <Ionicons
                    name={iconName}
                    color={focused ? "black" : "grey"}
                    size={24}
                  />
                );
              },
        })}
    >
        <Tabs.Screen name="Join" component={Join} />
        <Tabs.Screen name="Login" component={Login} />
    </Tabs.Navigator>)
}