import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                console.log(data, details);
            }}
            query={{
                key: "AIzaSyA5EIs-B3PN1V_b4Ib6-pCc9djVGtN26ho",
                language: 'kr',
            }}
            styles={{width: "100%"}}
        />
    )
}
export default GooglePlacesInput;