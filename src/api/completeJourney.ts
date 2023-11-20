

import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { addVariablesWrapper } from './utils/variablesAdapter';

const COMPLETE_JOURNEY = gql`
    mutation cancelJourney($id: String){
        updatejourneyCollection(set: {status: "COMPLETED"}
            filter: 
            {id: {
                eq: $id
            }}) 
    }
  `;

export function useCompleteJourney() {
    const [mutateFunction, { data, loading, error }] = useMutation(COMPLETE_JOURNEY);

    const completeJourney = useCallback(
        async (args: { id: string }) => {
            return await mutateFunction(addVariablesWrapper(args));
        },
        [mutateFunction],
    );

    return {
        completeJourney,
        data,
        isLoading: loading,
        error: error?.message,
    };
}