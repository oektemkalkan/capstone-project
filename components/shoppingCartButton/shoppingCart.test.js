import { render, fireEvent, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import ShoppingCart from "./shoppingCart";

test("the button should navigate to the Cartpage when clicked", () => {
  const push = jest.fn();
  const router = {
    push: (url, _, options) => {
      expect(url).toContain("/shoppingCart");

      push(url, _, options);
    },
  };

  const { getByTestId } = render(
    <RouterContext.Provider value={router}>
      <ShoppingCart />
    </RouterContext.Provider>
  );

  const shoppingCartButton = getByTestId("shopping-cart-link");

  fireEvent.click(shoppingCartButton);

  expect(push).toHaveBeenCalled();
});
