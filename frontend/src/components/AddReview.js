import { useState } from 'react'
import { Container, Form, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { REVIEWS_CREATE_RESET } from '../constants/restaurantsConstants';
import { createReviews } from '../actions/restaurantsActions';
import { useDispatch, useSelector } from 'react-redux'
import { detailsRestaurants } from '../actions/restaurantsActions'

const AddReview = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const restaurantsDetails = useSelector((state) => state.restaurantsDetails);
    const { loading, error, restaurants, reviews } = restaurantsDetails
    
    const [name, setName] = useState("")
    const [review, setReview] = useState("")
    const [rating, setRating] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        if (!name || !review || !rating === "") {
            return alert("Fill all fields!")
        }
        dispatch({ type: REVIEWS_CREATE_RESET });
        dispatch(createReviews({
            id,
            name,
            review,
            rating,
        }))
        setName("")
        setReview("")
        setRating("")
        dispatch(detailsRestaurants(id))
    }

    return (
        <>
            <Container fluid className="mb-2">
                <Form onSubmit={submitHandler}>
                    <Row className="mb-3">
                        <Form.Group className="w-75" controlId="formGridEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
                        </Form.Group>

                        <Form.Group className="w-25" controlId="formGridPassword">
                            <Form.Label>Rating</Form.Label>
                            <Form.Select required value={rating} onChange={(e) => setRating(e.target.value)}>
                                {/* <Form.Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} placeholder="placeholder" required> */}
                                <option className="d-none" value="">Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Review</Form.Label>
                        <Form.Control as="textarea" value={review} onChange={(e) => setReview(e.target.value)} rows={3} style={{ resize: 'none' }} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-25">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );

}

export default AddReview;
