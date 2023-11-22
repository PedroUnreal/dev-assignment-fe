import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { addVariablesWrapper } from './utils/variablesAdapter';

const SET_JOURNEY_STATUS = gql`
    mutation cancelJourney($id: String, $status: String){
        updatejourneyCollection(set: {status: $status}
            filter: 
            {id: {
                eq: $id
            }}) 
    }
  `;

export function useSetJourneyStatus() {
  const [mutateFunction, { data, loading, error }] = useMutation(SET_JOURNEY_STATUS);

  const setJourneyStatus = useCallback(
    async (args: { id: string, status: OrderStatus }) => {
      return await mutateFunction(addVariablesWrapper(args));
    },
    [mutateFunction],
  );

  return {
    setJourneyStatus,
    data,
    isLoading: loading,
    error: error?.message,
  };
}
