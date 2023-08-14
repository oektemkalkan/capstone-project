import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ShoppingCart({ ticket }) {
  const router = useRouter();
  const [cartTickets, setCartTickets] = useState([]);

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    const storedCartTickets = JSON.parse(localStorage.getItem("cartTicket"));
    if (storedCartTickets && storedCartTickets.length > 0) {
      setCartTickets(storedCartTickets);
    }
  }, []);

  return (
    <>
      <h2>Shopping Cart Page</h2>
      <button onClick={goBack}>back</button>

      {cartTickets && cartTickets.length > 0 ? (
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
            </li>
          ))}
        </ul>
      ) : (
        <p>Cart is empty</p>
      )}
    </>
  );
}
