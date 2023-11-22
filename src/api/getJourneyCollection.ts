import { TypedDocumentNode, gql, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { addVariablesWrapper } from "./utils/variablesAdapter";

type JourneysData = {
  journeyCollection: {
    edges: Array<{
      node: JourneyDTO;
    }>;
  };
};

type JourneysFilterVars = {
  address: string;
  status: string;
};

export const GET_JOURNEYS_COLLECTION: TypedDocumentNode<
  JourneysData,
  JourneysFilterVars
> = gql`
  query JourneyCollection($address: String, $status: String) {
    journeyCollection(
      filter: {
        and: [
          {
            or: [
              { to_address: { iregex: $address } }
              { from_address: { iregex: $address } }
            ]
          }
          { status: { iregex: $status } }
        ]
      }
    ) {
      edges {
        node {
          id
          fare
          status
          to_address
          from_address
          inbound
          traveller_info {
            id
            first_name
            last_name
            phone_number
          }
        }
      }
    }
  }
`;

export function useGetJourneyCollection(
  inputAddress: string,
  orderStatus: string,
) {
  const [getJourneys, { loading }] = useLazyQuery(GET_JOURNEYS_COLLECTION);
  const [journeys, setJourneys] = useState<JourneyDTO[]>([]);

  const getJourneysHandler = useCallback(async () => {
    const { data } = await getJourneys(
      addVariablesWrapper({ address: inputAddress, status: orderStatus }),
    );

    if (data?.journeyCollection) {
      setJourneys(
        data.journeyCollection.edges.map((edge) => {
          return edge.node;
        }),
      );
    }
  }, [inputAddress, orderStatus, getJourneys]);

  useEffect(() => {
    getJourneysHandler();
  }, [getJourneysHandler]);

  return {
    journeys,
    loading,
    getJourneysHandler,
  };
}
