import styled from "styled-components";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  const goBack = () => {
    if (router.pathname === "/shoppingCart") {
      router.push("/");
    } else {
      router.back();
    }
  };
  return (
    <>
      <StyledButton onClick={goBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="black"
          class="bi bi-arrow-bar-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"
          />
        </svg>
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  margin-left: 4%;

  @media (max-width: 375px) {
    margin-left: 4%;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;
