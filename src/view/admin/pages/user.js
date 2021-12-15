import React from 'react';
import  { useHistory } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
    const { data } = useSWR('user', fetcher);
    const history = useHistory();

    return (
        <>
            <h1 align="center">Users</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Firstname</TableCell>
                        <TableCell>Lastname</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Payment</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {(data || []).map((row, index) => (
                       <TableRow key={row.userid}>
                           <TableCell>{row.firstname}</TableCell>
                           <TableCell>{row.lastname}</TableCell>
                           <TableCell>{row.email}</TableCell>
                           <TableCell>{row.cityid}</TableCell>
                           <TableCell>{row.payment}</TableCell>
                           <TableCell>{row.balance}</TableCell>
                           <TableCell>
                                <VisibilityIcon cursor="pointer" onClick={() => {
                                    history.push(`/dashboard/user/${index}`);
                                }}/>
                                <DeleteIcon cursor="pointer" onClick={() => {
                                    remove(row.userid);
                                }}/>
                           </TableCell>
                       </TableRow>
                   ))}
                </TableBody>
            </Table>
        </>
    );
}

export default function User() {
    return <DashboardTemplate component={UserContent}/>;
  }