/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyDiaries
// ====================================================

export interface getMyDiaries_getMyDiaries_myDiaries_comments_creator {
  __typename: "User";
  id: number;
  name: string;
}

export interface getMyDiaries_getMyDiaries_myDiaries_comments {
  __typename: "Comment";
  id: number;
  comment: string;
  creator: getMyDiaries_getMyDiaries_myDiaries_comments_creator;
  createdAt: any;
}

export interface getMyDiaries_getMyDiaries_myDiaries {
  __typename: "Diary";
  id: number;
  comments: getMyDiaries_getMyDiaries_myDiaries_comments[] | null;
  images: string[] | null;
  rating: number;
  publicOrNot: boolean;
  description: string | null;
  createdAt: any;
  address: string | null;
}

export interface getMyDiaries_getMyDiaries {
  __typename: "GetMyDiariesOutput";
  error: string | null;
  ok: boolean;
  myDiaries: getMyDiaries_getMyDiaries_myDiaries[] | null;
}

export interface getMyDiaries {
  getMyDiaries: getMyDiaries_getMyDiaries;
}
