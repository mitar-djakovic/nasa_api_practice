import {
    ASTEROIDS_REQUEST,
    ASTEROIDS_SUCCEEDED,
    ASTEROIDS_FAILED,
    ADD_SELECTED_ASTEROID,
    REMOVE_SELECTED_ASTEROID
} from "../constants/actionTypes";
import client from "../client";
import axios from "axios";
import Swal from 'sweetalert2';

const asteroidsRequest = () => ({ type: ASTEROIDS_REQUEST });
const asteroidsSucceeded = (asteroids) => ({ type: ASTEROIDS_SUCCEEDED, payload: { asteroids } });
const asteroidsFailed = (error) => ({ type: ASTEROIDS_FAILED, payload: { error } });

const addSelectedAsteroid = (asteroid) => ({ type: ADD_SELECTED_ASTEROID, payload: { asteroid } });
const removeSelectedAsteroid = (asteroid) => ({ type: REMOVE_SELECTED_ASTEROID, payload: { asteroid } });

const showError = error => {
    Swal({
        type: 'error',
        title: 'Oops...',
        text: error && error.data && error.data.error_message ? error.data.error_message : "Something went wrong!"
    });
}

export const fetchAsteroids = (startDate, endDate) => dispatch => {
    dispatch(asteroidsRequest());
    client.get(`feed?start_date=${startDate}&end_date=${endDate}`)
        .then(({ data: { near_earth_objects } }) => dispatch(asteroidsSucceeded(
            Object.keys(near_earth_objects).reduce((acc, currDate) => {
                const asteroids = near_earth_objects[currDate];
                return acc.concat(asteroids
                    .filter(asteroid => asteroid.is_potentially_hazardous_asteroid)
                    .map(asteroid => ({
                        id: asteroid.id,
                        date: currDate,
                        name: asteroid.name,
                        speed: asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
                        minDiameter: asteroid.estimated_diameter.meters.estimated_diameter_min,
                        maxDiameter: asteroid.estimated_diameter.meters.estimated_diameter_max,
                        link: asteroid.links.self
                    }))
                );
            }, [])
        )))
        .catch(({ response }) => {
            showError(response);
            dispatch(asteroidsFailed(response));
        });
}

export const fetchFullAsteroid = link => dispatch => {
    axios.get(link)
        .then(({ data: { id, name, close_approach_data } }) => dispatch(addSelectedAsteroid({
            id,
            name,
            near_earth: close_approach_data.filter(({ close_approach_date, orbiting_body }) => {
                const year = parseInt(close_approach_date.substr(0,4));
                return orbiting_body === "Earth" && year >= 1900 && year <= 1999;
            }).length
        })))
        .catch(({ response }) => showError(response));
}

export const deleteAsteroid = asteroid => dispatch => dispatch(removeSelectedAsteroid(asteroid));