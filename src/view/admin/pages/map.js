import * as React from 'react';
import axios from 'axios';
//import  { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';
/*
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
*/
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, Circle, LayersControl } from 'react-leaflet';
import { DashboardTemplate } from "../Dashboard";

const apiAdr = "http://localhost:1337";
const apiKey = "90301a26-894c-49eb-826d-ae0c2b22a405";

const fetcher = async (id) => {
    const response = await axios.get(`${apiAdr}/v1/city/${id}/bike?apiKey=${apiKey}`, {
        headers: {
            'x-access-token': sessionStorage.getItem('token'),
        }
    });
    const data = response.data.data;
    sessionStorage.setItem("apiMap", JSON.stringify(data));
    return data
}

function MapContent() {
    const id = 2;
    const {data} = useSWR(id, fetcher);
    //const history = useHistory();
    const position = [51.505, -0.09]
    console.log(data);

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

    return (
        <>
          <MapContainer style={{ height: "450px", width: "100%" }} center={position} zoom={13} scrollWheelZoom={true}>
            <LayersControl position="topright">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LayersControl.Overlay name="My Position">
                <Marker position={position}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Stations">
                <LayerGroup>
                  <Circle
                    center={[51.51, -0.08]}
                    pathOptions={{ color: 'green', fillColor: 'green' }}
                    radius={100}
                  />
                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Scooters">
                <LayerGroup>
                  <MarkerClusterGroup>
                    {(data || []).map((row, index) => (
                      <Marker key={row.name} position={[row.gps_lat, row.gps_lon]}>
                        <Popup>
                          <div>{row.name}</div>
                          <div>{row.status}</div>
                          <div>{row.image}</div>
                          <div>{row.description}</div>
                        </Popup>
                      </Marker>
                    ))}
                  </MarkerClusterGroup>
                </LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
        </>
    );
}

export default function Map() {
    return <DashboardTemplate component={MapContent}/>;
  }