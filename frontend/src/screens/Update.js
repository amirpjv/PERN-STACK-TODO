import { useState, useEffect } from 'react'
import { Container, Form, Button, } from 'react-bootstrap'
import Loader from "../components/Loader"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { detailsRestaurants, updateRestaurants } from '../actions/restaurantsActions'

const Update = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams()

  const restaurantsDetails = useSelector((state) => state.restaurantsDetails);
  const { loading, error, restaurants, success } = restaurantsDetails;

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateRestaurants({
        id,
        name,
        location,
        price_range: priceRange,
      })
    );
    navigate('/')
  }

  useEffect(() => {
    dispatch(detailsRestaurants(id))
  }, [dispatch])

  useEffect(() => {
    if (success) {
      setName(restaurants.name)
      setLocation(restaurants.location)
      setPriceRange(restaurants.price_range)
    }
  }, [success])

  return (
    <>
      <Container fluid>
        <h1 className="d-flex justify-content-center my-5">Update Restaurant</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <h3 className="text-center">{error}</h3>
        ) : (
              <Form className="d-flex flex-column" onSubmit={submitHandler}>
                <Form.Group className="w-100" controlId="for-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" required />
                </Form.Group>

                <Form.Group className="w-100 my-3" controlId="form-location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control value={location} onChange={(e) => setLocation(e.target.value)} type="text" required />
                </Form.Group>

                <Form.Group className="w-100">
                  <Form.Label>Price Range</Form.Label>
                  <Form.Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} required>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-25 mt-3">
                  Update
                </Button>
              </Form>
            )}
      </Container>
    </>
  );
}

export default Update;