import React from "react";
import { render, screen } from "@testing-library/react";
import Root from "./Root";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(<Root />, { wrapper: Wrapper });
  const linkElement = screen.getByText("Journeys");
  expect(linkElement).toBeInTheDocument();
});

const Wrapper = ({ children }: React.PropsWithChildren) => (
    <MockedProvider mocks={[]} addTypename={false}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </MockedProvider>
)
