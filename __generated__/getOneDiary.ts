/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOneDiaryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOneDiary
// ====================================================

export interface getOneDiary_getOneDiary_myDiary_comments_creator {
  __typename: "User";
  id: number;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface getOneDiary_getOneDiary_myDiary_comments {
  __typename: "Comment";
  id: number;
  comment: string;
  creator: getOneDiary_getOneDiary_myDiary_comments_creator;
}

export interface getOneDiary_getOneDiary_myDiary {
  __typename: "Diary";
  id: number;
  comments: getOneDiary_getOneDiary_myDiary_comments[] | null;
  createdAt: any;
  description: string | null;
  images: string[] | null;
  publicOrNot: boolean;
  rating: number;
  updatedAt: any;
  address: string | null;
}

export interface getOneDiary_getOneDiary {
  __typename: "GetOneDiaryOutput";
  ok: boolean;
  error: string | null;
  myDiary: getOneDiary_getOneDiary_myDiary | null;
}

export interface getOneDiary {
  getOneDiary: getOneDiary_getOneDiary;
}

export interface getOneDiaryVariables {
  getOneDiaryInput: GetOneDiaryInput;
}
