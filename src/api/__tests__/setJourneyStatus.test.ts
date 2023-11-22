import { renderHook } from "@testing-library/react";
import * as ApolloClient from "@apollo/client";
import { useSetJourneyStatus } from "../setJourneyStatus";

describe("setJourneyStatus", () => {
  test("Called with correct status", async () => {
    const setJourneyStatus = jest.fn();
    jest.spyOn(ApolloClient, "useMutation").mockReturnValue([setJourneyStatus, {}] as any);

    const { result } = renderHook(() => useSetJourneyStatus());

    result.current.setJourneyStatus({
      id: "id",
      status: "COMPLETED",
    });

    expect(setJourneyStatus).toBeCalledWith({
      variables: {
        id: "id",
        status: "COMPLETED",
      }
    });
  });
});
