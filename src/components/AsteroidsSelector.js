import React from "react";
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button
} from "@material-ui/core";
import { Delete as DeleteIcon } from '@material-ui/icons';
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import { 
    fetchFullAsteroid,
    deleteAsteroid
} from "../actions/asteroids";

class AsteroidsSelector extends React.Component {

    handleAsteroidSelect = ({ value: { link } }) => {
        this.props.fetchFullAsteroid(link);
    }

    render() {
        const { asteroids, selectedAsteroids, deleteAsteroid } = this.props;

        if(asteroids.length === 0 && selectedAsteroids.length === 0) return null;

        return (
            <Grid container>
                <Grid item md={8} xs={12} style={{marginTop: "1rem"}}>
                    <Select 
                        value={null}
                        placeholder="Select asteroid"
                        options={ asteroids.filter(asteroid => !selectedAsteroids.filter(selectedAsteroid => selectedAsteroid.id === asteroid.id).length).map(asteroid => ({
                            label: asteroid.name,
                            value: asteroid
                        })) }
                        onChange={this.handleAsteroidSelect}
                    />
                </Grid>
                <Grid item md={4} xs={12} style={{marginTop: "1rem"}}>
                    <List>
                        {
                            selectedAsteroids.map(asteroid => (
                                <ListItem key={asteroid.id}>
                                    <ListItemText>{asteroid.name}</ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Delete" onClick={() => deleteAsteroid(asteroid.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                    </List>
                    { selectedAsteroids.length > 0 && <Link to="/near-earth">
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Broj prolazaka pored Zemlje
                        </Button>
                    </Link> }
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({ asteroids }) => ({
    asteroids: asteroids.data,
    selectedAsteroids: asteroids.selected
});

const mapDispatchToProps = {
    fetchFullAsteroid,
    deleteAsteroid
};

export default connect(mapStateToProps, mapDispatchToProps)(AsteroidsSelector);