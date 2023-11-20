import { OperationVariables } from '@apollo/client';

export function addVariablesWrapper(args: Record<string, any>): OperationVariables {
  return {
    variables: args,
  };
}
