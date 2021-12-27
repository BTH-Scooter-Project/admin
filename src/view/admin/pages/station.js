import React from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import useSWR from 'swr';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DashboardTemplate } from "../Dashboard";
import { useParams } from 'react-router';

const fetcher = (id) => axios.get(`http://localhost:1337/v1/city/${id}?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`, {
    headers: {
        'x-access-token': sessionStorage.getItem('token'),
    }
}).then((response) => response.data.data);
    
function StationContent() {
    const history = useHistory();
    const columns = [
        { field: 'stationid', headerName: 'StationID', width: 90 },
        {
          field: 'address',
          headerName: 'Address',
          width: 350,
        },
        {
          field: 'type',
          headerName: 'Type',
          width: 350,
        },
        {
            field: 'Scooters',
            width: 350,
            renderCell: (cellValues) => {
                return (
                  <>
                      <p>{cellValues.row.bikes[0] == null ? 0 : cellValues.row.bikes.length}</p>
                  </>
                );
              }
        },
        {
            field: "Action",
            width: 350,
            renderCell: (cellValues) => {
              return (
                <>
                    <VisibilityIcon cursor="pointer" onClick={() => {
                        history.push(`/dashboard/scooter/city/${id.id}/station/${data.indexOf(cellValues.row)}`);
                        sessionStorage.setItem("apiStation", JSON.stringify(data));
                    }}/>
                </>
              );
            }
          },
      ];
    const id = useParams();
    const { data } = useSWR(id.id, fetcher);
    const pageSize = 15;

    return (
        <>
            <h1 align="center">Stations</h1>
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

export default function Station() {
    return <DashboardTemplate component={StationContent}/>;
  }