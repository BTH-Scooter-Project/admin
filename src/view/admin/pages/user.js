import React from 'react';
import Axios from 'axios';
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
    const response = await fetch('http://localhost:1337/v1/user?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405');
    const data = await response.json();
    return data.data;
}

function UserContent() {
    const { data } = useSWR('user', fetcher);

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
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {(data || []).map((row) => (
                       <TableRow key={row.userid}>
                           <TableCell>{row.firstname}</TableCell>
                           <TableCell>{row.lastname}</TableCell>
                           <TableCell>{row.email}</TableCell>
                           <TableCell>{row.cityid}</TableCell>
                           <TableCell>{row.payment}</TableCell>
                           <TableCell>
                               <VisibilityIcon />
                               <DeleteIcon />
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