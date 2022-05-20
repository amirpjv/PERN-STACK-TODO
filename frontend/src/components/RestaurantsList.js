import { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap'
import Loader from "./Loader"
import { useDispatch, useSelector } from 'react-redux'
import { listRestaurants, deleteRestaurants } from '../actions/restaurantsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import Rating from './Rating'

const RestaurantList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const restaurantsList = useSelector((state) => state.restaurantsList)
    const { loading, error, restaurants } = restaurantsList

    const restaurantsDelete = useSelector((state) => state.restaurantsDelete)
    const { success, deleteError } = restaurantsDelete

    useEffect(() => {
        dispatch(listRestaurants())
    }, [dispatch])

    useEffect(() => {
        if (success) {
            dispatch(listRestaurants())
        }
    }, [success])

    const deleteHandler = (e, id) => {
        e.stopPropagation();
        dispatch(deleteRestaurants(id))
    }

    const restaurantSelectHandler = (id) => {
        navigate(`/restaurants/${id}`)
    }

    return (
        <>
            <Container fluid className="mt-5">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <h3 className="text-center">{error}</h3>
                ) :
                        deleteError ? (
                            <h3 className="text-center">{deleteError}</h3>
                        ) : (
                                <Table striped bordered hover variant="dark" className="text-center">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Restaurant</th>
                                            <th>Location</th>
                                            <th>Price Range</th>
                                            <th>Ratings</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {restaurants.map((restaurant) => (
                                            <tr key={restaurant.id} onClick={() => restaurantSelectHandler(restaurant.id)}>
                                                <td>{restaurant.id}</td>
                                                <td>{restaurant.name}</td>
                                                <td>{restaurant.location}</td>
                                                <td>{"$".repeat(restaurant.price_range)}</td>
                                                {!restaurant.count ? <td className="text-warning">0 Review</td> : <td><Rating rating={restaurant.average_rating} /><span className="text-warning">{' '}({restaurant.count})</span></td>}
                                                <td>
                                                    <LinkContainer to={`restaurants/${restaurant.id}/update`} onClick={(e) => e.stopPropagation()}>
                                                        <Button variant='transparent' className='btn-sm'>
                                                            <FontAwesomeIcon icon={faEdit} className="text-success" />
                                                        </Button>
                                                    </LinkContainer>
                                                </td>
                                                <td>
                                                    <Button
                                                        variant='transparent'
                                                        className='btn-sm'
                                                        onClick={(e) => deleteHandler(e, restaurant.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="text-danger" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
            </Container>
        </>
    );
}

export default RestaurantList;
