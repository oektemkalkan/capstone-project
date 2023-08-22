import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import Image from "next/image";

export default function ShoppingCart({ ticket }) {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [cartTickets, setCartTickets] = useLocalStorageState("cartTicket", []);

  const goBack = () => {
    router.push("/");
  };

  const handleDeleteTicket = (ticketToDelete) => {
    const updatedCartTickets = cartTickets.filter(
      (ticket) => ticket !== ticketToDelete
    );
    setCartTickets(updatedCartTickets);
  };

  const handleBuyTickets = () => {
    setShowPopup(true);
    setCartTickets([]);
    setTimeout(() => {
      setShowPopup(false);
    }, 1800);
  };

  return (
    <>
      <h2>Shopping Cart Page</h2>
      <button onClick={goBack}>back</button>

      {cartTickets && cartTickets.length > 0 ? (
        <>
          <ul>
            {cartTickets.map((ticket) => (
              <li key={ticket.id}>
                <Image
                  src={ticket.image}
                  alt="Ticket"
                  priority="high"
                  width={"280"}
                  height={"150"}
                />
                <p>{ticket.rating}</p>
                <p>{ticket.name}</p>
                <p>{ticket.location}</p>
                <p>{ticket.date}</p>
                <p>
                  {ticket.price} {ticket.currency}
                </p>
                <button onClick={() => handleDeleteTicket(ticket)}>
                  DELETE
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleBuyTickets}>BUY TICKETS</button>
        </>
      ) : (
        <p>Cart is empty</p>
      )}

      {showPopup && (
        <StyledDivPopUp>
          <StyledMessage>ordered!</StyledMessage>
        </StyledDivPopUp>
      )}
    </>
  );
}

const StyledMessage = styled.p`
  text-align: center;
`;

const StyledDivPopUp = styled.div`
  margin-inline: 8rem;
  background-color: lightBlue;
`;
