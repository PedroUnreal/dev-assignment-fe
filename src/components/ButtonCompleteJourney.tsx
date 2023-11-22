import { useCallback } from "react";
import { useSetJourneyStatus } from "../api/setJourneyStatus";

type ButtonCompleteJourneyProps = {
  onAdd: () => void;
  id: string;
};

export default function ButtonCompleteJourney({
  onAdd,
  id,
}: ButtonCompleteJourneyProps) {
  const { setJourneyStatus } = useSetJourneyStatus();

  const handleCompleteButton = useCallback(async () => {
    try {
      await setJourneyStatus({ id, status: "COMPLETED" });
      onAdd();
    } catch (error) {
      console.log(error);
    }
  }, [id, setJourneyStatus, onAdd]);

  return <button onClick={handleCompleteButton}>Complete</button>;
}
