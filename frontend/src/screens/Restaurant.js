import { Container } from 'react-bootstrap'
import Reviews from "../components/Reviews"
import AddReview from "../components/AddReview"

const Restaurant = () => {

  return (
    <>
      <Container fluid>
        <Reviews />
        <AddReview />
      </Container>
    </>
  );
}

export default Restaurant;