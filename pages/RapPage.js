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
      <StyledHeadDiv>
        <BackButton />
        <ShoppingCart />
      </StyledHeadDiv>
      <StyledRapLineDiv>
        <StyledRapP>RAP</StyledRapP>
        <StyledHr />
      </StyledRapLineDiv>
      <div>
        <ul>
          {data.map((rapstars) => (
            <StyledLi key={rapstars._id}>
              <StyledImage
                src={rapstars.image}
                width={"550"}
                height={"300"}
                alt="Rap-Artist"
                priority="high"
                style={{
                  position: "relative",
                  zIndex: -1,
                }}
              />
              <StyledRatingP>{rapstars.rating}</StyledRatingP>
              <StyledArtistnameP>{rapstars.name}</StyledArtistnameP>
              <StyledPriceP>
                {rapstars.currency} {rapstars.price}
              </StyledPriceP>
              <Link
                href={`/rapDetails/${rapstars._id}`}
                style={{
                  textDecoration: "none",
                  color: "#139df4",
                  position: "relative",
                  bottom: "10px",
                  left: "200px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Find Tickets
              </Link>
            </StyledLi>
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

const StyledHeadDiv = styled.div`
  display: flex;

  @media (max-width: 375px) {
    margin: 0px 16% 0px 2%;
  }
`;

const StyledRapLineDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 5% 0 5%;
  border-radius: 50px;
`;

const StyledRapP = styled.p`
  font-size: 10px;
  letter-spacing: 1px;
  margin-bottom: 5px;
  opacity: 0.15;
`;

const StyledHr = styled.hr`
  width: 200px;
  height: 0.5px;
  background-color: black;
  border: none;
  margin: 0;
  opacity: 0.2;
`;

const StyledLi = styled.li`
  position: relative;
  margin-bottom: 5%;
  width: 80%;
  box-shadow: 10px 15px 20px rgba(128, 128, 128, 0.1);
  border-radius: 0 0 10px 0;
  list-style-type: none;

  @media (max-width: 375px) {
    width: 300px;
    margin-bottom: 15%;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 10px 0 0 0;
  box-shadow: -5px 0px 30px rgba(0, 0, 0, 0.8);
  @media (max-width: 375px) {
    width: 300px;
    height: 150px;
  }
`;

const StyledRatingP = styled.p`
  position: absolute;
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  letter-spacing: 10px;
  left: -16px;
  top: 0px;
  opacity: 0.45;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0 0 10px 0;
  padding: 5px 5px 0 10px;
  height: 150px;
  box-shadow: -15px 0px 20px rgba(0, 0, 0, 1);
`;

const StyledArtistnameP = styled.p`
  margin: 0;
  padding: 5px 0 0 5px;
  font-size: 15px;
  letter-spacing: 8px;
`;

const StyledPriceP = styled.p`
  margin: 0;
  padding: 20px 0 10px 5px;
  font-size: 13px;
  letter-spacing: 3px;
`;
