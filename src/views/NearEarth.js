import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Button
} from "@material-ui/core";
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    HorizontalBarSeries
} from 'react-vis';
 
const formatData = (selectedAsteroids) => {
    const data = selectedAsteroids.sort((a1, a2) => a1.near_earth - a2.near_earth).map(asteroid => ({
        x: asteroid.near_earth,
        y: asteroid.name
    }));

    return {
        green: data.filter(asteroid => asteroid.x < 26),
        yellow: data.filter(asteroid => asteroid.x > 25 && asteroid.x < 46),
        orange: data.filter(asteroid => asteroid.x > 45 && asteroid.x < 76),
        red: data.filter(asteroid => asteroid.x > 75)
    };
}

const NearEarth = ({ selectedAsteroids }) => {

    const data = formatData(selectedAsteroids);

    return (
        <React.Fragment>
            <Link to="/">
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                >
                    Nazad
                </Button>
            </Link>
            <div style={{marginTop: "1rem"}}>
                <XYPlot width={1000} height={500} yType="ordinal" margin={{
                    left: 200, 
                    right: 10, 
                    top: 10, 
                    bottom: 40}}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <HorizontalBarSeries data={data.green} color="green" />
                    <HorizontalBarSeries data={data.yellow} color="yellow" />
                    <HorizontalBarSeries data={data.orange} color="orange" />
                    <HorizontalBarSeries data={data.red} color="red" />
                </XYPlot>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = ({ asteroids }) => ({
    selectedAsteroids: asteroids.selected
});

export default connect(mapStateToProps)(NearEarth);