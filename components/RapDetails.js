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
  const [reviews, setReviews] = useLocalStorageState("review", []);

  if (error) {
    return <h1>Nothing there..</h1>;
  }

  if (!data) {
    return <h1>LOADING...</h1>;
  }

  async function handleAddTicket(event) {
    event.preventDefault();

    const id = () => {
      return Math.random().toString(32).substring(2);
    };

    const ticketData = {
      id: id(),
      image: data.image,
      rating: data.rating,
      name: data.name,
      location: data.location,
      date: data.date,
      price: data.price,
      currency: data.currency,
    };

    if (!cartTickets) {
      setCartTickets([ticketData]);
      return;
    }

    const existingTicket = cartTickets.find(
      (ticket) => ticket.name === ticketData.name
    );
    if (existingTicket) {
      console.log(`A ticket from '${data.name}' is already in the cart.`);
      return;
    }

    setCartTickets([...cartTickets, ticketData]);
  }

  async function handleAddReview(event) {
    event.preventDefault(event.target);

    const reviewId = () => {
      return Math.random().toString(32).substring(2);
    };

    const formData = new FormData(event.target);
    const reviewData = {
      id: reviewId(),
      name: formData.get("name"),
      rating: Number(formData.get("rating")),
      opinion: formData.get("opinion"),
      artistName: data.name,
    };

    try {
      if (!reviews) {
        setReviews([reviewData]);
      } else {
        const existingReview = reviews.find(
          (review) => review.id === reviewData.id
        );
        if (existingReview) {
          console.log(`A review for '${data.name}' is already in the cart.`);
        } else {
          setReviews([...reviews, reviewData]);
        }
      }

      await onSubmitReview(reviewData);
    } catch (error) {
      console.error("Something wrong:", error.message);
    }

    event.target.reset();
    event.target.elements[0].focus();
  }

  return (
    <>
      <button onClick={() => router.push(`/RapPage`)}>back</button>
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
        <button onClick={() => router.push(`/ReviewPage?name=${data.name}`)}>
          RATING
        </button>
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
      <form onSubmit={handleAddReview}>
        <label htmlFor="name">Enter your name</label>
        <input
          name="name"
          type="text"
          minLength={3}
          maxLength={20}
          pattern="[A-Za-z\s]+"
          placeholder="Username"
          required
        />

        <input
          name="rating"
          type="number"
          min={1}
          max={5}
          pattern="^\d+"
          placeholder="rate"
          required
        />

        <input
          name="opinion"
          type="text"
          minLength={1}
          maxLength={100}
          pattern="[A-Za-z\s]+"
          placeholder="opinion"
          required
        />
        <button type="submit">SEND</button>
      </form>
    </>
  );
}

const Div = styled.div`
  text-align: right;
`;
