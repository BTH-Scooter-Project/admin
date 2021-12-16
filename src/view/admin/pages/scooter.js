import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DashboardTemplate } from "../Dashboard";

const fetcher = async () => {
    const response = await axios.get('http://localhost:1337/v1/city?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405', {
        headers: {
            'x-access-token': sessionStorage.getItem('token'),
        }
    });
    console.log(response);
    return response.data.data;
}

function ScooterContent() {
    const { data } = useSWR('scooter', fetcher);

    return (
        <>
            <h1 align="center">Scooters in {sessionStorage.getItem("apiStation")}</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Battery</TableCell>
                        <TableCell>GPS (lat)</TableCell>
                        <TableCell>GPS (lon)</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </>
    );
}

export default function Scooter() {
    return <DashboardTemplate component={ScooterContent}/>;
  }