import React, { useEffect, useState } from "react";
import { DashboardTemplate } from "../Dashboard";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import NativeSelect from '@mui/material/NativeSelect';
import useSWR from "swr";
 
function MaintenenceContent() { 
    const [id, setId] = useState(2);
    const [city, setCity] = useState([]);

    const bikes = (id) => axios.get(`http://localhost:1337/v1/city/${id}/bike?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`
    ).then((response) => response.data.data);

    const cities = () => axios.get(`http://localhost:1337/v1/city/?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`
    ).then((response) => setCity(response.data.data));

    const { data } = useSWR(id, bikes);

    useEffect(()=> {
        cities();
    },[])

    const pageSize = 15;
    const columns = [
        { field: 'bikeid', headerName: 'BikeID', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
        },
        {
          field: 'description',
          headerName: 'Description',
          width: 150,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
          },
          {
            field: 'battery_level',
            headerName: 'Battery (current)',
            width: 150,
          },
          {
            field: 'gps_lat',
            headerName: 'GPS (lat)',
            width: 150,
          },
          {
            field: 'gps_lon',
            headerName: 'GPS (lon)',
            width: 150,
          },
          {
            field: 'Actions'
          }

      ];

    return (
        <>
            <h1 align="center">Maintenence</h1>
            <NativeSelect onChange={(e) => setId(e.target.value)}>
                       {(city || []).map((row) => (
                           <option key={row.cityid} value={row.cityid}>{row.name}</option>
                       ))}
            </NativeSelect>
            <div style={{ display: 'flex', minHeight: 900 }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        disableSelectionOnClick
                        pageSize={pageSize}
                        rowsPerPageOptions={[pageSize]}
                        pagination
                        columns={columns}
                        rows={data || []}
                        getRowId={(row) => row.bikeid}
                    />
                </div>
            </div>
        </>
    );
}

export default function Maintenence() {
    return <DashboardTemplate component={MaintenenceContent} />
}