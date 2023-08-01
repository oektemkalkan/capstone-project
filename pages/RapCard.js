import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PopCard({ name, location, image, bewerten, preis }) {
  const router = useRouter();
  const { data, isLoading } = useSWR("/api/rapstars", fetcher);

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }

  if (!data) {
    return <h1> SORRY, no concerts for you! 🥀</h1>;
  }
  return (
    <>
      <button onClick={() => router.push("/")}>back</button>
      <div>
        <h2>RAP</h2>
      </div>
      <div>
        <ul>
          {data.map((rapstars) => (
            <li key={rapstars._id}>
              <Image
                src={rapstars.image}
                width={"200"}
                height={"100"}
                alt="Rap-Artist"
              />
              <h4>{rapstars.name}</h4>
              <p>{rapstars.location}</p>
              <p>{rapstars.rating}</p>
              <p>
                {rapstars.price} {rapstars.currency}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
