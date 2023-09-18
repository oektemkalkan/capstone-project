import Header from "@/components/mainHeader/header";
import BackButton from "@/components/backButton/backButton";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";

export default function Reviews() {
  const router = useRouter();
  const [reviews] = useLocalStorageState("review", []);

  const { name } = router.query;

  if (name === undefined) {
    return <p>No artist name found.</p>;
  }

  const artistReviews = reviews
    ? reviews.filter((review) => review.artistName === name)
    : [];

  return (
    <>
      <Header />
      <BackButton />

      <h1>{name}&apos;s Ratings</h1>

      {artistReviews.length === 0 ? (
        <p>No reviews available for {name}.</p>
      ) : (
        artistReviews.map((review) => (
          <div key={review.id}>
            <h2>{review.name}</h2>
            <p>⭐️ {review.rating}</p>
            <p>{review.opinion}</p>
          </div>
        ))
      )}
    </>
  );
}
