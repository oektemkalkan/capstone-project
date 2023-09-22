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

  const [cartTickets, setCartTickets] = useLocalStorageState("cartTicket", []);
  const [reviews, setReviews] = useLocalStorageState("review", []);
  const { data, error } = useSWR(id ? `/api/popstars/${id}` : null, fetcher);

  if (!id) {
    return <h1>No ID!</h1>;
  }

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

  async function onSubmitReview(reviewData) {
    try {
      const loadedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

      loadedReviews.push(reviewData);
      localStorage.setItem("reviews", JSON.stringify(loadedReviews));
    } catch (error) {
      console.error("Something wrong:", error.message);
    }
  }

  return (
    <>
      <Header />
      <StyledDiv>
        <BackButton />
        <ShoppingCart />
      </StyledDiv>
      <article>
        <StyledContainer>
          <StyledReviewButton
            onClick={() => router.push(`/ReviewPage?name=${data.name}`)}
          >
            <StyledStarSpan>{data.rating}</StyledStarSpan>
          </StyledReviewButton>
          <StyledImageContainer>
            <StyledImage
              src={data.image}
              width={"550"}
              height={"300"}
              alt="Pop-Artist"
              priority="high"
            />
          </StyledImageContainer>
        </StyledContainer>
        <StyledArtistnameP>
          {data.name}
          <StyledSvg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="black"
            viewBox="0 0 16 16"
          >
            <path d="M4 4.85v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Z" />
            <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3h-13ZM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9V4.5Z" />
          </StyledSvg>
        </StyledArtistnameP>
        <StyledContainer2>
          <StyledInfo>
            <StyledLocationP>{data.location}</StyledLocationP>
            <StyledDateP>{data.date}</StyledDateP>
          </StyledInfo>
          <StyledFromP>from</StyledFromP>
          <StyledAddButton onClick={handleAddTicket}>
            {data.price} {data.currency}
          </StyledAddButton>
        </StyledContainer2>
      </article>
      <InputForm
        reviews={reviews}
        setReviews={setReviews}
        data={data}
        onSubmitReview={onSubmitReview}
      />
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

const StyledImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 200px;
  height: auto;
  overflow: hidden;
  margin: 0;
`;

const StyledImage = styled(Image)`
  position: relative;
  border-bottom: 1px dotted black;
  box-shadow: -5px 0px 30px rgba(0, 0, 0, 0.2);
  right: 90px;
  z-index: -1;
  @media (max-width: 375px) {
    width: 450px;
    height: 280px;
  }
`;

const StyledReviewButton = styled.button`
  position: absolute;
  border: none;
  z-index: 10;
  top: 44%;
  transform: translateY(-50%) rotate(90deg);
  letter-spacing: 10px;
  opacity: 0.8;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px 20px 20px 20px;
  width: 200px;
  height: 150px;
  box-shadow: 5px 0px 50px rgba(0, 0, 0, 0.4);
`;

const StyledStarSpan = styled.span`
  filter: saturate(0);
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const StyledArtistnameP = styled.p`
  margin: 0;
  padding: 5px 0 0 5px;
  font-size: 15px;
  letter-spacing: 8px;
  text-align: center;
`;

const StyledSvg = styled.svg`
  padding-top: 5px;
`;

const StyledContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 50px 40px 35px 40px;
  padding: 0 0 25px 0;
  border-bottom: 0.1px dotted black;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  letter-spacing: 1px;
  font-size: 15px;
  font-weight: 400;
`;

const StyledLocationP = styled.p`
  align-self: flex-start;
  margin: 0 0 10px 0;
`;

const StyledDateP = styled.p`
  align-self: flex-start;
  margin: 0;
`;

const StyledFromP = styled.p`
  position: absolute;
  left: 260px;
  top: 465px;
  font-size: 8px;
  font-weight: 200;
`;

const StyledAddButton = styled.button`
  border: none;
  border-radius: 20%;
  width: 60px;
  height: 40px;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
`;
