/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteDiaryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteDiary
// ====================================================

export interface deleteDiary_deleteDiary {
  __typename: "DeleteDiaryOutput";
  error: string | null;
  ok: boolean;
}

export interface deleteDiary {
  deleteDiary: deleteDiary_deleteDiary;
}

export interface deleteDiaryVariables {
  deleteDiaryInput: DeleteDiaryInput;
}
