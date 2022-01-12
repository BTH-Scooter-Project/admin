import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DashboardTemplate } from "../Dashboard";
import { useParams } from 'react-router';
import { scooter } from '../../../test/mochApi';

export function ScooterContent({test = false, noData = false}) {
    const { id } = useParams();
    let data;

    if (!test) {
      data = JSON.parse(sessionStorage.getItem('apiStation'))[id].bikes;
    } else if (test && !noData) {
      data = scooter().data;
    } else {
      data = [];
    }

    const pageSize = 15;
    const columns = [
        { field: 'bikeid', headerName: 'BikeID', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 235,
        },
        {
          field: 'description',
          headerName: 'Description',
          width: 235,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 235,
          },
          {
            field: 'battery_level',
            headerName: 'Battery (current)',
            width: 235,
          },
          {
            field: 'gps_lat',
            headerName: 'GPS (lat)',
            width: 235,
          },
          {
            field: 'gps_lon',
            headerName: 'GPS (lon)',
            width: 235,
          },
      ];

    return (
        <>
            <h1 align="center">Scooters in {data.address}</h1>
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
                        columnBuffer={7}
                    />
                </div>
            </div>
        </>
    );
}

export default function Scooter() {
    return <DashboardTemplate component={ScooterContent}/>;
  }