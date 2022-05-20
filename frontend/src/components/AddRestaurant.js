import { useState, useEffect } from 'react';
import { Container, Form, Button, } from 'react-bootstrap'
import { createRestaurants } from '../actions/restaurantsActions';
import { useDispatch, useSelector } from 'react-redux'
import { RESTAURANTS_CREATE_RESET } from '../constants/restaurantsConstants';
import { listRestaurants } from '../actions/restaurantsActions';

const AddRestaurant = () => {
    const dispatch = useDispatch()

    //access to reducer values
    const restaurantsCreate = useSelector((state) => state.restaurantsCreate)
    const { success, error } = restaurantsCreate

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")

    const submitHandler = (e) => {
        e.preventDefault();
        if (priceRange === "Price Range") {
            return alert("Choose Price!")
        }
        dispatch({ type: RESTAURANTS_CREATE_RESET });
        dispatch(createRestaurants({
            name,
            location,
            price_range: priceRange,
        }))
    }

    useEffect(() => {
        dispatch(listRestaurants())
    }, [success])

    return (
        <>
            <Container fluid>
                {error ? (
                    <h3 className="text-center">{error}</h3>
                ) : (
                        <Form className="d-flex justify-content-between" onSubmit={submitHandler}>
                            <Form.Group className="w-75" controlId="for-name">
                                <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required />
                            </Form.Group>

                            <Form.Group className="w-75 mx-1" controlId="form-location">
                                <Form.Control value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Location" required />
                            </Form.Group>

                            <Form.Group className="w-75">
                                <Form.Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} placeholder="placeholder" required>
                                    <option disabled>Price Range</option>
                                    {/* <option className="d-none" value="">Price Range</option> disappear after openning */}
                                    <option value="1">$</option>
                                    <option value="2">$$</option>
                                    <option value="3">$$$</option>
                                    <option value="4">$$$$</option>
                                    <option value="5">$$$$$</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="ms-1 w-25">
                                Add
                    </Button>
                        </Form>
                    )}
            </Container>
        </>
    );
}

export default AddRestaurant;