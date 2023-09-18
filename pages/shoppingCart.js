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
          <ul>
            {cartTickets.map((ticket) => (
              <StyledLi key={ticket.id}>
                <StyledImageDiv>
                  <StyledImageCard
                    src={ticket.image}
                    alt="Ticket"
                    priority="high"
                    width={"550"}
                    height={"300"}
                  />
                </StyledImageDiv>
                <StyledNameDiv>
                  <p>{ticket.name}</p>
                </StyledNameDiv>
                <StyledTicketInfoDiv>
                  <p>{ticket.rating}</p>
                  <p>{ticket.location}</p>
                  <p>{ticket.date}</p>
                  <p>
                    {ticket.price} {ticket.currency}
                  </p>
                  <button onClick={() => handleDeleteTicket(ticket.id)}>
                    DELETE
                  </button>
                </StyledTicketInfoDiv>
              </StyledLi>
            ))}
          </ul>
          <button onClick={handleBuyTickets}>BUY TICKETS</button>
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

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 500px;
  list-style-type: none;
  margin-bottom: 60px;

  @media (max-width: 375px) {
    width: 300px;
    height: 300px;
  }
`;

const StyledImageCard = styled(Image)`
  @media (max-width: 375px) {
    width: 200px;
    height: 100px;
  }
`;

const StyledImageDiv = styled.div`
  text-align: center;
  margin-top: 8px;
  @media (max-width: 375px) {
  }
`;

const StyledNameDiv = styled.div`
  text-align: center;
  @media (max-width: 375px) {
  }
`;

const StyledTicketInfoDiv = styled.div`
  margin-left: auto;
  @media (max-width: 375px) {
  }
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
`;

const StyledImage = styled(Image)`
  width: 55%;
  height: 120%;

  @media (max-width: 375px) {
    width: 85%;
    height: 550px;
  }
`;
