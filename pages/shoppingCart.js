import Header from "@/components/mainHeader/header";
import BackButton from "@/components/backButton/backButton";
import styled from "styled-components";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import Image from "next/image";
import cartpic from "../public/kelvin-moquete.jpg";
import Lottie from "lottie-react";
import gifsuccess from "../public/animation_success.json";

export default function ShoppingCart() {
  const [showPopup, setShowPopup] = useState(false);
  const [cartTickets, setCartTickets] = useLocalStorageState("cartTicket", []);

  const handleDeleteTicket = (ticketToDelete) => {
    const updatedCartTickets = cartTickets.filter(
      (ticket) => ticket.id !== ticketToDelete
    );
    setCartTickets(updatedCartTickets);
  };

  const handleBuyTickets = () => {
    setShowPopup(true);
    setCartTickets([]);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <>
      <Header />
      <BackButton />
      {cartTickets && cartTickets.length > 0 ? (
        <>
          <StyledHeaderP>TICKETS</StyledHeaderP>
          <StyledHr />
          <StyledUl>
            {cartTickets.map((ticket) => (
              <StyledLi key={ticket.id}>
                <StyledImageDiv>
                  <StyledImageCard
                    src={ticket.image}
                    width={"550"}
                    height={"140"}
                    alt="Ticket-Picture"
                    priority="high"
                  />
                </StyledImageDiv>
                <StyledNameP>{ticket.name}</StyledNameP>
                <StyledTicketInfoDiv>
                  <StyledLocationP>{ticket.location}</StyledLocationP>
                  <StyledDateP>{ticket.date}</StyledDateP>
                  <StyledPriceP>
                    {ticket.price} {ticket.currency}
                  </StyledPriceP>
                </StyledTicketInfoDiv>
                <StyledDeleteButton
                  onClick={() => handleDeleteTicket(ticket.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="red"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </StyledDeleteButton>
              </StyledLi>
            ))}
          </StyledUl>
          <StyledHr2 />
          <StyledBuyButton onClick={handleBuyTickets}>purchase</StyledBuyButton>
        </>
      ) : (
        <>
          <StyledContainer>
            <StyledP>CART IS EMPTY</StyledP>
            <StyledImage
              src={cartpic}
              alt="people raise hands"
              priority="high"
            />
          </StyledContainer>
        </>
      )}

      {showPopup && (
        <StyledDivPopUp>
          <Lottie animationData={gifsuccess} />
        </StyledDivPopUp>
      )}
    </>
  );
}

const StyledUl = styled.ul`
  position: relative;
  margin: 0;
  padding: 0;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  margin-bottom: 40px;
  text-align: center;
  width: 300px;
  height: 160px;

  @media (max-width: 390px) {
    margin-bottom: 30px;
  }

  @media (max-width: 430px) {
    margin-bottom: 30px;
  }
`;

const StyledImageCard = styled(Image)`
  width: 300px;
  max-height: 140px;
  object-fit: cover;
  opacity: 0.2;
  z-index: 20;
`;

const StyledImageDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed black;
  padding: 20px;
  width: 300px;
  height: 140px;
  background-color: white;
  margin: 0 auto;
  opacity: 1;
`;

const StyledTicketInfoDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  padding: 10px;
`;

const StyledLocationP = styled.p`
  margin-top: 30px;
  font-weight: 900;
  letter-spacing: 2px;
`;

const StyledDateP = styled.p`
  margin-top: 15px;
  letter-spacing: 2px;
  font-weight: 700;
  font-size: 15px;
`;

const StyledPriceP = styled.p`
  margin-top: 15px;
  font-size: 13px;
  background-color: rgba(255, 178, 1, 2);
  color: white;
  font-weight: 900;
  padding: 2px 0 2px 0;
  margin-left: auto;
  margin-right: auto;
`;

const StyledNameP = styled.p`
  position: absolute;
  top: 60px;
  left: -50px;
  width: 40%;
  height: 5%;
  align-items: center;
  justify-content: center;
  transform: rotate(270deg);
  font-size: 14px;
  letter-spacing: 4px;
  font-weight: 300;
`;

const StyledDeleteButton = styled.button`
  position: absolute;
  border: none;
  border-radius: 20%;
  left: 245px;
  top: 135px;
  width: 35px;
  height: 35px;
  background-color: white;
  z-index: 10;
  cursor: pointer;
`;

const StyledDivPopUp = styled.div`
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 450px;
  z-index: 100;

  @media (max-width: 375px) {
    width: 450px;
    height: 450px;
  }

  @media (max-width: 390px) {
    width: 450px;
    height: 450px;
  }

  @media (max-width: 430px) {
    top: 50%;
    width: 450px;
    height: 450px;
  }
`;

const StyledBuyButton = styled.button`
  background-color: #ffb201;
  border: none;
  border-radius: 5px;
  padding: 10px 25px 10px 25px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  color: white;
  margin: 0 0 55px 30%;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: #e5a200;
  }

  @media (max-width: 375px) {
    margin: 0 0 35px 35px;
  }

  @media (max-width: 390px) {
    margin: 0 0 35px 40px;
    font-size: 17px;
  }

  @media (max-width: 430px) {
    margin: 0 0 35px 45px;
    font-size: 18px;
  }
`;

const StyledContainer = styled.div`
  displey: flex;
  justify-content: center;
  text-align: center;
`;

const StyledP = styled.p`
  position: relative;
  top: 140px;
  letter-spacing: 15px;
  font-weight: bolder;
  font-size: 25px;
  font-family: "Gill Sans", sans-serif;
  opacity: 0.2;

  @media (max-width: 375px) {
    top: 80px;
    font-size: 12.5px;
    letter-spacing: 7px;
  }

  @media (max-width: 390px) {
    top: 90px;
    font-size: 16px;
    letter-spacing: 8px;
  }

  @media (max-width: 430px) {
    top: 100px;
    font-size: 18px;
    letter-spacing: 9px;
  }
`;

const StyledImage = styled(Image)`
  width: 55%;
  height: 120%;

  @media (max-width: 375px) {
    width: 85%;
    height: 550px;
  }

  @media (max-width: 390px) {
    width: 85%;
    height: 640px;
  }

  @media (max-width: 430px) {
    width: 85%;
    height: 700px;
  }
`;

const StyledHr2 = styled.hr`
  width: 180px;
  height: 0.5px;
  background-color: black;
  border: none;
  margin: 100px 0 15px 30%;
  opacity: 0.2;

  @media (max-width: 375px) {
    margin: 70px 0 15px 35px;
  }

  @media (max-width: 390px) {
    margin: 80px 0 15px 40px;
  }

  @media (max-width: 430px) {
    margin: 90px 0 15px 45px;
  }
`;

const StyledHeaderP = styled.p`
  font-size: 10px;
  letter-spacing: 1px;
  margin: 10px 0 0 0;
  text-align: center;
  opacity: 0.15;
`;

const StyledHr = styled.hr`
  width: 200px;
  height: 0.5px;
  background-color: black;
  border: none;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.2;
`;
