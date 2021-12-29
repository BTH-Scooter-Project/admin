import React, { useEffect, useState } from "react";
import { DashboardTemplate } from "../Dashboard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NativeSelect } from "@mui/material";

function MoveContent() {
    const { id } = useParams();
    const [bike, setBike] = useState([]);



    const bikeFetcher = () => axios.get(`http://localhost:1337/v1/bike/${id}?apiKey=90301a26-894c-49eb-826d-ae0c2b22a405`
        ).then((response) => setBike(response.data.data));
        



    useEffect(() => {
        bikeFetcher();
        
    },[]);

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
            <div>
                <p><b>Station ID</b> {bike.stationid}</p>
                <NativeSelect>
                    <option>Hello World!</option>
                </NativeSelect>
            </div>
        </>
    );
}

export default function Move() {
    return <DashboardTemplate component={MoveContent} />
}