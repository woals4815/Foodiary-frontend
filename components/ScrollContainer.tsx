import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";


const ScrollContainer = ({ children, contentContainerStyle }: any) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                ...contentContainerStyle
            }}
        >
            {children}
        </ScrollView>
    );
};

export default ScrollContainer;