import Header from "@/components/mainHeader/header";
import ShoppingCart from "@/components/shoppingCartButton/shoppingCart";
import BackButton from "@/components/backButton/backButton";
import styled from "styled-components";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import Lottie from "lottie-react";
import gifloading from "../public/animation_loading.json";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RapPage() {
  const { data, isLoading } = useSWR("/api/rapstars", fetcher);

  if (isLoading) {
    return (
      <>
        <GifLoadingDiv>
          <Lottie animationData={gifloading} loop={true} />
        </GifLoadingDiv>
      </>
    );
  }

  if (!data) {
    return <h1> SORRY, no concerts for you! 🥀</h1>;
  }

  return (
    <>
      <Header />
      <StyledDiv>
        <BackButton />
        <ShoppingCart />
      </StyledDiv>
      <div>
        <h2>RAP</h2>
      </div>
      <div>
        <ul>
          {data.map((rapstars) => (
            <li key={rapstars._id}>
              <Image
                src={rapstars.image}
                width={"280"}
                height={"150"}
                alt="Rap-Artist"
              />
              <p>{rapstars.rating}</p>
              <h4>{rapstars.name}</h4>

              <p>
                {rapstars.currency} {rapstars.price}
              </p>
              <Link href={`/rapDetails/${rapstars._id}`}>Find Tickets</Link>
            </li>
          ))}
        </ul>
      </div>
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
