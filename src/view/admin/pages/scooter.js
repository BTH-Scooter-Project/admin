import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DashboardTemplate } from "../Dashboard";
import { useParams } from 'react-router';

function ScooterContent() {
    const id = useParams();
    const data = JSON.parse(sessionStorage.getItem('apiStation'))[id.id];
    console.log(data.bikes);

    return (
        <>
            <h1 align="center">Scooters in {data.address}</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>BikeID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Battery</TableCell>
                        <TableCell>GPS (lat)</TableCell>
                        <TableCell>GPS (lon)</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {(data.bikes || []).map((row) => {
                            if (data.bikes[0] !== null) {
                                return (
                                <TableRow key={row.bikeid}>
                                    <TableCell>{row.bikeid}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.battery_level}</TableCell>
                                    <TableCell>{row.gps_lat}</TableCell>
                                    <TableCell>{row.gps_lon}</TableCell>
                                </TableRow>
                                )
                            }
                        })}
                    </TableBody>
            </Table>
        </>
    );
}

export default function Scooter() {
    return <DashboardTemplate component={ScooterContent}/>;
  }