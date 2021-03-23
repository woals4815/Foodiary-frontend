import React, { useLayoutEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ScrollContainer from "../../components/ScrollContainer";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex-direction: row;
    flexWrap: wrap
`;

const Image = styled.Image`
    height: ${WIDTH/3}px;
    width: ${WIDTH/3}px;
`;
const ButtonWholeContainer = styled.View`
    position: absolute;
    flexDirection: row;
    bottom: 20px;
    justifyContent: space-between;
    background-color: white;
    bottom: 0px;
    width: 100%;
    paddingVertical: 20px;
    paddingHorizontal: 40px;
`;
const ButtonContainer = styled.View`
    background-color: white;
`;
const ButtonText= styled.Text`
    font-size: 15px;
`;
const SelectImageContainer = styled.View`
    height: ${WIDTH/3}px;
    width: ${WIDTH/3}px;
    position: absolute;
    background-color: rgba(255,255,255,0.8);
    z-index: 10;
`;

const CameraRoll = ({navigation, route}: any) => {
    const [selectImages, setSelectImages] = useState<any>([]);
    const { 
        params: { images, paramsName, diaryId }
    } = route;
    useLayoutEffect(() => {
        const title = "Camera Roll";
        navigation.setOptions({
          title: title,
        });
      }, [route]);
    const imagesGotten = [...images];
    const onPress = (image: any) => {
      if (selectImages.includes(image)) {
        if (selectImages.length === 1) {
            setSelectImages([]);
        }else {
            const selectImagesFiltered = selectImages.filter((item:any) => item.uri !== image.uri);
            setSelectImages(selectImagesFiltered);
        }
      } else {
        const selectImagesIncludeNewOne = [...selectImages, image];
        setSelectImages(selectImagesIncludeNewOne);
      }
    };
    const canceledWholeImage = () => {
        if (selectImages.length > 0){
            setSelectImages([]);
        }else {
            navigation.goBack();
        }
    }
    const passSelectedImages = () => {
        if (paramsName === "Profile") {
            navigation.navigate("Profile", {selectImages});
        }else if (paramsName === "DiaryCard"){
            navigation.navigate("My Diary", {selectImages, diaryId});
        }else {
            navigation.navigate("Add Diary" , {selectImages});
        }
    }
    return (
    <>
        <ScrollContainer>
            <Container>
                {imagesGotten && imagesGotten.map((image) => 
                    (
                    <TouchableOpacity key={image.id} onPress={() => {
                        onPress(image);
                    }} 
                    >
                        {selectImages.includes(image) ? 
                            <SelectImageContainer>
                            </SelectImageContainer> 
                        : <></>
                        }
                        <Image source={{uri: image.uri}} key={image.id} />
                    </TouchableOpacity>
                    )
                )}
            </Container>    
        </ScrollContainer>
        <ButtonWholeContainer>
                <TouchableOpacity onPress={canceledWholeImage}>
                    <ButtonContainer>
                        <ButtonText>
                            Cancel
                        </ButtonText>
                    </ButtonContainer>
                </TouchableOpacity>
                <TouchableOpacity onPress={passSelectedImages}>
                <ButtonContainer>
                    <ButtonText>
                        Select
                    </ButtonText>
                </ButtonContainer>
            </TouchableOpacity>
        </ButtonWholeContainer>       
    </>
    )
}

export default CameraRoll;