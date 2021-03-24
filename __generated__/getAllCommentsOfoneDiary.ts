/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAllCommentsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getAllCommentsOfoneDiary
// ====================================================

export interface getAllCommentsOfoneDiary_getAllCommentsOfoneDiary_allComments_creator {
  __typename: "User";
  id: number;
  name: string;
  profilePic: string | null;
}

export interface getAllCommentsOfoneDiary_getAllCommentsOfoneDiary_allComments {
  __typename: "Comment";
  id: number;
  creator: getAllCommentsOfoneDiary_getAllCommentsOfoneDiary_allComments_creator;
  comment: string;
  createdAt: any;
}

export interface getAllCommentsOfoneDiary_getAllCommentsOfoneDiary {
  __typename: "GetAllCommentsOutput";
  ok: boolean;
  error: string | null;
  allComments: getAllCommentsOfoneDiary_getAllCommentsOfoneDiary_allComments[] | null;
}

export interface getAllCommentsOfoneDiary {
  getAllCommentsOfoneDiary: getAllCommentsOfoneDiary_getAllCommentsOfoneDiary;
}

export interface getAllCommentsOfoneDiaryVariables {
  getAllCommentsInput: GetAllCommentsInput;
}
