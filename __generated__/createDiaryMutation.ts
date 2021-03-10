/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateDiaryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createDiaryMutation
// ====================================================

export interface createDiaryMutation_createDiary {
  __typename: "CreateDiaryOutput";
  ok: boolean;
  error: string | null;
  diaryId: number | null;
}

export interface createDiaryMutation {
  createDiary: createDiaryMutation_createDiary;
}

export interface createDiaryMutationVariables {
  createDiaryMutationInput: CreateDiaryInput;
}
