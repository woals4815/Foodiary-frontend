/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDiariesByAddress
// ====================================================

export interface getDiariesByAddress_getDiariesByAddress_diaries_creator {
  __typename: "User";
  id: number;
  name: string;
  profilePic: string | null;
}

export interface getDiariesByAddress_getDiariesByAddress_diaries {
  __typename: "Diary";
  id: number;
  rating: number;
  creator: getDiariesByAddress_getDiariesByAddress_diaries_creator;
}

export interface getDiariesByAddress_getDiariesByAddress {
  __typename: "getAllDiariesOutput";
  ok: boolean;
  error: string | null;
  diaries: getDiariesByAddress_getDiariesByAddress_diaries[] | null;
}

export interface getDiariesByAddress {
  getDiariesByAddress: getDiariesByAddress_getDiariesByAddress;
}

export interface getDiariesByAddressVariables {
  addressInput: string;
}
