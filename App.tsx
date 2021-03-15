import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import {Image} from "react-native";
import React, { useEffect, useState } from 'react';
import * as Font from "expo-font";
import styled from 'styled-components/native';
import { client, isLoggedInVar } from './apollo';
import { Asset } from 'expo-asset';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from "@react-navigation/native";
import Stack from './navigation/Stack';




const Text = styled.Text`
  color: black;
  margin-left: 100px;
  margin-top: 100px
`
export const cacheImages = async(images: any) =>
  images?.map( async(image: any) => {
    if (typeof image === "string") {
      return await Image.prefetch(image);
    } else {
      return await Asset.fromModule(image).downloadAsync();
    }
  });
const cacheFonts = async(fonts: any) =>
  fonts?.map(async(font: any) => await [Font.loadAsync(font), Font.loadAsync(font)]);
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = async() => {
    const images = await cacheImages([
      "https://images.unsplash.com/photo-1572177191856-3cde618dee1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=582&q=80",
      require("./assets/splash.png"),
    ]);
    const fonts = await cacheFonts([Ionicons.font, FontAwesome.font]);
    return await Promise.all([...images, ...fonts]);
  };
  const onFinish = () => setIsReady(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isReady ? (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack />
        </NavigationContainer>
      </ApolloProvider>
    </>
  ): (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    />
  );
}
