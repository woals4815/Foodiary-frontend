import React from "react";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
                    key: "AIzaSyCnicwIWWlqNWvZcK2-BnkNcaPVOxVdM4U",
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