import { useCallback } from "react"
import { useDeleteJourney } from "../api/deleteJourney"

type ButtonDeleteJourneyProps = {
    onAdd: () => void;
    id: string
}

export default function ButtonDeleteJourney({ onAdd, id }: ButtonDeleteJourneyProps) {
    const { deleteJourney } = useDeleteJourney();

    const handleDeleteButton = useCallback(async () => {
        await deleteJourney({ id });
        onAdd();
    }, [id, deleteJourney, onAdd])

    return (
        <button onClick={handleDeleteButton}>Delete</button>
    )
}