import { useCallback } from "react";

export const options: Array<{ value: OrderStatus; label: string }> = [
  {
    value: "",
    label: "ALL",
  },
  {
    value: "PENDING",
    label: "PENDING",
  },
  {
    value: "COMPLETED",
    label: "COMPLETED",
  },
];

type SelectFilterProps = {
  orderStatus: OrderStatus;
  setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatus>>;
};

export default function SelectFilter({
  orderStatus,
  setOrderStatus,
}: SelectFilterProps) {
  const onSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setOrderStatus(e.target.value as OrderStatus);
    },
    [setOrderStatus]
  );

  return (
    <div>
      <label htmlFor="select-filter">Select journey status:</label>
      <select id="select-filter" value={orderStatus} onChange={onSelect} data-testid="select">
        {options.map((option) => (
          <option key={option.label} value={option.value} data-testid="select-option">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
