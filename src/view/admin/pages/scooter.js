import React from 'react';

import { DashboardTemplate } from "../Dashboard";


function ScooterContent() {
    return (
        <>
            <h1 align="center">Scooters</h1>
        </>
    );
}

export default function Scooter() {
    return <DashboardTemplate component={ScooterContent}/>;
  }