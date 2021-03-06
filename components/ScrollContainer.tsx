import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";


const ScrollContainer = ({ children, contentContainerStyle, loading, refreshFn,horizontal, showsVerticalScrollIndicator }: any) => {
    const [refresh, setRefresh] = useState(false);
    const onRefresh = async () => {
        setRefresh(true);
        if (refreshFn){
            await refreshFn();
        }
        setRefresh(false);
      };
    return (
        <ScrollView
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            contentContainerStyle={{
                ...contentContainerStyle
            }}
            refreshControl={
                <RefreshControl 
                    onRefresh={onRefresh}
                    refreshing={refresh}
                    enabled={true}
                    tintColor={"black"}
                />
            }
            horizontal={horizontal}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
        >
            {loading? <ActivityIndicator color="black" size="small" />:children}
        </ScrollView>
    );
};

export default ScrollContainer;