import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Header from "./header";

test("renders a heading with the text: melodic fever", () => {
  render(<Header />);
  const heading = screen.getByText(/MELODIC FEVER/i);
  expect(heading).toBeInTheDocument();
});
