/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchUserInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchUser
// ====================================================

export interface searchUser_searchUser_users {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profilePic: string | null;
}

export interface searchUser_searchUser {
  __typename: "SearchUserOutput";
  error: string | null;
  ok: boolean;
  users: searchUser_searchUser_users[] | null;
}

export interface searchUser {
  searchUser: searchUser_searchUser;
}

export interface searchUserVariables {
  searchInput: SearchUserInput;
}
