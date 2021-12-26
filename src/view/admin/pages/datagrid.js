import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = async () => {
    const response = await axios.get('http://localhost:1337/v1/auth/customer?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405', {
        headers: {
            'x-access-token': sessionStorage.getItem('token'),
        }
    });
    const data = response.data.data;
    sessionStorage.setItem('apiCustomer', JSON.stringify(data));
    return data;
}

const columns = [
    { field: 'userid', headerName: 'UserID', width: 90 },
    {
      field: 'firstname',
      headerName: 'Firstname',
      width: 150,
    },
    {
      field: 'lastname',
      headerName: 'Lastname',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 110,
    },
    {
        field: 'cityid',
        headerName: 'City',
        width: 150,
    },
    {
        field: 'payment',
        headerName: 'Payment',
        width: 150,
    },
    {
        field: 'balance',
        headerName: 'Balance',
        width: 150,
    },
  ];

export default function PageSizeCustomOptions() {
    const { data } = useSWR('user', fetcher);
    const pageSize = 20;

  return (
    <>
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        pagination
        columns={columns}
        rows={data || []}
        getRowId={(row) => row.userid}
      />
    </div>
    </>
  );
}