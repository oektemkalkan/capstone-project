import Head from "next/head";
import styled from "styled-components";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ name, location, image, bewerten, preis }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Capstone Project</title>
        <meta name="description" content="Capstone Project: Melodic Fever" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <Heading>Melodic Fever</Heading>
      </main>
      <p>
        the wine that fills <br /> the cup of <br /> silence 🥂
      </p>
      <nav>
        <button onClick={() => router.push("/RapCard")}> RAP </button>
        <br />
        <button onClick={() => router.push("/PopCard")}> POP </button>
      </nav>
    </>
  );
}

const Heading = styled.h1`
  text-align: center;
`;
