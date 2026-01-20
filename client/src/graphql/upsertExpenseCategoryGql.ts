import { gql } from '@apollo/client';

export const upsertExpenseCategoryGql = gql`
  mutation UpsertExpenseCategory($name: String!) {
    upsertExpenseCategory(name: $name)
  }
`;
