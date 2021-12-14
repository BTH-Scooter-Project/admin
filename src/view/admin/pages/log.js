import React from 'react';
import { DashboardTemplate } from "../Dashboard";

function LogContent() {
    return (
        <>
            <h1 align="center">Logs</h1>
        </>
    );
}

export default function Log() {
    return <DashboardTemplate component={LogContent}/>;
  }