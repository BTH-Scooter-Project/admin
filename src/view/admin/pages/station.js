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
import { useParams } from 'react-router';

const fetcher = async (url) => {
    const response = await axios.get(url, {
        headers: {
            'x-access-token': sessionStorage.getItem('token'),
        }
    });
    const data = response.data;
    return data;
}

function StationContent() {
    const id = useParams();
    const url = `http://localhost:1337/v1/city/${id}/station?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`;

    const { data } = useSWR('station', fetcher(url));
    console.log(data);

    return (
        <>
            <h1 align="center">Stations</h1>
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

export default function Station() {
    return <DashboardTemplate component={StationContent}/>;
  }