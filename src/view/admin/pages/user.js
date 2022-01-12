import React, { useState } from 'react';
import  { useHistory } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { DashboardTemplate } from "../Dashboard";
import { customer } from "../../../test/mochApi";
import { removeCustomer } from '../../../test/mochApi';

const fetcher = async () => {
    const response = await axios.get('http://localhost:1337/v1/auth/customer?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405', {
        headers: {
            'x-access-token': sessionStorage.getItem('token'),
        }
    });
    const data = response.data.data
    sessionStorage.setItem('apiCustomer', JSON.stringify(data));
    return data;
}

const remove = (id) => {
    let result = window.confirm("Want to delete customer?");
    if (result) {
        axios.delete(`http://localhost:1337/v1/auth/customer/${id}?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`, {
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
            }
        });
        window.location.reload();
    }
}



export function UserContent({test = false, noData = false}) {
    const history = useHistory();
    const [deleteStatus, setDeleteStatus] = useState(null);
    const [detailStatus, setDetailStats] = useState(null);

    const mockRemove = (id) => {
        let newData = removeCustomer(id);
        if (newData.length < data.length) {
           setDeleteStatus("Removed user");
        }
    }

    const mockDetail = () => {
        setDetailStats("Details of user");
    }

    const columns = [
        { field: 'userid', headerName: 'UserID', width: 90 },
        {
          field: 'firstname',
          headerName: 'Firstname',
          width: 220,
        },
        {
          field: 'lastname',
          headerName: 'Lastname',
          width: 220,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 220,
        },
        {
            field: 'cityid',
            headerName: 'City',
            width: 220,
        },
        {
            field: 'payment',
            headerName: 'Payment',
            width: 220,
        },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 220,
        },
        {
            field: "Actions",
            renderCell: (cellValues) => {
              return (
                <>
                    <VisibilityIcon cursor="pointer" onClick={() => {
                        if (test) {
                            mockDetail();
                        } else {
                            history.push(`/dashboard/user/${data.indexOf(cellValues.row)}`);
                        }
                        
                    }}/>
                    <DeleteIcon cursor="pointer" onClick={() => {
                        if (test) {
                            mockRemove(cellValues.row.userid);
                        } else {
                            remove(cellValues.row.userid);
                        }
                    }}/>
                </>
              );
            }
          },
      ];
    let { data } = useSWR('user', fetcher);

    if (test && !noData) {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5zZSIsImlkIjoxLCJpYXQiOjE2NDE4NDc4ODYsImV4cCI6MTY0MTg1MTQ4Nn0.f81pLrv0HddpfOdGwSRFyPFf4Ln5b0vnrX7Ev_ODuck";
        data = customer(token).data;
    } else if (test && noData) {
        data = [];
    }

    const pageSize = 15;

    return (
        <>
            <h1 align="center">Users</h1>
            <span>{deleteStatus}{detailStatus}</span>
            <div style={{ display: 'flex', minHeight: 900 }}>
                <div style={{ flexGrow: 1 }} data-testid="hello">
                    <DataGrid
                        disableSelectionOnClick
                        pageSize={pageSize}
                        rowsPerPageOptions={[pageSize]}
                        pagination
                        columns={columns}
                        rows={data || []}
                        getRowId={(row) => row.userid}
                        columnBuffer={8}
                    />
                </div>
            </div>
        </>
    );
}

export default function User() {
    return <DashboardTemplate component={UserContent}/>;
  }