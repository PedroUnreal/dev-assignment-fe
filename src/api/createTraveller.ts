import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { addVariablesWrapper } from "./utils/variablesAdapter";

const CREATE_TRAVELLER = gql`
  mutation insertIntotraveller_infoCollection(
    $objects: [traveller_infoInsertInput!]!
  ) {
    insertIntotraveller_infoCollection(objects: $objects) {
      records {
        id
      }
    }
  }
`;

export function useCreateTraveller() {
  const [mutateFunction, { data, loading, error }] =
    useMutation(CREATE_TRAVELLER);

  const createTraveller = useCallback(
    async (args: { objects: Omit<TravellerDTO, "id">[] }) => {
      return await mutateFunction(addVariablesWrapper(args));
    },
    [mutateFunction],
  );

  return {
    createTraveller,
    data,
    isLoading: loading,
    error: error?.message,
  };
}
