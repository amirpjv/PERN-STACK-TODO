import express from "express"
import cors from "cors"
import pg from 'pg';
const app = express();

const { Pool } = pg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432,
});

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions));

app.listen(5555, () => {
    console.log('connceted...')
})

app.get('/api/restaurants', async (req, res) => {
    try {
        // const result = await pool.query('SELECT * FROM "restaurants";')
        const restaurantRatingsData = await pool.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS AVERAGE_RATING FROM reviews GROUP BY restaurant_id) reviews on restaurants.id =reviews.restaurant_id ;')
        // res.status(200).json({
        //     restaurants: result.rows[0]
        // })
        res.status(200).send(restaurantRatingsData.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get('/api/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await pool.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS AVERAGE_RATING FROM reviews GROUP BY restaurant_id) reviews on restaurants.id =reviews.restaurant_id WHERE id=$1 ;', [req.params.id])
        // const result = await pool.query(`SELECT * FROM restaurants WHERE id=${req.params.id} ;`)
        const reviews = await pool.query('SELECT * FROM reviews WHERE restaurant_id=$1 ;', [req.params.id])

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
            }
        })
    } catch (err) {
        console.error(err.message)
    }
})

app.post('/api/restaurants', async (req, res) => {
    try {
        const { name, location, price_range } = req.body
        const result = await pool.query('INSERT INTO restaurants (name, location , price_range) VALUES ($1,$2,$3) RETURNING *;', [name, location, price_range])
        res.status(201).send(result.rows[0])
        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         restaurant: result.rows[0]
        //     }
        // })
    } catch (err) {
        console.error(err.message)
    }
})

app.put('/api/restaurants/:id', async (req, res) => {
    try {
        const { name, location, price_range } = req.body
        const result = await pool.query('UPDATE restaurants SET name=$1, location=$2 , price_range=$3 WHERE id=$4 RETURNING *;', [name, location, price_range, req.params.id])
        res.status(200).send(result.rows[0])
        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         restaurant: result.rows[0]
        //     }
        // })
    } catch (err) {
        console.error(err.message)
    }
})

app.delete('/api/restaurants/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM restaurants WHERE id=$1 RETURNING *;', [req.params.id])
        res.status(204).send(result.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.post('/api/restaurants/:id/addReview', async (req, res) => {
    try {
        const { name, review, rating } = req.body
        const newReview = await pool.query('INSERT INTO reviews (restaurant_id, name, review , rating) VALUES ($1,$2,$3,$4) RETURNING *;', [req.params.id, name, review, rating])
        res.status(201).send(newReview.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})