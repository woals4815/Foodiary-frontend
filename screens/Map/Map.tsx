import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import styled from "styled-components/native";
import GooglePlacesInput from "../../components/LocationSearch";
import * as Location from 'expo-location';
import { ActivityIndicator, Alert, Dimensions, Keyboard, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useQuery } from "@apollo/client/react/hooks";
import { GET_ALL_DIARIES } from "../Home/Home";
import { getAllDiaries } from "../../__generated__/getAllDiaries";
import { gql } from "@apollo/client";
import { getDiariesByAddress, getDiariesByAddressVariables } from "../../__generated__/getDiariesByAddress";
import ScrollContainer from "../../components/ScrollContainer";
import ImagePresenter from "../../components/ImagePresenter";
import { useAssets } from "expo-asset";


const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const GET_DIARIES_BY_ADDRESS_QUERY = gql`
    query getDiariesByAddress($addressInput: String!){
        getDiariesByAddress(input: $addressInput){
            ok
            error
            diaries{
                id
                rating
                creator{
                    id
                    name
                    profilePic
                }
            }
        }
    }
`;

const Container = styled.View`
    flex: 1;
`;
const Text= styled.Text`
    font-size: 8px;
`;
const NumberContainer = styled.View`
    paddingVertical: 5px;
    paddingHorizontal: 10px;
    background-color: #FED048;
    border-radius: 5px;
    box-shadow: 0px 0px 2px gray;
`;
const UserContainer = styled.View`
    flex-direction: row;
    align-items: center;
    borderBottomWidth: 0.4px;
    paddingVertical: 5px;
    paddingHorizontal: 10px;
    background-color: white;
    box-shadow: 0px 0px 4px gray; 
    border-radius: 10px;
`;
const CloseContainer = styled.View`
    border-radius: 5px;
    paddingVertical: 5px;
    paddingHorizontal: 5px;
    width: 25%;
    background-color: #F9F3F3;
    box-shadow: 0px 0px 3px gray;
`;
const Map = (props: any) => {
    let addresses = new Array<string>();
    let diaries = new Array<any>();
    const {navigation, route} = props;
    const useFilter = arr => {
        return arr.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      };
    const [location ,setLocation] = useState<any>();
    const [modalVisible, setModalVisible] = useState(false);
    const [cardsDetail, setCardsDetail] = useState<any>();
    const [errorMsg, setErrorMsg] = useState("");
    const [searchRegion, setSearchregion] = useState<any>();
    const initialRegion = {
        latitude: 37.551853,
        longitude: 126.937597,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
    const {data, error, loading, refetch} = useQuery<getAllDiaries>(GET_ALL_DIARIES);
    if (data?.getAllDiaries.diaries){
        data.getAllDiaries.diaries.map((diary) => diary.address && addresses.push(diary.address));
    };
    const result= useFilter(addresses);
    result.map((address) => {
        const { data, error, } = useQuery<getDiariesByAddress,getDiariesByAddressVariables>(GET_DIARIES_BY_ADDRESS_QUERY, {
            variables: {
                addressInput: address
            }
        });
        if (data?.getDiariesByAddress.ok){
            diaries.push({diaries: data.getDiariesByAddress.diaries, address: address});
        }
    });
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
    }, []);
    const onPress= (index: number) => {
        if (modalVisible) {
            setModalVisible(false);
            setCardsDetail(null);
        } else {
            setModalVisible(true);
            setCardsDetail(diaries[index]);
        }
    };
    const [assets] = useAssets([require("../../assets/blank-profile-picture-973460_640.png")]);
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
                    {diaries.map((diary, index) => {
                        return (diary.address ?
                                <Marker 
                                    coordinate={{
                                        latitude: JSON.parse(diary.address).latResult,
                                        longitude: JSON.parse(diary.address).lngResult,
                                    }}
                                    key={index}
                                    onPress={() => onPress(index)}
                                >
                                    <NumberContainer>
                                        <Text>{diary.diaries.length === 1 ?`${diary.diaries.length}개 카드`: `${diary.diaries.length}개 카드`}</Text>
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                >
                    <ScrollContainer
                        contentContainerStyle={{
                            justifyContent: "space-around",
                            flex: 1,
                            backgroundColor: "#F9F3F3",
                            alignItems: "center",
                        }}
                    >
                        {cardsDetail ? 
                            cardsDetail.diaries.map((diary,index) => (
                                <TouchableOpacity 
                                onPress={() => {
                                    navigation.navigate("Person Diary", { id: diary.creator.id, name: diary.creator.name, profilePic: assets[0].uri });
                                    setCardsDetail(null);
                                    setModalVisible(false);
                                }}
                                key={index}
                                >
                                    <UserContainer key={index}>
                                        <ImagePresenter 
                                            imageUri={diary.creator.profilePic}
                                            imageStyle={{
                                                backgroundColor: "gray",
                                                width: WIDTH / 7,
                                                height: WIDTH / 7,
                                                borderRadius: WIDTH / 7,
                                                marginRight: 10
                                            }}
                                        />
                                        <Text style={{fontSize: 20}}>{diary.creator.name} 님의 카드</Text>
                                    </UserContainer>
                                </TouchableOpacity>
                            ))
                        : 
                        <Text>
                            결과 없음    
                        </Text>}
                        <TouchableOpacity onPress={() => onPress(0)}>
                            <CloseContainer>
                                <Text style={{fontSize: 20, textAlign: "center"}}>Close</Text>
                            </CloseContainer>
                        </TouchableOpacity>
                    </ScrollContainer>
                </Modal>
            </Container>: <ActivityIndicator color="black" size="large" />}
        </TouchableWithoutFeedback>
    )

};

export default Map;