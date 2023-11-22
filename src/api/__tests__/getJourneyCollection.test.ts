import { act, renderHook } from "@testing-library/react";
import { useGetJourneyCollection } from "../getJourneyCollection";
import * as ApolloClient from "@apollo/client";

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
  let getJourneys: jest.Mock;

  beforeEach(() => {
    getJourneys = jest.fn().mockResolvedValue(journeysMockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Returns journeys list", async () => {
    jest.spyOn(ApolloClient, "useLazyQuery").mockReturnValue([getJourneys] as any);

    let result: any;

    // eslint-disable-next-line
    await act(() => {
      result = renderHook(() => useGetJourneyCollection("", "")).result;
    })

    expect(getJourneys).toBeCalledWith({
      variables: {
        address: "",
        status: "",
      }
    });

    expect(result.current[0]).toEqual(formattedJourneysList);
  });

  test("Is called with filters", async () => {
    jest.spyOn(ApolloClient, "useLazyQuery").mockReturnValue([getJourneys] as any);

    /* eslint-disable */
    await act(() => {
      renderHook(() => useGetJourneyCollection("London", "COMPLETED")).result;
    });

    expect(getJourneys).toBeCalledWith({
      variables: {
        address: "London",
        status: "COMPLETED",
      }
    });
  });
});
