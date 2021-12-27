import React from "react";
import { DashboardTemplate } from "../Dashboard";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import useSWR from "swr";

const fetcher = async () => {
    const response = await axios.get('http://localhost:1337/v1/city/2?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405');
    const data = response.data.data
    return data;
}
 
function MaintenenceContent() {
    const { data } = useSWR('test', fetcher);
    const pageSize = 15;
    const columns = [
        {
            field: "stationid",
            headerName: 'BikeID',
            width: 90
        }
      ];

    return (
        <>
            <h1 align="center">Maintenence</h1>
            <div style={{ display: 'flex', minHeight: 900 }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        disableSelectionOnClick
                        pageSize={pageSize}
                        rowsPerPageOptions={[pageSize]}
                        pagination
                        columns={columns}
                        rows={data || []}
                        getRowId={(row) => row.stationid}
                    />
                </div>
            </div>
        </>
    );
}

export default function Maintenence() {
    return <DashboardTemplate component={MaintenenceContent} />
}