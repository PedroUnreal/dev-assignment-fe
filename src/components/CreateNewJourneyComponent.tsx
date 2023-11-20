import { useCallback, useState } from "react";
import { useCreateJourney } from "../api/createJourney";
import { useCreateTraveller } from "../api/createTraveller";

export default function CreateNewJourneyComponent({ onAdd }: { onAdd: () => void }) {
    const [name, setName] = useState("Name");
    const [lastname, setLastname] = useState("Lastname");
    const [from, setFrom] = useState("FROM");
    const [to, setTo] = useState("TO");

    const { createJourney } = useCreateJourney();
    const { createTraveller } = useCreateTraveller();

    const handleCreateJourneyByClick = useCallback(() => {
        return createTraveller({
            objects: [
                {
                    first_name: name,
                    last_name: lastname,
                    passenger_count: 99,
                    flight_number: "90909",
                    phone_number: "+3111111111",
                },
            ],
        })
            .then(({ data }) => {
                if (data?.insertIntotraveller_infoCollection?.records[0]?.id) {
                    return createJourney({
                        objects: [
                            {
                                from_address: from,
                                to_address: to,
                                fare: 123,
                                inbound: true,
                                traveller_info:
                                    data?.insertIntotraveller_infoCollection.records[0].id,
                                status: "IN PROGRESS",
                            },
                        ],
                    });
                }
            })
            .then(() => {
                onAdd();
            })
            .catch((error) => {
                // do smth
            });
    }, [name, lastname, from, to, onAdd]);

    return (
        <div className="create-journey-form">
            <div>
                <label htmlFor="input-name">Name:</label>
                <input
                    id="input-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                />
            </div>
            <div>
                <label htmlFor="input-lastname">Lastname:</label>
                <input
                    id="input-name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                />
            </div>
            <div>
                <label htmlFor="input-from">From:</label>
                <input
                    id="input-from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    type="text"
                />
            </div>
            <div>
                <label htmlFor="input-to">To:</label>
                <input
                    id="input-to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    type="text"
                />
            </div>
            <button type="button" onClick={handleCreateJourneyByClick}>
                Add
            </button>
        </div>
    );
}
