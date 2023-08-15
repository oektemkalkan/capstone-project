import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PopPage() {
  const router = useRouter();
  const { data, isLoading } = useSWR("/api/popstars", fetcher);

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }

  if (!data) {
    return <h1> SORRY, no concerts for you! 🥀</h1>;
  }
  return (
    <>
      <button onClick={() => router.push("/")}>back</button>
      <Div>
        <Link href={"/shoppingCart"}>SHOPPING CART</Link>
      </Div>
      <div>
        <h2>POP</h2>
      </div>
      <hr />
      <div>
        <ul>
          {data.map((popstars) => (
            <li key={popstars._id}>
              <Image
                src={popstars.image}
                width={"280"}
                height={"150"}
                alt="Pop-Artist"
              />
              <p>{popstars.rating}</p>
              <h4>{popstars.name}</h4>

              <p>
                {popstars.currency} {popstars.price}
              </p>
              <Link href={`/popDetails/${popstars._id}`}>Find Tickets</Link>
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
