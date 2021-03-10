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

export interface CreateDiaryInput {
  description?: string | null;
  images?: string[] | null;
  publicOrNot?: boolean | null;
  rating?: number | null;
}

export interface LoginIntput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
