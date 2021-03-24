/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCommentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editComment
// ====================================================

export interface editComment_editComment {
  __typename: "EditCommentOutput";
  error: string | null;
  ok: boolean;
}

export interface editComment {
  editComment: editComment_editComment;
}

export interface editCommentVariables {
  editCommentInput: EditCommentInput;
}
