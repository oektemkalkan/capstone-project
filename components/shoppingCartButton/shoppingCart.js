import styled from "styled-components";
import Link from "next/link";

export default function ShoppingCart() {
  return (
    <>
      <ShoppingCartDiv>
        <Link href={"/shoppingCart"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="black"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </Link>
      </ShoppingCartDiv>
    </>
  );
}

const ShoppingCartDiv = styled.div`
  margin-left: 80%;
  margin-bottum: 30px;

  @media (max-width: 375px) {
    margin-left: 85%;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;
