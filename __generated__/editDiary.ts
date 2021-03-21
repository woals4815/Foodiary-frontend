/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditDiaryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editDiary
// ====================================================

export interface editDiary_editDiary {
  __typename: "EditDiaryOutput";
  ok: boolean;
  error: string | null;
}

export interface editDiary {
  editDiary: editDiary_editDiary;
}

export interface editDiaryVariables {
  editDiaryInput: EditDiaryInput;
}
