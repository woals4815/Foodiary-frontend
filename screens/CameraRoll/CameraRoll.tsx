import React, { useLayoutEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    height: ${HEIGHT}px;
    width: ${WIDTH}px;
    flex: 1;
    flex-direction: row;
    flexWrap: wrap
`;

const Image = styled.Image`
    height: ${WIDTH/3}px;
    width: ${WIDTH/3}px;
`
const Text = styled.Text`
    font-size: 10px;
`
const ButtonWholeContainer = styled.View`
    flex: 1;
    position: absolute;
    flexDirection: row;
    bottom: 20px;
    justifyContent: space-between;
`;
const ButtonContainer = styled.View`
`;
const ButtonText= styled.Text`
    font-size: 20px;
`


const CameraRoll = ({navigation, route}: any) => {
    const [selectImages, setSelectImages] = useState<any>([]);
    const { 
        params: { images }
    } = route;
    useLayoutEffect(() => {
        const title = "Camera Roll";
        navigation.setOptions({
          title: title,
        });
      }, [route]);
    const imagesGotten = [...images];
    const onPress = (imageUri: any) => {
      if (selectImages.includes(imageUri)) {
        if (selectImages.length === 1) {
            setSelectImages([]);
        }else {
            const selectImagesFiltered = selectImages.filter((image:any) => image !== imageUri);
            setSelectImages(selectImagesFiltered);
        }
      } else {
        const selectImagesIncludeNewOne = [...selectImages, imageUri];
        setSelectImages(selectImagesIncludeNewOne);
      }
    };
    const canceledWholeImage = () => {
        setSelectImages([]);
    }
    const passSelectedImages = () => {
        navigation.navigate("AddDiary", {selectImages});
    }
    console.log(selectImages);
    return (
        <>
            <Container>
            {imagesGotten && imagesGotten.map((image) => 
                <TouchableOpacity key={image.id} onPress={() => {
                    onPress(image.uri);
                }} ><Image source={{uri: image.uri}} key={image.id} /></TouchableOpacity>
            )}
            </Container>
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