import React from 'react';
import  { useHistory } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { DashboardTemplate } from "../Dashboard";

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

function UserContent() {
    const history = useHistory();
    const columns = [
        { field: 'userid', headerName: 'UserID', width: 90 },
        {
          field: 'firstname',
          headerName: 'Firstname',
          width: 200,
        },
        {
          field: 'lastname',
          headerName: 'Lastname',
          width: 200,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
        },
        {
            field: 'cityid',
            headerName: 'City',
            width: 200,
        },
        {
            field: 'payment',
            headerName: 'Payment',
            width: 200,
        },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 200,
        },
        {
            field: "Actions",
            renderCell: (cellValues) => {
              return (
                <>
                    <VisibilityIcon cursor="pointer" onClick={() => {
                        history.push(`/dashboard/user/${data.indexOf(cellValues.row)}`)
                    }}/>
                    <DeleteIcon cursor="pointer" onClick={() => {
                        remove(cellValues.row.userid);
                    }}/>
                </>
              );
            }
          },
      ];
    const { data } = useSWR('user', fetcher);
    const pageSize = 15;

    return (
        <>
            <h1 align="center">Users</h1>
                
                <div style={{ display: 'flex', minHeight: 900 }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        disableSelectionOnClick
                        pageSize={pageSize}
                        rowsPerPageOptions={[pageSize]}
                        pagination
                        columns={columns}
                        rows={data || []}
                        getRowId={(row) => row.userid}
                    />
                </div>
                </div>
        </>
    );
}

export default function User() {
    return <DashboardTemplate component={UserContent}/>;
  }