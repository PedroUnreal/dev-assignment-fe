import { renderHook } from "@testing-library/react";
import { GET_JOURNEYS_COLLECTION, useGetJourneyCollection } from "../getJourneyCollection";
import * as ApolloClient from "@apollo/client"

const journeysMockResponse = {
    "data": {
        "journeyCollection": {
            "edges": [
                {
                    "node": {
                        "id": "1f1d6c64-b924-4ea1-8b69-a5e76a31f258",
                        "fare": 4495,
                        "status": "COMPLETED",
                        "inbound": false,
                        "__typename": "journey",
                        "to_address": "221b Baker Street, London",
                        "from_address": "London Heathrow Airport (HTR)",
                        "traveller_info": {
                            "id": "e39d35ab-ecca-483d-908e-7ce22987ae92",
                            "last_name": "Holmes",
                            "__typename": "traveller_info",
                            "first_name": "Sherlock",
                            "phone_number": "+32789459242"
                        }
                    },
                    "__typename": "journeyEdge"
                },
            ],
            "__typename": "journeyConnection"
        }
    }
};

const formattedJourneysList = [
    {
        "id": "1f1d6c64-b924-4ea1-8b69-a5e76a31f258",
        "fare": 4495,
        "status": "COMPLETED",
        "inbound": false,
        "__typename": "journey",
        "to_address": "221b Baker Street, London",
        "from_address": "London Heathrow Airport (HTR)",
        "traveller_info": {
            "id": "e39d35ab-ecca-483d-908e-7ce22987ae92",
            "last_name": "Holmes",
            "__typename": "traveller_info",
            "first_name": "Sherlock",
            "phone_number": "+32789459242"
        }
    }
];

describe("getJourneyCollection", () => {
    test("Returns journeys list", () => {
        jest.spyOn(ApolloClient, "useQuery").mockReturnValue(journeysMockResponse as any)

        const { result } = renderHook(() => useGetJourneyCollection("", ""));
        expect(result.current).toEqual({ data: formattedJourneysList });
    });
    test("Is called with filters", () => {
        jest.spyOn(ApolloClient, "useQuery").mockReturnValue(journeysMockResponse as any)

        renderHook(() => useGetJourneyCollection("London", "COMPLETED"));
        expect(ApolloClient.useQuery).toBeCalledWith(GET_JOURNEYS_COLLECTION, { variables: { address: "London", status: "COMPLETED" } });
    });
})
