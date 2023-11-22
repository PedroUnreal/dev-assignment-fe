import { fireEvent, render, screen } from "@testing-library/react";
import InputFilter from "../InputFilter";

describe("InputFilter", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Input value is passed to parent", () => {
    const handleChange = jest.fn();
    render(<InputFilter setAddress={handleChange} />);

    const input: HTMLInputElement = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    jest.advanceTimersByTime(500);

    expect(handleChange).toHaveBeenCalledWith("test");
  });
});
