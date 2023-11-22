import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { addVariablesWrapper } from "./utils/variablesAdapter";

export const CREATE_JOURNEY = gql`
  mutation insertIntojourneyCollection($objects: [journeyInsertInput!]!) {
    insertIntojourneyCollection(objects: $objects)
  }
`;

export function useCreateJourney() {
  const [mutateFunction, { data, loading, error }] =
    useMutation(CREATE_JOURNEY);

  const createJourney = useCallback(
    async (args: { objects: Omit<JourneyDTO, "id">[] }) => {
      return await mutateFunction(addVariablesWrapper(args));
    },
    [mutateFunction],
  );

  return {
    createJourney,
    data,
    isLoading: loading,
    error: error?.message,
  };
}
