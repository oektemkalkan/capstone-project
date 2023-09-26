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
        <StyledUl>
          {data.map((rapstars) => (
            <StyledLi key={rapstars._id}>
              <StyledImage
                src={rapstars.image}
                width={"550"}
                height={"300"}
                alt="Rap-Artist"
                priority="high"
              />
              <StyledRatingP>
                <StyledStarSpan>{rapstars.rating}</StyledStarSpan>
              </StyledRatingP>
              <StyledArtistnameP>{rapstars.name}</StyledArtistnameP>
              <StyledHr2 />
              <StyledPriceP>
                {rapstars.currency} {rapstars.price}
              </StyledPriceP>
              <StyledLink
                href={`/rapDetails/${rapstars._id}`}
                style={{
                  textDecoration: "none",
                  color: "#139df4",
                  position: "relative",
                  bottom: "10px",
                  left: "215px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Find Tickets
              </StyledLink>
            </StyledLi>
          ))}
        </StyledUl>
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

  @media (max-width: 390px) {
    margin: 0px 16% 5px 2%;
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

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`;

const StyledRapP = styled.p`
  font-size: 15px;
  letter-spacing: 1px;
  margin-bottom: 5px;
  opacity: 0.15;

  @media (max-width: 375px) {
    font-size: 10px;
  }

  @media (max-width: 390px) {
    font-size: 11px;
  }
`;

const StyledHr = styled.hr`
  width: 30%;
  height: 0.5px;
  background-color: black;
  border: none;
  margin: 0 0 10px 0;
  opacity: 0.2;

  @media (max-width: 375px) {
    width: 200px;
  }

  @media (max-width: 390px) {
    width: 220px;
  }
`;

const StyledHr2 = styled.hr`
  width: 83px;
  height: 0.1px;
  background-color: black;
  border: none;
  margin: 10px 0 0 30px;
  opacity: 0.2;
  transform: rotate(120deg);

  @media (max-width: 390px) {
    width: 85px;
  }
`;

const StyledLi = styled.li`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
  width: 600px;
  box-shadow: 10px 15px 20px rgba(128, 128, 128, 0.1);
  border-radius: 0 0 10px 0;
  list-style-type: none;

  @media (max-width: 375px) {
    width: 300px;
    margin-bottom: 15%;
  }

  @media (max-width: 390px) {
    width: 320px;
    margin-bottom: 20%;
  }
`;

const StyledImage = styled(Image)`
  position: relative;
  width: 600px;
  height: 350px;
  border-radius: 10px 0 0 0;
  box-shadow: -5px 0px 30px rgba(0, 0, 0, 0.6);
  z-index: -1;

  @media (max-width: 375px) {
    width: 300px;
    height: 180px;
  }

  @media (max-width: 390px) {
    width: 320px;
    height: 180px;
  }
`;

const StyledRatingP = styled.p`
  position: absolute;
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  letter-spacing: 12px;
  left: -16px;
  top: 0px;
  opacity: 0.8;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 0 0 10px 0;
  padding: 10px 5px 0 20px;
  height: 350px;
  box-shadow: -15px 0px 20px rgba(0, 0, 0, 0.8);

  @media (max-width: 375px) {
    letter-spacing: 10px;
    padding: 5px 5px 0 20px;
    height: 170px;
    padding: 5px 5px 0 10px;
  }

  @media (max-width: 390px) {
    letter-spacing: 10px;
    padding: 5px 5px 0 20px;
    height: 180px;
    padding: 5px 5px 0 10px;
  }
`;

const StyledStarSpan = styled.span`
  filter: saturate(0);
`;

const StyledArtistnameP = styled.p`
  margin: 0;
  padding: 10px 0 0 10px;
  font-size: 20px;
  letter-spacing: 8px;

  @media (max-width: 375px) {
    padding: 5px 0 0 5px;
    font-size: 15px;
    letter-spacing: 8px;
  }

  @media (max-width: 390px) {
    padding: 10px 0 0 5px;
    font-size: 17px;
    letter-spacing: 8px;
  }
`;

const StyledPriceP = styled.p`
  margin: 0;
  padding: 20px 0 10px 10px;
  font-size: 18px;
  letter-spacing: 3px;
  font-weight: bolder;

  @media (max-width: 375px) {
    padding: 20px 0 10px 5px;
    font-size: 13px;
  }

  @media (max-width: 390px) {
    padding: 10px 0 10px 5px;
    font-size: 15px;
  }
`;

const StyledLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: #139df4;
  bottom: 10px;
  font-size: 15px;
  font-weight: bold;
`;
