import { gql, useQuery } from "@apollo/client"
import { useMemo } from "react";

export const GET_JOURNEYS_COLLECTION = gql`
  query JourneyCollection($address: String, $status: String){
    journeyCollection(filter: {and: [{or :[
      {to_address: {
      iregex: $address
      }}, 
      {from_address: {
      iregex: $address
      }}]}, {status: {iregex: $status} }]} ) {
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
`
export function useGetJourneyCollection(address: string, orderStatus: OrderStatus) {
  const query = useQuery<{ journeyCollection: ResponseDTO<JourneyDTO> }>(GET_JOURNEYS_COLLECTION,
    { variables: { address, status: orderStatus } });

  const journeyCollection = useMemo(() => {
    if (query.data?.journeyCollection) {
      return query.data.journeyCollection.edges.map((edge) => {
        return edge.node;
      });
    }
  }, [query.data]);

  return {
    data: journeyCollection,
  };
}
