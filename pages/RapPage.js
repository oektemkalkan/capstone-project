import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RapPage() {
  const router = useRouter();
  const { data, isLoading } = useSWR("/api/rapstars", fetcher);

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }

  if (!data) {
    return <h1> SORRY, no concerts for you! 🥀</h1>;
  }
  const handleRapStarClick = (id) => {
    router.push(`/rap/${id}`);
  };
  return (
    <>
      <button onClick={() => router.push("/")}>back</button>
      <Div>
        <Link href={"/shoppingCart"}>SHOPPING CART</Link>
      </Div>
      <div>
        <h2>RAP</h2>
      </div>
      <hr />
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

const Div = styled.div`
  text-align: right;
`;
