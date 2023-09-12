import Header from "@/components/mainHeader/header";
import ShoppingCart from "@/components/shoppingCartButton/shoppingCart";
import BackButton from "@/components/backButton/backButton";
import InputForm from "./inputForm/inputForm";
import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import useLocalStorageState from "use-local-storage-state";
import Lottie from "lottie-react";
import gifloading from "../public/animation_loading.json";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PopDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/popstars/${id}`, fetcher);
  const [cartTickets, setCartTickets] = useLocalStorageState("cartTicket", []);
  const [reviews, setReviews] = useLocalStorageState("review", []);

  if (error) {
    return <h1>Nothing there..</h1>;
  }

  if (!data) {
    return (
      <>
        <GifLoadingDiv>
          <Lottie animationData={gifloading} loop={true} />
        </GifLoadingDiv>
      </>
    );
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
      <Header />
      <StyledDiv>
        <BackButton />
        <ShoppingCart />
      </StyledDiv>
      <article>
        <Image
          src={data.image}
          priority="high"
          alt="Pop Artist"
          width={"280"}
          height={"150"}
        />
        <button onClick={() => router.push(`/ReviewPage?name=${data.name}`)}>
          {data.rating}
        </button>
        <h4>{data.name}</h4>

        <div>
          <p>{data.location}</p>
          <p>{data.date}</p>

          <button onClick={handleAddTicket}>
            {data.price} {data.currency}
          </button>
        </div>
      </article>
      <InputForm onClick={handleAddReview} />
    </>
  );
}

const GifLoadingDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledDiv = styled.div`
  display: flex;

  @media (max-width: 375px) {
    margin: 0px 16% 0px 2%;
  }
`;
