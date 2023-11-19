import { render, screen } from "@testing-library/react";
import Journeys from "../Journeys";
import * as JourneyCollection from "../../../api/getJourneyCollection";

const journeysMock = [
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

describe("Journeys", () => {
    test("Table of journeys is rendered", () => {
        jest.spyOn(JourneyCollection, "useGetJourneyCollection").mockReturnValue({ data: journeysMock });
        render(<Journeys />);

        expect(screen.getByTestId("journeys_table")).toBeInTheDocument();
        expect(screen.getByText("London Heathrow Airport (HTR)")).toBeInTheDocument();
    });
    test("Empty journeys", () => {
        jest.spyOn(JourneyCollection, "useGetJourneyCollection").mockReturnValue({ data: [] });
        render(<Journeys />);

        expect(screen.getByText("No journeys were found")).toBeInTheDocument();
    });
    test("useGetJourneyCollection query is called", () => {
        jest.spyOn(JourneyCollection, "useGetJourneyCollection").mockReturnValue({ data: journeysMock });
        render(<Journeys />);

        expect(JourneyCollection.useGetJourneyCollection).toBeCalledTimes(1);
        expect(JourneyCollection.useGetJourneyCollection).toBeCalledWith("", "");
    });
})
