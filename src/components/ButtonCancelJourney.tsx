import { useCallback } from "react";
import { useSetJourneyStatus } from "../api/setJourneyStatus";

type ButtonCancelJourneyProps = {
  onAdd: () => void;
  id: string;
};

export default function ButtonCancelJourney({
  onAdd,
  id,
}: ButtonCancelJourneyProps) {
  const { setJourneyStatus } = useSetJourneyStatus();

  const handleCancelButton = useCallback(async () => {
    await setJourneyStatus({ id, status: "CANCELLED" });
    onAdd();
  }, [id, setJourneyStatus, onAdd]);

  return <button onClick={handleCancelButton}>Cancel</button>;
}
