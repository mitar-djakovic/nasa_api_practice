import React from "react";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";

const columns = [
    "Datum",
    "Ime",
    "Brzina Kretanja (km/h)",
    "Min. Prečnik (m)",
    "Max. Prečnik (m)"
]

const formatData = (asteroids) => asteroids.map(({ date, name, speed, minDiameter, maxDiameter }) => [
    date, name, speed, minDiameter, maxDiameter
]);

const AsteroidsTable = ({ asteroids }) => asteroids.length ? (
    <div style={{ marginTop: "1rem" }}>
        <MUIDataTable
            title="Asteroids"
            data={formatData(asteroids)}
            columns={columns}
            options={{
                selectableRows: false,
                responsive: "scroll",
                rowsPerPageOptions: [10],
                filter: false,
                search: false,
                print: false,
                download: false,
                viewColumns: false
            }}
        />
    </div>
) : null;

const mapStateToProps = ({ asteroids }) => ({
    asteroids: asteroids.data
});

export default connect(mapStateToProps)(AsteroidsTable);