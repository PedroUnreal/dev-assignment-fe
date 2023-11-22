import { useCallback, useState } from "react";
import { useCreateJourney } from "../api/createJourney";
import { useCreateTraveller } from "../api/createTraveller";

export default function CreateNewJourneyComponent({ onAdd }: { onAdd: () => void }) {
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");

	const { createJourney } = useCreateJourney();
	const { createTraveller } = useCreateTraveller();

	const handleCreateJourneyByClick: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
		e.preventDefault(); // prevent page reload

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
			.then(() => {
				setName("");
				setLastname("");
				setFrom("");
				setTo("");
			})
			.catch((error) => {
				console.log(error)
			});
	}, [name, lastname, from, to, onAdd, createJourney, createTraveller]);

	return (
		<div className="form-wrapper">
			<h2>Add a new journey</h2>

			<form className="create-journey-form" onSubmit={handleCreateJourneyByClick}>

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
				<button type="submit">
					Add
				</button>
			</form>
		</div>
	);
}
