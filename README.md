# PERN-STACK-TODO
redux-react bootstrap


add below tables to Postgres sql

 CREATE TABLE restaurants(
     id SERIAL PRIMARY KEY NOT NULL,
     name VARCHAR(50) NOT NULL,
     location VARCHAR(50) NOT NULL,
     price_range INT NOT NULL check(
         price_range >= 1
         and price_range <= 5
     ),
     created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
     updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
 );

CREATE TABLE reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL check(rating >=1 AND rating <= 5)
);
