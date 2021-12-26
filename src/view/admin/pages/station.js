import React from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import useSWR from 'swr';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DashboardTemplate } from "../Dashboard";
import { useParams } from 'react-router';

const fetcher = (id) => axios.get(`http://localhost:1337/v1/city/${id}?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`, {
    headers: {
        'x-access-token': sessionStorage.getItem('token'),
    }
}).then((response) => response.data.data);
    
function StationContent() {
    const history = useHistory();
    const id = useParams();
    const { data } = useSWR(id.id, fetcher);
    console.log(data);

    return (
        <>
            <h1 align="center">Stations</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>StationID</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Scooters</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {(data || []).map((row, index) => (
                       <TableRow key={row.stationid}>
                            <TableCell>{row.stationid}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.bikes[0] == null ? 0 : row.bikes.length}</TableCell>
                            <TableCell>
                                <VisibilityIcon cursor="pointer" onClick={() => {
                                            history.push(`/dashboard/scooter/city/${id.id}/station/${index}`);
                                            sessionStorage.setItem("apiStation", JSON.stringify(data));
                                        }}/>
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