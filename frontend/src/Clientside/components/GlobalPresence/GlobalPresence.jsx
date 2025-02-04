import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    LayersControl,
} from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';

// Component to set bounds and center the map
const SetBoundsComponent = ({ countries }) => {
    const map = useMap();
    
    useEffect(() => {
        if (countries.length > 0) {
            const bounds = L.latLngBounds(
                countries.map(country => country.latlng)
            );
            map.fitBounds(bounds, { padding: [50, 50] });
        } 
    }, [countries, map]);

    return null;
};

const GlobalPresenceClient = () => {
    const mapRef = useRef();
    const [countries, setCountries] = useState([]);
    const [logos, setLogos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Define target countries and their coordinates
    const targetCountries = {
        'Nepal': [28.3949, 84.1240],
        'Bangladesh': [23.6850, 90.3563],
        'Sri Lanka': [7.8731, 80.7718],
        'Tanzania': [-6.3690, 34.8888],
        'Nigeria': [9.0820, 8.6753],
        'UAE': [23.4241, 53.8478]
    };

    // Create custom icon for the marker
    const createCustomIcon = (icon) => {
        return L.divIcon({
            html: ReactDOMServer.renderToString(icon),
            iconSize: [32, 32],
            className: 'custom-icon',
        });
    };

    // Fetch country data from API
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('/api/globalpresence/countries');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    // Fetch logo data from API
    useEffect(() => {
        const fetchLogos = async () => {
            try {
                const response = await axios.get('/api/globalpresence/globalPresenceEntries');
                setLogos(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching logos:', error);
            }
        };
        fetchLogos();
    }, []);

    // Initial center position (roughly center of the target countries)
    const initialCenter = [20.0, 45.0];

    return (
        <div className="bg-gray-50 ">
            <div className="navbar">
                {/* Navbar content goes here */}
            </div>

            <div className="w-full mx-auto p-8">
                <MapContainer
                    style={{ height: "600px", width: "100%" }}
                    center={initialCenter}
                    scrollWheelZoom={false}  // Disable zoom via mouse wheel
                    dragging={true}           // Enable dragging with mouse click
                    zoom={4}
                    touchZoom={false}        // Disable zoom via touch gestures
                    zoomControl={false}      // Optionally disable zoom controls
                    className="mb-5 shadow-lg border border-gray-300 map-container"  // Apply map-container class here
                    ref={mapRef}
                >
                    <LayersControl position="topright">
                        {/* Base Map Layer */}
                        <LayersControl.BaseLayer checked name="Street Map">
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                        </LayersControl.BaseLayer>
                        
                        {/* Satellite Layer */}
                        <LayersControl.BaseLayer name="Satellite">
                            <TileLayer
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            />
                        </LayersControl.BaseLayer>
                    </LayersControl>

                    {logos.map((logo) => {
                        const country = countries.find((c) => c.name === logo.country);
                        return (
                            country && (
                                <Marker
                                    key={logo._id}
                                    position={country.latlng}
                                    icon={createCustomIcon(
                                        <FaMapMarkerAlt 
                                            size={32} 
                                            className="text-red-600 hover:text-red-700"
                                        />
                                    )}
                                >
                                    <Popup 
                                        minWidth={200} 
                                        className="custom-popup"
                                    >
                                        <div className="p-2">
                                            <img
                                                src={`/api/logo/download/${logo.photo}`}
                                                alt={logo.alt}
                                                className="w-32 h-24 object-contain mx-auto mb-2"
                                            />
                                            <h3 className="font-semibold text-lg text-center mb-1">
                                                {logo.country}
                                            </h3>
                                            <p className="text-center text-sm">
                                                {logo.description}
                                            </p>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        );
                    })}
                    
                    <SetBoundsComponent 
                        countries={Object.values(targetCountries).map(coords => ({ latlng: coords }))} 
                    />
                </MapContainer>
            </div>
        </div>
    );
};

export default GlobalPresenceClient;
