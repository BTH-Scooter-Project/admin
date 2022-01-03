import React, { useEffect, useState } from "react";
import  { useHistory } from 'react-router-dom';
import { DashboardTemplate } from "../Dashboard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, NativeSelect } from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

function MoveContent() {
    const bikeid = useParams().bikeid;
    const cityid = useParams().cityid;
    const [bike, setBike] = useState([]);
    const [station, setStation] = useState([]);
    const [stationId, setStationId] = useState(-1);
    const history = useHistory();

    const bikeFetcher = async (id) => axios.get(`http://localhost:1337/v1/bike/${id}?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`
        ).then((response) => setBike(response.data.data));
    const stationFetcher = async (id) => axios.get(`http://localhost:1337/v1/city/${id}/station?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`
        ).then((response) => setStation(response.data.data));

    useEffect(() => {
        bikeFetcher(bikeid);
        stationFetcher(cityid);
        // eslint-disable-next-line
    },[stationId]);


    const move = () => {
        axios.put(`http://localhost:1337/v1/bike/${bike.bikeid}?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`, {
            gps_lat: bike.gps_lat,
            gps_lon: bike.gps_lon,
            stationid: stationId,
            status: bike.status
            }, {
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
            }
        });
        history.push("/dashboard/maintenence");
    }

    return(
        <>
            <h1 align="center">Move a bike</h1>
            <p><b>BikeID:</b> {bike.bikeid}</p>
            <p><b>City:</b> {bike.name}</p>
            <p><b>Description:</b> {bike.description}</p>
            <p><b>Max Speed:</b> {bike.max_speed}</p>
            <p><b>Battery Level:</b> {bike.battery_level}</p>
            <p><b>GPS (lat):</b> {bike.gps_lat}</p>
            <p><b>GPS (lon):</b> {bike.gps_lon}</p>
            <div style={{ margin: 'auto' }}>
                <p style={{fontSize: '30px', display: 'inline-block'}}><b>Station ID</b> {bike.stationid}</p>
                <SwapHorizIcon style={{fontSize: '30px' }}/>
                <NativeSelect style={{fontSize: '30px'}} onChange={(e) => setStationId(e.target.value)}>
                    {(station || []).map((row) => {
                        if (row.stationid !== bike.stationid) {
                            return <option key={row.stationid} value={row.stationid}>{row.stationid}</option>
                        }
                        return null;
                    })}
                </NativeSelect>
                <Button variant="contained" style={{display: 'block', backgroundColor: 'red', fontSize: '30px', margin: 'auto'}}
                onClick={move}>MOVE</Button>
            </div>
        </>
    );
}

export default function Move() {
    return <DashboardTemplate component={MoveContent} />
}