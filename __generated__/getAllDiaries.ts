/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllDiaries
// ====================================================

export interface getAllDiaries_getAllDiaries_diaries_creator {
  __typename: "User";
  id: number;
  name: string;
  profilePic: string | null;
}

export interface getAllDiaries_getAllDiaries_diaries_comments_creator {
  __typename: "User";
  name: string;
  profilePic: string | null;
}

export interface getAllDiaries_getAllDiaries_diaries_comments {
  __typename: "Comment";
  comment: string;
  createdAt: any;
  updatedAt: any;
  creator: getAllDiaries_getAllDiaries_diaries_comments_creator;
}

export interface getAllDiaries_getAllDiaries_diaries {
  __typename: "Diary";
  id: number;
  creator: getAllDiaries_getAllDiaries_diaries_creator;
  comments: getAllDiaries_getAllDiaries_diaries_comments[] | null;
  createdAt: any;
  images: string[] | null;
  publicOrNot: boolean;
  rating: number;
  updatedAt: any;
  description: string | null;
  address: string | null;
}

export interface getAllDiaries_getAllDiaries {
  __typename: "getAllDiariesOutput";
  ok: boolean;
  error: string | null;
  diaries: getAllDiaries_getAllDiaries_diaries[] | null;
}

export interface getAllDiaries {
  getAllDiaries: getAllDiaries_getAllDiaries;
}
