/* eslint-disable */
import { fireEvent, render, screen } from "@testing-library/react";
import SelectFilter, { options } from "../SelectFilter";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe("SelectFilter", () => {
    test("Input value is passed to parent", () => {
        const handleChange = jest.fn();
        render(<SelectFilter orderStatus=""
            setOrderStatus={handleChange} />);

        fireEvent.change(screen.getByTestId('select'), { target: { value: options[2].value } });
        expect(handleChange).toHaveBeenCalledWith(options[2].value);
    });
});
