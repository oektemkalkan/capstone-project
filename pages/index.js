import Header from "@/components/mainHeader/header";
import ShoppingCart from "@/components/shoppingCartButton/shoppingCart";
import styled from "styled-components";
import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import Lottie from "lottie-react";
import gifdata from "../public/animation-Gif.json";
import Image from "next/image";
import RapImage from "../public/rap.jpg";
import PopImage from "../public/pop.jpg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Capstone Project</title>
        <meta name="description" content="Capstone Project: Melodic Fever" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
      </main>
      <ShoppingCart />
      <ContainerDiv>
        <AnimatedGifDiv>
          <Lottie animationData={gifdata} loop={true} />
        </AnimatedGifDiv>
        <StyledP>
          &lsquo;the wine that fills <br /> the cup of <br /> silence&rsquo;
        </StyledP>
      </ContainerDiv>
      <StyledNav>
        <RapContainerDiv>
          <StyledImageRap
            src={RapImage}
            alt="Rap Artist"
            width={700}
            height={400}
          />
          <Link
            href={"/RapPage"}
            style={{
              textDecoration: "none",
              color: "white",
              zIndex: "1",
              letterSpacing: 18,
              fontWeight: "bolder",
            }}
          >
            RAP
          </Link>
        </RapContainerDiv>
        <br />
        <PopContainerDiv>
          <StyledImagePop
            src={PopImage}
            alt="Pop Artist"
            width={700}
            height={400}
          />
          <Link
            href={"/PopPage"}
            style={{
              textDecoration: "none",
              color: "white",
              zIndex: "1",
              letterSpacing: 18,
              fontWeight: "bolder",
            }}
          >
            POP
          </Link>
        </PopContainerDiv>
      </StyledNav>
    </>
  );
}

const StyledNav = styled.nav`
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 375px) {
    font-size: 1rem;
  }
`;

const StyledP = styled.p`
  position: absolute;
  top: 50px;
  left: 50%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  font-family: "Gill Sans", sans-serif;
  letter-spacing: 5px;
  opacity: 0.3;

  @media (max-width: 375px) {
    top: 40px;
    left: 50%;
    font-size: 10px;
    letter-spacing: 1.5px;
  }
`;

const AnimatedGifDiv = styled.div`
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 15px 20px -20px;
  overflow: hidden;
  width: 600px;
  z-index: -1;

  @media (max-width: 375px) {
    margin-top: 0px;
    width: 300px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 10px -10px;
  }
`;

const ContainerDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const RapContainerDiv = styled.div`
  padding: 40px;
  margin: 90px 18% 25px 18%;
  border-radius: 5px 30px 5px 30px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px 0px;
  position: relative;
  overflow: hidden;

  @media (max-width: 375px) {
    margin: 70px 10% 15px 10%;
    padding: 30px;
    border-radius: 5px 25px 5px 25px;
  }
`;

const PopContainerDiv = styled.div`
  padding: 40px;
  margin: 10px 18% 40px 18%;
  border-radius: 5px 30px 5px 30px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px 0px;
  position: relative;
  overflow: hidden;

  @media (max-width: 375px) {
    margin: 0px 10% 30px 10%;
    padding: 30px;
    border-radius: 5px 25px 5px 25px;
  }
`;

const StyledImageRap = styled(Image)`
  position: absolute;
  top: -240px;
  left: 0;
  width: 100%;
  object-fit: cover;
  opacity: 0.85;
  z-index: -1;
`;

const StyledImagePop = styled(Image)`
  position: absolute;
  top: -220px;
  left: 0;
  width: 100%;
  object-fit: cover;
  opacity: 0.85;
  z-index: -10;

  @media (max-width: 375px) {
    top: -200px;
  }
`;
