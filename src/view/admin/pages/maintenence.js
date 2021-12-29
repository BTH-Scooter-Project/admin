import React, { useEffect, useState } from "react";
import { DashboardTemplate } from "../Dashboard";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import NativeSelect from '@mui/material/NativeSelect';
import useSWR from "swr";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import WarningIcon from '@mui/icons-material/Warning';
import { useHistory } from "react-router-dom";

const turnOff = (bike) => {
    let result = window.confirm("Want to turn off the bike?");
    if (result) {
        axios.put(`http://localhost:1337/v1/bike/${bike.id}?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`, {
                gps_lat: bike.gps_lat,
                gps_lon: bike.gps_lon,
                stationid: bike.stationid
            }, {
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
            }
        });
    }
}

function MaintenenceContent() { 
    const [id, setId] = useState(-1);
    const [city, setCity] = useState([]);
    const history = useHistory();

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
            field: 'Actions',
            renderCell: (cellValues) => {
                return (
                  <>
                      <CompareArrowsIcon cursor="pointer" style={{color: 'blue'}} onClick={() => {
                          history.push(`/dashboard/maintenence/move/${cellValues.row.bikeid}`);
                      }}/>
                        {cellValues.row.status === "service" ? 
                        <WarningIcon style={{color: 'red'}} onClick={() => turnOff(cellValues.row)}/> 
                        : <WarningIcon style={{color: 'grey'}} onClick={() => turnOff(cellValues.row)}/>}
                      
                  </>
                );
              }
            },
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