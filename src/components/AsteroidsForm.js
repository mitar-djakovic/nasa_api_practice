import React from "react";
import {
    Grid,
    Button
} from "@material-ui/core";
import { 
    MuiPickersUtilsProvider, 
    DatePicker 
} from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { connect } from "react-redux";
import { fetchAsteroids } from "../actions/asteroids";

class AsteroidsForm extends React.Component {
    state = {
        startDate: null,
        endDate: null
    };

    handleDateChange = name => date => {
        this.setState({ [name]: date });
    };

    _maxEndDate = () => {
        const { startDate } = this.state;
        const now = moment();

        if(startDate && startDate.clone().add(7, 'days').isSameOrBefore(now)) {
            return startDate.clone().add(7, 'days');
        }

        return now;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { startDate, endDate } = this.state;

        this.props.fetchAsteroids(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"));
    }

    render() {
        const { startDate, endDate } = this.state;

        return (
            <Grid container>
                <Grid item md={6}>
                    <form onSubmit={this.handleSubmit} >
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker
                                margin="normal"
                                fullWidth
                                label="Start Date"
                                value={startDate}
                                onChange={this.handleDateChange("startDate")}
                                format="DD-MM-YYYY"
                                maxDate={moment()}
                            />
                            <DatePicker
                                margin="normal"
                                fullWidth
                                label="End Date"
                                value={endDate}
                                onChange={this.handleDateChange("endDate")}
                                format="DD-MM-YYYY"
                                minDate={startDate}
                                maxDate={this._maxEndDate()}
                            />
                        </MuiPickersUtilsProvider>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Prikaži Asteroide
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = {
    fetchAsteroids
}

export default connect(null, mapDispatchToProps)(AsteroidsForm);