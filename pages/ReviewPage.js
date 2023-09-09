import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";

export default function Reviews() {
  const router = useRouter();
  const { name } = router.query;

  if (name === undefined) {
    return <p>No artist name found.</p>;
  }
  const [reviews = []] = useLocalStorageState("review");

  const goBack = () => {
    router.back({ name });
  };

  const artistReviews = reviews.filter((review) => review.artistName === name);

  return (
    <>
      <button onClick={goBack}>back</button>

      <h1>{name}'s Ratings</h1>

      {artistReviews.length === 0 ? (
        <p>No reviews available for {name}.</p>
      ) : (
        artistReviews.map((review) => (
          <div key={review.id}>
            <h2>{review.name}</h2>
            <p>Rating: {review.rating}</p>
            <p>Opinion: {review.opinion}</p>
          </div>
        ))
      )}
      {console.log(artistReviews)}
    </>
  );
}
