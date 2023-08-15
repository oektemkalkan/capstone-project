import Head from "next/head";
import styled from "styled-components";
import { Inter } from "next/font/google";
import Link from "next/link";

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
      <main className={inter.className}>
        <StyledHOne>Melodic Fever</StyledHOne>
      </main>
      <Div>
        <Link href={"/shoppingCart"}>SHOPPING CART</Link>
      </Div>
      <P>
        the wine that fills <br /> the cup of <br /> silence 🥂
      </P>
      <Nav>
        <Link href={"/RapPage"}> RAP </Link>
        <br />
        <Link href={"/PopPage"}> POP </Link>
      </Nav>
    </>
  );
}

const StyledHOne = styled.h1`
  text-align: center;
`;

const Nav = styled.nav`
  text-align: center;
`;

const P = styled.p`
  text-align: center;
`;

const Div = styled.div`
  text-align: right;
`;
