import styled from "styled-components";
import { useState } from "react";

export default function InputForm({
  reviews,
  setReviews,
  data,
  onSubmitReview,
}) {
  const [rating, setRating] = useState("");

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

      setRating("");

      event.target.reset();
      event.target.elements[0].focus();

      await onSubmitReview(reviewData);
    } catch (error) {
      console.error("Something wrong:", error.message);
    }
  }

  function handleRatingChange(event) {
    const inputValue = event.target.value;
    if (inputValue.length <= 1) {
      setRating(inputValue);
    }
  }

  return (
    <>
      <StyledForm name="formReview" onSubmit={handleAddReview}>
        <StyledLabel htmlFor="form">Rating</StyledLabel>
        <StyledRow name="form">
          <StyledInput
            id="name"
            name="name"
            type="text"
            minLength={3}
            maxLength={20}
            pattern="[A-Za-zÖÜÄöüäß\s]+"
            placeholder="username"
            required
          />
          <StyledRateInput
            name="rating"
            type="number"
            min={1}
            max={5}
            pattern="^\d+"
            placeholder="1-5"
            required
            value={rating}
            onInput={handleRatingChange}
          />
        </StyledRow>
        <StyledTextArea
          name="opinion"
          type="text"
          minLength={1}
          maxLength={100}
          pattern=".*"
          placeholder="tell us your thoughts"
          required
        />

        <StyledButton type="submit">send</StyledButton>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 325px;
  margin: 0 auto;
  border-left: 0.5px dotted #ccc;
  border-right: 0.5px dotted #ccc;
  padding: 25px 20px 25px 20px;
  margin-bottom: 30px;

  @media (max-width: 390px) {
    margin-bottom: 35px;
    padding: 30px 20px 25px 20px;
    max-width: 335px;
  }

  @media (max-width: 430px) {
    margin-bottom: 40px;
    padding: 35px 20px 25px 20px;
    max-width: 370px;
  }
`;

const StyledRow = styled.div`
  display: flex;
`;

const StyledLabel = styled.label`
  letter-spacing: 1px;
  margin-bottom: 10px;
  font-size: 13px;
  border-bottom: 0.5px solid #000;
  width: 25%;
  padding-bottom: 2px;

  @media (max-width: 390px) {
    margin-bottom: 15px;
    font-size: 15px;
  }

  @media (max-width: 430px) {
    margin-bottom: 20px;
    font-size: 16px;
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &::placeholder {
    font-size: 14px;
    font-family: Verdana;
  }

  @media (max-width: 390px) {
    margin-bottom: 15px;
  }

  @media (max-width: 430px) {
    margin-bottom: 20px;
  }
`;

const StyledRateInput = styled.input`
  padding: 10px 20px 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-left: 40px;
  margin-bottom: 10px;

  &::placeholder {
    font-size: 9px;
    font-family: Verdana;
  }

  @media (max-width: 390px) {
    margin-left: 35px;
    padding: 10px 25px 10px 25px;
    margin-bottom: 15px;
  }

  @media (max-width: 430px) {
    margin-left: 40px;
    padding: 10px 35px 10px 35px;
    margin-bottom: 20px;
  }
`;

const StyledTextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  white-space: pre-wrap;
  word-break: break-all;
  resize: none;
  height: 80px;

  &::placeholder {
    font-size: 14px;
    font-family: Verdana;
  }

  @media (max-width: 390px) {
    margin-bottom: 30px;
  }

  @media (max-width: 430px) {
    margin-bottom: 30px;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffb201;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  color: white;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: #e5a200;
  }

  @media (max-width: 390px) {
    padding: 12px;
    font-size: 18px;
  }

  @media (max-width: 430px) {
    padding: 14px;
    font-size: 20px;
  }
`;
