import React from 'react';
import "./Map.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";



export default function Map({center, zoom}) {
    
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
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
            </MapContainer>
        </div>
    )
}
