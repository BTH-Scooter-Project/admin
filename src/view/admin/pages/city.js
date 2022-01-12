import React, { useState } from 'react';
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
import { city } from '../../../test/mochApi';

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

export function CityContent({test = false}) {
    const history = useHistory();
    const [redirect, setRedirect] = useState(null);
    let { data } = useSWR('scooter', fetcher);

    if (test) {
        data = city().data;
    }

    return (
        <>
            <span>{redirect}</span>
            <h1 align="center">Cities</h1>
            <Table>
                <TableHead>
                    <TableRow data-testid="thead">
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
                                    if (!test) {
                                        history.push(`/dashboard/scooter/city/${row.cityid}`);
                                    } else {
                                        setRedirect("Redirecting...");
                                    }
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