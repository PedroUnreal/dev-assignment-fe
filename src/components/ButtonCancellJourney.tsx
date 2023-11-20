import { useCallback } from "react"
import { useCompleteJourney } from "../api/completeJourney"

type ButtonCompleteJourneyProps = {
    id: string
}

export default function ButtonCompleteJourney(id: ButtonCompleteJourneyProps) {
    const { completeJourney } = useCompleteJourney();

    const handleCompleteButton = useCallback(async () => {
        await completeJourney(id);
    }, [id, completeJourney])

    return (
        <button onClick={handleCompleteButton}>Complete</button>
    )
}