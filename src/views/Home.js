import React from "react";

import AsteroidsForm from "../components/AsteroidsForm";
import AsteroidsTable from "../components/AsteroidsTable";
import AsteroidsSelector from "../components/AsteroidsSelector";

export default (props) => (
    <div>
        <AsteroidsForm />
        <AsteroidsTable />
        <AsteroidsSelector />
    </div>
)