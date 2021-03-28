import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import styled from "styled-components/native";
import GooglePlacesInput from "../../components/LocationSearch";
import * as Location from 'expo-location';
import { ActivityIndicator, Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useQuery } from "@apollo/client/react/hooks";
import { GET_ALL_DIARIES } from "../Home/Home";
import { getAllDiaries } from "../../__generated__/getAllDiaries";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex: 1;
`;
const Text= styled.Text`
    font-size: 8px;
`;
const NumberContainer = styled.View`
    paddingVertical: 5px;
    paddingHorizontal: 10px;
    background-color: #F9F3F3;
    border-radius: 5px;
    box-shadow: 0px 0px 2px gray;
`;
const Map = (props: any) => {
    const {navigation, route} = props;
    const [location ,setLocation] = useState<any>();
    const [errorMsg, setErrorMsg] = useState("");
    const [searchRegion, setSearchregion] = useState<any>();
    const initialRegion = {
        latitude: 37.551853,
        longitude: 126.937597,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
    const {data, error, loading, refetch} = useQuery<getAllDiaries>(GET_ALL_DIARIES);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
        refetch();
    }, [route]);
    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            {!loading ? 
            <Container>
                <MapView 
                    style={{
                        width: WIDTH,
                        height: HEIGHT,
                        position: "absolute",
                        zIndex: -2,
                    }}
                    loadingEnabled={true}
                    initialRegion={location ? {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }: {
                        ...initialRegion
                    }}
                    region={searchRegion ? {
                        latitude: searchRegion.latResult,
                        longitude: searchRegion.lngResult,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }: {...initialRegion}}
                >
                    {searchRegion ? 
                        <Marker 
                            coordinate={{
                                latitude: searchRegion.latResult,
                                longitude: searchRegion.lngResult
                            }}
                        />
                    : <></>}
                    {data?.getAllDiaries.diaries?.map((diary, index) => {
                        return (diary.address ?
                                <Marker 
                                    coordinate={{
                                        latitude: JSON.parse(diary.address).latResult,
                                        longitude: JSON.parse(diary.address).lngResult,
                                    }}
                                    key={index}
                                >
                                    <NumberContainer>
                                        <Text>{JSON.parse(diary.address).dataResult.structured_formatting.main_text}</Text>
                                    </NumberContainer>
                                </Marker>
                        : 
                        <></>)
                        
                    })}
                </MapView>
                <GooglePlacesInput 
                    onPress={setSearchregion}
                />
            </Container>: <ActivityIndicator color="black" size="large" />}
        </TouchableWithoutFeedback>
    )

};

export default Map;