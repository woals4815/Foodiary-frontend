import { useMutation, useQuery } from "@apollo/client/react/hooks";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, Platform, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import JoinButton from "../../components/Button";
import ImagePresenter from "../../components/ImagePresenter";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import MoreButton from "../../components/MoreButton";
import ScrollContainer from "../../components/ScrollContainer";
import { formatDate, trimTextEol } from "../../utils";
import { createComment, createCommentVariables } from "../../__generated__/createComment";
import { deleteComment, deleteCommentVariables } from "../../__generated__/deleteComment";
import { getAllCommentsOfoneDiary, getAllCommentsOfoneDiaryVariables } from "../../__generated__/getAllCommentsOfoneDiary";
import { getMe } from "../../__generated__/getMe";
import { GET_ME_QUERY } from "../Profile/Profile";
import ImageViewer from 'react-native-image-zoom-viewer';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($createCommentInput: CreateCommentInput!){
        createComment(input: $createCommentInput) {
            ok
            error
            commentId
        }
    }
`;
export const GET_ALL_COMMENTS_QUERY = gql`
    query getAllCommentsOfoneDiary($getAllCommentsInput: GetAllCommentsInput!){
        getAllCommentsOfoneDiary(input: $getAllCommentsInput) {
            ok
            error
            allComments{
                id
                creator{
                    id
                    name
                    profilePic
                }
                comment
                createdAt
            }
        }
    }
`;
export const EDIT_COMMENT_MUTATION = gql`
    mutation editComment($editCommentInput: EditCommentInput!){
        editComment(input: $editCommentInput){
            error
            ok
        }
    }
`;
export const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($deleteCommentInput: DeleteCommentInput!){
        deleteComment(input: $deleteCommentInput){
            error
            ok
        }
    }
`;

const ProfileImage= styled.Image``;
const Container = styled.View`
    justify-content: center;
`;
const ImageContainer = styled.View`
    margin-bottom: 25px;
    box-shadow: 0px 0px 20px gray;
    height: ${HEIGHT /2}px;
`;
const ContentContainer = styled.View`
    border-radius: 10px;
    marginTop: 10px;
    box-shadow: 0px 0px 10px gray;
    background-color: white;
`;
const DescriptionContainer = styled.View`
    height: ${HEIGHT/3}px;
`;
const CommentContainer = styled.View`
    paddingVertical: 5px;
`;
const ProfileContainer = styled.View`
    height: ${WIDTH /9}px;
    width: ${WIDTH /9}px;
    border-radius: 30px;
    border: 0.3px;
    align-items: center;
    justify-content: center;
    borderColor: rgba(0,0,0,0.3);
`;
const CommentInputContainer = styled.View`
    flex-direction: row;
    height: ${HEIGHT /10}px;
    align-items: center;
    paddingHorizontal: 5px;
`;

const CommentContentContainer = styled.View`
    height: ${HEIGHT/10}px;
    width: 100%;
    flex-direction: row;
    align-items:center;
    paddingHorizontal: 5px;
    marginBottom: 10px;
    borderBottomWidth: 0.4px;
`;
const CommentUserContentContainer = styled.View`
    flex-direction: column;
    width: ${WIDTH * (8/10)}px;
    justify-content: center;
    paddingHorizontal: 5px;
    position: relative;
    height: 100%;
`;
const Text = styled.Text``;
const SubmitContainer = styled.View`
    width: ${WIDTH /9}px;
    height: ${WIDTH /9}px;
    position: absolute;
    right: 0;
    align-items: center;
    justify-content: center;
`;
const ButtonContainer = styled.View`
`;
const moreTextContainer = styled.View`
`;
const OneDiary = ({navigation, route}: any) => {
    const  { params: { diary } } = route;
    const [isAbstract, setIsAbsctract] = useState(true);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [commentClickedMore, setCommentClickedMore] = useState<any>([]);
    const [isZoom, setIsZoom] =useState(false);
    const [clickedImage, setClickedImage] = useState<any>();
    const zoomImages = diary.images.map((image) => {
        return {url: image} 
     });
    const {data, loading: myLoading} = useQuery<getMe>(GET_ME_QUERY);
    const moreOnPress = (commentId: number) => {
        if (commentClickedMore?.includes(commentId)){
            const newCommentIds= commentClickedMore.filter((id: number) => id !== commentId );
            setCommentClickedMore(newCommentIds);
        } else {
            const newCommentIds = [...commentClickedMore, commentId];
            setCommentClickedMore(newCommentIds);
        }
    };
    const createCommentOnCompleted = (data: createComment) => {
        const { createComment: {
            ok, error
        }} = data;
        if (ok) {
            setKeyword("");
            Alert.alert("댓글 작성 완료", '', [
                {
                    text: "확인",
                    onPress: () => {
                        refetch();
                    }
                }
            ]);
        };
    };
    const deleteCommentOnCompleted = (data: deleteComment) => {
        const { deleteComment: {
            ok, error
        } } = data;
        if (ok){
            Alert.alert("삭제 완료", '', [
                {
                    text: "확인",
                    onPress: () => {
                        refetch();
                    }
                }
            ]);
        };
    }
    const [createComment, {data:createCommentData, error,loading: createCommentLoading}] = useMutation<createComment, createCommentVariables>(CREATE_COMMENT_MUTATION,{
        onCompleted: createCommentOnCompleted,
    });
    const [deleteComment, {data:deleteCommentData, error: deleteCommentError, loading: deleteCommentLoading }] = useMutation<deleteComment, deleteCommentVariables>(DELETE_COMMENT_MUTATION, {
        onCompleted: deleteCommentOnCompleted
    });
    const { data: commentsData, error:commentsError, loading: commentsLoading, refetch} = useQuery<getAllCommentsOfoneDiary, getAllCommentsOfoneDiaryVariables>(GET_ALL_COMMENTS_QUERY,{
        variables: {
            getAllCommentsInput: {
                diaryId: diary.id
            }
        },
    });
    const {register, handleSubmit, setValue, getValues} = useForm();
    const refreshFn = () => {
        setLoading(true);
        setLoading(false);
    };
    const onPress = () => {
        if (isAbstract) {
            setIsAbsctract(false);
        } else {
            setIsAbsctract(true);
        }
    };
    const onDelete = async(commentId: number) => {
        try{
            await deleteComment({
                variables: {
                    deleteCommentInput: {
                        commentId
                    }
                }
            })
        }catch(error){
            console.log(error);
            Alert.alert("삭제 실행 오류가 발생 했습니다.");
        }
    }
    const onCommentPress = async() => {
        try{
            const { comment } = getValues();
            await createComment({
                variables: {
                    createCommentInput: {
                        diaryId: diary.id,
                        comment: keyword ?? comment
                    }
                }
            });
        }catch(error){
            console.log(error);
            Alert.alert("오류가 발생했습니다.");
        }
    };
    const zoomOnPress = (imageId) => {
        if (isZoom) {
            setIsZoom(false);
            setClickedImage(null);
        } else {
            setIsZoom(true);
            setClickedImage(imageId);
        };
    };
    useEffect(() => {
        register("comment");
        refetch();
    },[register, commentsData]);
    return !isZoom ? (
        <>
            <ScrollContainer
            refreshFn={refreshFn}
            loading={loading}
            contentContainerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}
            showsVerticalScrollIndicator={false}
        >
            <Container>
                <ImageContainer>
                    <Swiper
                        showsButtons={diary.images.length > 1 ? true: false}
                        paginationStyle={{
                            bottom: -25
                        }}
                    >
                    {diary.images.map((image: any, index: any) => (
                        <TouchableOpacity onPress={() => zoomOnPress(index)} key={index}>
                            <ImagePresenter 
                                imageUri={image}
                                resizeMode={"contain"}
                                key={index}
                                imageStyle={{
                                    height: HEIGHT/2
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                    </Swiper>
                </ImageContainer>
                <JoinButton 
                title={isAbstract ? "자세히": "간략히"} 
                onPress={onPress}
                buttonStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: "#E3FBFF",
                    width: WIDTH/4,
                    borderRadius: 10,
                    shadowColor: "gray",
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowOpacity: 0.7,
                    alignItems: "center"
                }} 
                textStyle={{
                    fontSize: 10
                }}
                />
                {!isAbstract && (
                    <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{
                        flex: 1
                    }}
                    >
                    <Text style={{position: "absolute", right: 0, top: -20, fontSize: 12}}>평점 {"😋".repeat(diary.rating)}</Text>
                    <ContentContainer>
                        <DescriptionContainer>
                            <ScrollContainer
                                contentContainerStyle={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 5
                                }}
                            >
                                <Text>{diary.description}</Text>
                            </ScrollContainer>
                        </DescriptionContainer>
                    </ContentContainer>
                    <CommentContainer>
                            <CommentInputContainer>
                                <ProfileContainer>
                                    <ProfileImage 
                                        source={{
                                            uri: data?.getMe.profilePic
                                        }}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 30,
                                        }}
                                    />
                                </ProfileContainer>
                                <Input 
                                    inputStyle={{
                                        width: "88%",
                                        height: "60%",
                                        fontSize: 14,
                                        paddingHorizontal: 5,
                                        paddingTop: 15
                                    }}
                                    placeholder={"댓글 쓰기"}
                                    multiline={true}
                                    onChange={(text: string) => {
                                        setKeyword(text);
                                        setValue("comment", text);
                                    }}
                                    value={keyword}
                                />
                                <SubmitContainer>
                                    {!createCommentLoading ? (
                                    <TouchableOpacity style={{width: "100%", height: "100%", justifyContent: "center"}} onPress={onCommentPress}>
                                        <Text style={{fontSize: 25}}>👉</Text>
                                    </TouchableOpacity>
                                    ): <ActivityIndicator size="small" color="black" />}
                                </SubmitContainer>
                            </CommentInputContainer>
                            {!commentsLoading? 
                                commentsData?.getAllCommentsOfoneDiary.allComments?.slice(0).sort(function(a,b){return a.id-b.id}).reverse().map((comment: any) => {
                                    let abstractComment;
                                    const commentLength = (comment.comment).split("\n").length;
                                    if (commentLength > 2){
                                        abstractComment = trimTextEol(comment.comment);
                                    } else {
                                        abstractComment = comment.comment;
                                    };
                                    return (
                                    <CommentContentContainer key={comment.id} style={commentClickedMore?.includes(comment.id)? {height: HEIGHT/2}:{} }>
                                        <ProfileContainer>
                                            <ProfileImage 
                                                source={{
                                                    uri: comment.creator.profilePic,
                                                    
                                                }}
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    borderRadius: 30,
                                                }}
                                            />
                                        </ProfileContainer>
                                        <Text style={{ fontWeight: "700", position: "absolute", top: -8, left: 6}}>{comment.creator.name}</Text>
                                        <CommentUserContentContainer>
                                            {commentLength >2 ? 
                                                <>
                                                    {commentClickedMore?.includes(comment.id) ? <Text>{comment.comment}</Text> : <Text>{abstractComment}</Text>}
                                                    <MoreButton onPress={() => {
                                                        moreOnPress(comment.id);
                                                    }}/>
                                                </>
                                            : 
                                                <Text>{abstractComment}</Text>
                                            }
                                        </CommentUserContentContainer>
                                        <Text style={{position: "absolute", right:0, bottom: 3, fontSize: 9, color: "rgba(0,0,0,0.4)"}}>{formatDate(comment.createdAt)}</Text>
                                        {comment.creator.id === data?.getMe.id ? 
                                            (
                                                <ButtonContainer key={comment.id}>
                                                    <TouchableOpacity onPress={() => onDelete(comment.id)}>
                                                        <Text style={{fontSize: 15}}>✕</Text>
                                                    </TouchableOpacity>
                                                </ButtonContainer>
                                            )
                                        : (<></>)}
                                    </CommentContentContainer>)
                            })
                            :
                            <Loading />
                            }
                        </CommentContainer>
                </KeyboardAvoidingView>
                )}
            </Container>
        </ScrollContainer>
        </>
    ) : (
        <Modal visible={true} transparent={true}>
            <ImageViewer imageUrls={zoomImages} onClick={zoomOnPress} enablePreload={true} index={clickedImage} />
        </Modal>
    )
}

export default OneDiary;