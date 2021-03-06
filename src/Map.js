import React from 'react';
import "./Map.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { showDataOnMap } from './util';



export default function Map({center, zoom, countries, casesType}) {
    console.log("final casesType>>",casesType);
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }




    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} >
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
                />
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}
