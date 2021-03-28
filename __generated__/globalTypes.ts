/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateAccountInput {
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
  profilePic?: string | null;
}

export interface CreateCommentInput {
  comment: string;
  diaryId: number;
}

export interface CreateDiaryInput {
  address?: string | null;
  description?: string | null;
  images?: string[] | null;
  publicOrNot?: boolean | null;
  rating?: number | null;
}

export interface DeleteCommentInput {
  commentId: number;
}

export interface DeleteDiaryInput {
  diaryId: number;
}

export interface EditCommentInput {
  comment: string;
  commentId: number;
}

export interface EditDiaryInput {
  address?: string | null;
  description?: string | null;
  diaryId: number;
  images?: string[] | null;
  publicOrNot?: boolean | null;
  rating?: number | null;
}

export interface EditProfileInput {
  confirmPassword?: string | null;
  email?: string | null;
  name?: string | null;
  password?: string | null;
  profilePic?: string | null;
}

export interface GetAllCommentsInput {
  diaryId: number;
}

export interface LoginIntput {
  email: string;
  password: string;
}

export interface SearchUserInput {
  query: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
