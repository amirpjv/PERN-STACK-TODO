import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const Rating = ({ rating }) => {

    const stars = []
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FontAwesomeIcon key={i} icon={fasFaStar} className="text-warning" />)
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-warning" />)
        }
        else {
            stars.push(<FontAwesomeIcon key={i} icon={farFaStar} className="text-warning" />)
        }
    }

    return (
        <>
            {stars}
        </>
    );
}

export default Rating;