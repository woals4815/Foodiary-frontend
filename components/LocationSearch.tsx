import React from "react";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const GooglePlacesInput = ({onPress}) => {
    return (
            <GooglePlacesAutocomplete
                placeholder='Search'
                onPress={(data, details) => {
                    let latResult, lngResult, dataResult;
                    if (details){
                        const {
                            geometry: {
                                location: {
                                    lat, lng}
                        }} = details
                        latResult = lat;
                        lngResult = lng;
                        dataResult = data;
                        onPress({latResult, lngResult, dataResult});
                    };
                }}
                query={{
                    key: "AIzaSyA5EIs-B3PN1V_b4Ib6-pCc9djVGtN26ho",
                    language: "ko"
                }}
                styles={{width: "100%", height: "100%"}}
                fetchDetails={true}
                enablePoweredByContainer={false}
                keyboardShouldPersistTaps="handled"
            />
    )
}
export default GooglePlacesInput;