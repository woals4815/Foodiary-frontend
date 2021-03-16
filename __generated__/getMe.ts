/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMe
// ====================================================

export interface getMe_getMe {
  __typename: "User";
  id: number;
  email: string;
  name: string;
  profilePic: string | null;
}

export interface getMe_getMyDiaries_myDiaries {
  __typename: "Diary";
  id: number;
}

export interface getMe_getMyDiaries {
  __typename: "GetMyDiariesOutput";
  ok: boolean;
  error: string | null;
  myDiaries: getMe_getMyDiaries_myDiaries[] | null;
}

export interface getMe {
  getMe: getMe_getMe;
  getMyDiaries: getMe_getMyDiaries;
}
