import styled from "styled-components";

export default function InputForm({
  reviews,
  setReviews,
  data,
  onSubmitReview,
}) {
  async function handleAddReview(event) {
    event.preventDefault();

    const reviewId = () => {
      return Math.random().toString(32).substring(2);
    };

    const formData = new FormData(event.target);
    const reviewData = {
      id: reviewId(),
      name: formData.get("name"),
      rating: Number(formData.get("rating")),
      opinion: formData.get("opinion"),
      artistName: data.name,
    };

    try {
      if (reviews === null || reviews === undefined) {
        setReviews([reviewData]);
      } else {
        const existingReview = reviews.find(
          (review) => review.id === reviewData.id
        );
        if (existingReview) {
          console.log(`A review for '${data.name}' is already in the cart.`);
        } else {
          setReviews([...reviews, reviewData]);
        }
      }

      await onSubmitReview(reviewData);
    } catch (error) {
      console.error("Something wrong:", error.message);
    }

    event.target.reset();
    event.target.elements[0].focus();
  }

  return (
    <>
      <form name="formReview" onSubmit={handleAddReview}>
        <label htmlFor="name">Enter your name</label>

        <input
          id="name"
          name="name"
          type="text"
          minLength={3}
          maxLength={20}
          pattern="[A-Za-z\s]+"
          placeholder="Username"
          required
        />

        <input
          name="rating"
          type="number"
          min={1}
          max={5}
          pattern="^\d+"
          placeholder="rate"
          required
        />

        <input
          name="opinion"
          type="text"
          minLength={1}
          maxLength={100}
          pattern=".*"
          placeholder="opinion"
          required
        />

        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="black"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </button>
      </form>
    </>
  );
}
