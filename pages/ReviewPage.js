import Header from "@/components/mainHeader/header";
import BackButton from "@/components/backButton/backButton";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";

export default function Reviews() {
  const router = useRouter();
  const [reviews, setReviews] = useLocalStorageState("review", []);

  const { name } = router.query;

  if (name === undefined) {
    return <p>No artist name found.</p>;
  }

  const artistReviews = reviews
    ? reviews.filter((review) => review.artistName === name)
    : [];

  const handleDeleteReview = (reviewToDelete) => {
    const updatedReviews = reviews.filter(
      (reviews) => reviews.id !== reviewToDelete
    );
    setReviews(updatedReviews);
  };

  return (
    <>
      <Header />
      <BackButton />
      <ReviewPageContainer>
        <StyledHeaderP>{name}&apos;s Ratings</StyledHeaderP>
        <StyledHr />
        {artistReviews.length === 0 ? (
          <StyledNoMessageP>No reviews available for {name}.</StyledNoMessageP>
        ) : (
          artistReviews.map((review) => (
            <ReviewContainer key={review.id}>
              <StyledNameP>
                {review.name}
                <StyledSpan>
                  <StyledSvg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="black"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </StyledSvg>
                  {review.rating}
                </StyledSpan>
              </StyledNameP>
              <StyledOpinionP>{review.opinion}</StyledOpinionP>
              <StyledDeleteButton onClick={() => handleDeleteReview(review.id)}>
                DELETE
              </StyledDeleteButton>
            </ReviewContainer>
          ))
        )}
      </ReviewPageContainer>
    </>
  );
}

const StyledHr = styled.hr`
  width: 200px;
  height: 0.5px;
  background-color: black;
  border: none;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.2;

  @media (max-width: 390px) {
    width: 220px;
  }

  @media (max-width: 430px) {
    width: 240px;
  }
`;

const ReviewPageContainer = styled.div`
  margin: 20px 20% 0 20%;
  text-align: center;

  @media (max-width: 375px) {
    margin: 10px 0 0 0;
  }

  @media (max-width: 390px) {
    margin: 15px 0 0 0;
  }

  @media (max-width: 430px) {
    margin: 20px 0 0 0;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: white;
  border: 2px dashed #ddd;
  padding: 10px;
  margin: 10px 40px 40px 40px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(255, 255, 0, 0.1);
`;

const StyledHeaderP = styled.p`
  font-size: 10px;
  letter-spacing: 1px;
  margin-bottom: 5px;
  opacity: 0.15;
`;

const StyledNoMessageP = styled.p`
  font-size: 16px;
  color: #888;
`;

const StyledNameP = styled.p`
  font-size: 15px;
  letter-spacing: 2px;

  @media (max-width: 390px) {
    font-size: 18px;
  }

  @media (max-width: 430px) {
    font-size: 20px;
  }
`;

const StyledSpan = styled.span`
  font-weight: bolder;
  font-size: 14px;
  margin-left: 10px;
`;

const StyledSvg = styled.svg`
  margin-right: 5px;
`;

const StyledOpinionP = styled.p`
  font-size: 14px;
  font-weight: 200;
  margin: 15px 0 0 0;
  word-wrap: break-word;
  max-width: 200px;

  @media (max-width: 390px) {
    max-width: 210px;
    font-size: 15px;
  }

  @media (max-width: 430px) {
    max-width: 230px;
    font-size: 16px;
  }
`;

const StyledDeleteButton = styled.button`
  position: relative;
  background-color: #ff5733;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 10px 0 0 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px;
  top: 20px;
  left: -100px;
  font-weight: 100;

  &:hover {
    background-color: #d63200;
  }

  @media (max-width: 390px) {
    font-size: 12px;
  }

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;
