import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import useLocalStorageState from "use-local-storage-state";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RapDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/rapstars/${id}`, fetcher);
  const [cartTickets, setCartTickets] = useLocalStorageState("cartTicket", []);

  if (error) {
    return <h1>Nothing there..</h1>;
  }

  if (!data) {
    return <h1>LOADING...</h1>;
  }

  async function handleAddTicket(event) {
    event.preventDefault();

    const ticketData = {
      image: data.image,
      rating: data.rating,
      name: data.name,
      location: data.location,
      date: data.date,
      price: data.price,
      currency: data.currency,
    };

    const existingTicket = cartTickets.find(
      (ticket) => ticket.name === ticketData.name
    );
    if (existingTicket) {
      console.log(`A ticket from '${data.name}' is already in the cart.`);
      return;
    }

    setCartTickets([...cartTickets, ticketData]);
  }

  return (
    <>
      <button onClick={() => router.push("/RapPage")}>back</button>
      <Div>
        <Link href={"/shoppingCart"}>SHOPPING CART</Link>
      </Div>
      <article>
        <Image
          src={data.image}
          priority="high"
          alt="Rap Artist"
          width={"280"}
          height={"150"}
        />
        <p>{data.rating}</p>
        <h4>{data.name}</h4>

        <div>
          <p>{data.location}</p>
          <p>{data.date}</p>

          <button onClick={handleAddTicket}>
            {data.price} {data.currency}
          </button>
        </div>
      </article>
    </>
  );
}

const Div = styled.div`
  text-align: right;
`;
