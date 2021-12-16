import React from 'react';
import axios from 'axios';
import  { useHistory } from 'react-router-dom';
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
    const data = response.data.data;
    sessionStorage.setItem("apiCity", JSON.stringify(data));
    return data
}

function CityContent() {
    const { data } = useSWR('scooter', fetcher);
    const history = useHistory();

    return (
        <>
            <h1 align="center">Cities</h1>
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
                                <VisibilityIcon cursor="pointer" onClick={() => {
                                        history.push(`/dashboard/scooter/city/${row.cityid}`);
                                    }}/>
                           </TableCell>
                       </TableRow>
                   ))}
                </TableBody>
            </Table>
        </>
    );
}

export default function City() {
    return <DashboardTemplate component={CityContent}/>;
  }