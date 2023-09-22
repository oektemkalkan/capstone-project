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
                    width={"550"}
                    height={"300"}
                    alt="Ticket-Picture"
                    priority="high"
                  />
                </StyledImageDiv>
                <StyledTicketInfoDiv>
                  <StyledNameP>{ticket.name}</StyledNameP>

                  <p>{ticket.rating}</p>
                  <p>{ticket.location}</p>
                  <p>{ticket.date}</p>
                  <p>
                    {ticket.price} {ticket.currency}
                  </p>
                </StyledTicketInfoDiv>
                <StyledDeleteButton
                  onClick={() => handleDeleteTicket(ticket.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="red"
                    class="bi bi-trash3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </StyledDeleteButton>
              </StyledLi>
            ))}
          </ul>
          <button onClick={handleBuyTickets}>purchase</button>
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
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  margin-top: 80px;
  margin-bottom: 60px;
  width: 300px;
  height: 150px;

  @media (max-width: 375px) {
  }
`;

const StyledImageCard = styled(Image)`
  position: relative;
  width: 300px;
  max-height: 200px;
  object-fit: cover;
  opacity: 0.8;
  border-radius: 10px;
  z-index: -10;
  @media (max-width: 375px) {
  }
`;

const StyledImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  @media (max-width: 375px) {
  }
`;

const StyledTicketInfoDiv = styled.div`
  position: absolute;
  z-index: 2;
  padding: 10px;
  @media (max-width: 375px) {
  }
`;

const StyledNameP = styled.div`
  @media (max-width: 375px) {
  }
`;

const StyledDeleteButton = styled.button`
  border: none;
  border-radius: 20%;
  width: 100px;
  height: 40px;
  background-color: white;
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
