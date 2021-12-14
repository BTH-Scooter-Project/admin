import React from 'react';
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
    const response = await axios.get('http://localhost:1337/v1/city?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405', {
        headers: {
            'x-access-token': sessionStorage.getItem('token'),
        }
    });
    return response.data.data;
}

function ScooterContent() {
    const { data } = useSWR('scooter', fetcher);

    return (
        <>
            <h1 align="center">Scooters</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>CityID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {(data || []).map((row) => (
                       <TableRow key={row.cityid}>
                            <TableCell>{row.cityid}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                               <a href="/"><VisibilityIcon /></a>
                               <a href="/"><DeleteIcon /></a>
                           </TableCell>
                       </TableRow>
                   ))}
                </TableBody>
            </Table>
        </>
    );
}

export default function Scooter() {
    return <DashboardTemplate component={ScooterContent}/>;
  }