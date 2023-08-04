import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RapDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/rapstars/${id}`, fetcher);

  if (error) {
    return <h1>Nothing there..</h1>;
  }

  if (!data) {
    return <h1>LOADING...</h1>;
  }

  return (
    <>
      <button onClick={() => router.push("/RapPage")}>back</button>
      <Div>
        <Link href={"/shoppingCart"}>SHOPPING CART</Link>
      </Div>
      <article>
        <Image src={data.image} width={"280"} height={"150"} alt="Artist" />
        <p>{data.rating}</p>
        <h4>{data.name}</h4>
        <div>
          <p>{data.location}</p>
          <p>{data.date}</p>
          <p>
            {data.price} {data.currency}
          </p>
          <button>Add to Cart</button>
        </div>
        <div>
          <p>{data.locationTwo}</p>
          <p>{data.dateTwo}</p>
          <p>
            {data.price} {data.currency}
          </p>
          <button>Add to Cart</button>
        </div>
        <div>
          <p>{data.locationThree}</p>
          <p>{data.dateThree}</p>
          <p>
            {data.price} {data.currency}
          </p>
          <button>Add to Cart</button>
        </div>
      </article>
    </>
  );
}

const Div = styled.div`
  text-align: right;
`;
