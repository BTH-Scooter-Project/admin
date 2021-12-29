import * as React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, Circle, LayersControl } from 'react-leaflet';
import { DashboardTemplate } from "../Dashboard";

const apiAdr = "http://localhost:1337";
const apiKey = "90301a26-894c-49eb-826d-ae0c2b22a405";


const fetcher = async (id) => {
    return axios.all([
        axios.get(`${apiAdr}/v1/city/${id}/bike?apiKey=${apiKey}`, {
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
            }
        }),
        axios.get(`${apiAdr}/v1/city/${id}/station?apiKey=${apiKey}`, {
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
            }
        })
    ])
    .then(axios.spread((bikes, stations) => {
        var stationz = [];
        var bikez = [];
        var repairz = [];

        stations.data.data.map((station) => {
            if(station.gps_lat === undefined || station.gps_lon === undefined ) {
                console.log(station);
            } else {
                stationz.push(station);
            }
            return "working.."
        })
        bikes.data.data.map((bike) => {
            if(bike.gps_lat === null || bike.gps_lon === null) {
                repairz.push(bike);
            } else {
                bikez.push(bike);
            }
            return "working.."
        })
        return [bikez, stationz, repairz]
    }));

}


function MapContent() {
    const id = 2;
    const {data} = useSWR(id, fetcher);
    console.log({data});
    const position = [
      [62.390839, 17.306919],
      [59.329323, 18.068581],
      [56.161823, 15.586825]
    ];

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

    return (
        <>
          <h1 align="center">Map</h1>
          <MapContainer style={{ height: '750px', width: "100%" }} center={position[id - 1]} zoom={13} scrollWheelZoom={true}>
            <LayersControl position="topright">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LayersControl.Overlay name="My Position">
                <Marker position={position[id - 1]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Stations">
                <LayerGroup>
                  <MarkerClusterGroup>
                  {(data || []).map((f, i) => {
                      if(i === 1) {
                        return f.map((station) => (
                          <Circle key={station.stationid} center={[station.gps_lat, station.gps_lon]} radius={200}>
                            <Popup>
                              <div>{station.address}</div>
                              <div>{station.type}</div>
                            </Popup>
                          </Circle>
                        ))
                      }
                      return "working?";
                  })}
                  </MarkerClusterGroup>
                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Scooters">
                <LayerGroup>
                  <MarkerClusterGroup>
                    {(data || []).map((f, i) => {
                        if(i === 0) {
                          return f.map((row) => (
                            <Marker key={row.name} position={[row.gps_lat, row.gps_lon]}>
                              <Popup>
                                <div>{row.name}</div>
                                <div>{row.status}</div>
                                <div>{row.image}</div>
                                <div>{row.description}</div>
                              </Popup>
                            </Marker>
                          ))
                        }
                        return "working?";
                    })}
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