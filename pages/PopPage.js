import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PopCard() {
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
      <div>
        <h2>POP</h2>
      </div>
      <div>
        <ul>
          {data.map((popstars) => (
            <li key={popstars._id}>
              <Image
                src={popstars.image}
                width={"200"}
                height={"100"}
                alt="Pop-Artist"
              />
              <h4>{popstars.name}</h4>
              <p>{popstars.location}</p>
              <p>{popstars.rating}</p>
              <p>
                {popstars.price} {popstars.currency}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
