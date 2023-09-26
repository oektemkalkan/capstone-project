import styled from "styled-components";

export default function Header() {
  return <StyledHeader>MELODIC FEVER</StyledHeader>;
}

const StyledHeader = styled.p`
  text-align: center;
  font-size: 35px;
  margin-top: 40px;
  margin-bottom: 30px;
  letter-spacing: 3px;

  @media (max-width: 375px) {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }

  @media (max-width: 390px) {
    font-size: 25px;
    margin-top: 40px;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }

  @media (max-width: 430px) {
    font-size: 28px;
    margin-top: 45px;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }
`;
