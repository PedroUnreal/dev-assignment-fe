import { useCallback } from "react"
import { useCompleteJourney } from "../api/completeJourney"

type ButtonCompleteJourneyProps = {
    onAdd: () => void;
    id: string
}

export default function ButtonCompleteJourney({ onAdd, id }: ButtonCompleteJourneyProps) {
    const { completeJourney } = useCompleteJourney();

    const handleCompleteButton = useCallback(
        async () => {
            try {
                await completeJourney({ id });
                onAdd();
            } catch (error) {
                console.log(error)
            }
        }, [id, completeJourney, onAdd])

    return (
        <button onClick={handleCompleteButton}>Complete</button>
    )
}