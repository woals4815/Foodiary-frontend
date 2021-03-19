/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_userProfile_user_myDiaries_comments_creator {
  __typename: "User";
  id: number;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface userProfile_userProfile_user_myDiaries_comments {
  __typename: "Comment";
  id: number;
  comment: string;
  creator: userProfile_userProfile_user_myDiaries_comments_creator;
}

export interface userProfile_userProfile_user_myDiaries {
  __typename: "Diary";
  id: number;
  comments: userProfile_userProfile_user_myDiaries_comments[] | null;
  createdAt: any;
  description: string | null;
  images: string[] | null;
  publicOrNot: boolean;
  rating: number;
  updatedAt: any;
}

export interface userProfile_userProfile_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profilePic: string | null;
  myDiaries: userProfile_userProfile_user_myDiaries[];
}

export interface userProfile_userProfile {
  __typename: "UserProfileOutput";
  error: string | null;
  ok: boolean;
  user: userProfile_userProfile_user | null;
}

export interface userProfile {
  userProfile: userProfile_userProfile;
}

export interface userProfileVariables {
  userId: number;
}
