

import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { addVariablesWrapper } from './utils/variablesAdapter';

const DELETE_JOURNEY = gql`
    mutation deleteFromjourneyCollection($id: String){
        deleteFromjourneyCollection(filter: 
          {id: {
          eq: $id
          }}, atMost:1) 
      }
  `;

export function useDeleteJourney() {
    const [mutateFunction, { data, loading, error }] = useMutation(DELETE_JOURNEY);

    const deleteJourney = useCallback(
        async (args: { id: string }) => {
            return await mutateFunction(addVariablesWrapper(args));
        },
        [mutateFunction],
    );

    return {
        deleteJourney,
        data,
        isLoading: loading,
        error: error?.message,
    };
}