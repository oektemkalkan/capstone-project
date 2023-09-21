import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InputForm from "./inputForm";

test("form gets displayed with all input fields", () => {
  render(<InputForm />);
  const nameInput = screen.getByLabelText(/Enter your name/i);
  const ratingInput = screen.getByPlaceholderText(/rate/i);
  const opinionInput = screen.getByPlaceholderText(/opinion/i);
  const submitButton = screen.getByRole("button");

  expect(nameInput).toBeInTheDocument();
  expect(ratingInput).toBeInTheDocument();
  expect(opinionInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
