import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ShoppingCart({ ticket }) {
  const router = useRouter();
  const [cartTickets, setCartTickets] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    const storedCartTickets = JSON.parse(localStorage.getItem("cartTicket"));
    if (storedCartTickets && storedCartTickets.length > 0) {
      setCartTickets(storedCartTickets);
    }
  }, []);

  const handleDeleteTicket = (id) => {
    const updatedCartTickets = cartTickets.filter((_, index) => index !== id);
    setCartTickets(updatedCartTickets);
    localStorage.setItem("cartTicket", JSON.stringify(updatedCartTickets));
  };

  const handleBuyTickets = () => {
    setShowPopup(true);
    setCartTickets([]);
    localStorage.removeItem("cartTicket");
    setTimeout(() => {
      setShowPopup(false);
    }, 1800);
  };

  return (
    <>
      <h2>Shopping Cart Page</h2>
      <button onClick={goBack}>back</button>

      {cartTickets.length > 0 ? (
        <>
          <ul>
            {cartTickets.map((ticket, id) => (
              <li key={id}>
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
                <button onClick={() => handleDeleteTicket(id)}>DELETE</button>
              </li>
            ))}
          </ul>
          <button onClick={handleBuyTickets}>BUY TICKETS</button>
        </>
      ) : (
        <p>Cart is empty</p>
      )}

      {showPopup && (
        <StyledDiv>
          <StyledP>ordered!</StyledP>
        </StyledDiv>
      )}
    </>
  );
}

const StyledP = styled.p`
  text-align: center;
`;

const StyledDiv = styled.div`
  margin-inline: 8rem;
  background-color: lightBlue;
`;
