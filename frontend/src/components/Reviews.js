import { useEffect } from 'react'
import { Container, Card, Badge } from 'react-bootstrap';
import Rating from './Rating'
import { detailsRestaurants } from '../actions/restaurantsActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "./Loader"
import { useParams } from 'react-router-dom';

const Reviews = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const restaurantsDetails = useSelector((state) => state.restaurantsDetails);
    const { loading, error, restaurants, reviews } = restaurantsDetails

    useEffect(() => {
        dispatch(detailsRestaurants(id))
    }, [dispatch])

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <h3 className="text-center mb-2">{error}</h3>
            ) : (
                        <Container fluid>
                            <Container className="text-center my-3">
                                <h1 className="display-3">{restaurants.name}</h1>
                                <Rating rating={restaurants.average_rating}/>
                                <span className="text-warning">{' '}({restaurants.count})</span>
                            </Container>
                            <Container fluid className="row row-cols-3 mb-2 justify-content-around mx-auto">
                                {reviews.map((review) => (
                                    <Card key={review.id} className="mb-3 px-0" style={{ maxWidth: "30%" }}>
                                        <Card.Header className="d-flex justify-content-between">
                                            <Badge className="bg-transparent text-black">{review.name}</Badge>
                                            <Badge className="bg-transparent"><Rating rating={review.rating} /></Badge>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {review.review}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Container>
                        </Container>
                    )}
        </>
    );
}

export default Reviews;
