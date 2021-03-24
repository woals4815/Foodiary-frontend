/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCommentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteComment
// ====================================================

export interface deleteComment_deleteComment {
  __typename: "CommonOutput";
  error: string | null;
  ok: boolean;
}

export interface deleteComment {
  deleteComment: deleteComment_deleteComment;
}

export interface deleteCommentVariables {
  deleteCommentInput: DeleteCommentInput;
}
