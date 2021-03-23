/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCommentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_createComment {
  __typename: "CreateCommentOutput";
  ok: boolean;
  error: string | null;
  commentId: number | null;
}

export interface createComment {
  createComment: createComment_createComment;
}

export interface createCommentVariables {
  createCommentInput: CreateCommentInput;
}
