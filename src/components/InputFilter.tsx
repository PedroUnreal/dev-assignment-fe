import { useCallback, useState } from "react";
import { useDebounce } from "../utils/debounce";

type InputFilterProps = {
    setAddress: React.Dispatch<React.SetStateAction<string>>;
};

export default function InputFilter({ setAddress }: InputFilterProps) {
    const [value, setValue] = useState("");
    const debounce = useDebounce(500);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            debounce(() => setAddress(e.target.value));
        },
        [debounce, setAddress]
    );

    return (
        <div>
            <label htmlFor="input-filter">Search by address:</label>
            <input id="input-filter" value={value} onChange={handleChange} type="text" />
        </div>
    );
}
