import React, { useState } from 'react';
import Stats from '../components/dashboard/Stats';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import ChartContainer from '../components/dashboard/ChartContainer';
import DataTable from '../components/dashboard/Datatable';
import { processData, blockchainData } from '../services/blockDataServices';
import LocationSearch from '../components/dashboard/LocationSearch';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './DashboardPage.css';
import markerIcon from '../assets/logo.svg';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const { totalBlocks, averageData, blocks } = processData(blockchainData);

const DashboardPage = () => {
  const [coordinates, setCoordinates] = useState(null);

  const filterDataByDistance = (data, center, radius) => {
    if (!center) return data;
    const filteredData = data.filter((block) => {
      const distance = getDistanceFromLatLonInKm(center.lat, center.lng, block.data.location.latitude, block.data.location.longitude);
      return distance <= radius;
    });
    return filteredData;
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const filteredBlocks = filterDataByDistance(blocks, coordinates, 50); // Exemple de rayon de 50 km

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41], // Taille du marqueur
    iconAnchor: [12, 41], // Point d'ancrage du marqueur
    popupAnchor: [1, -34], // Point d'ancrage de la popup
    shadowSize: [41, 41] // Taille de l'ombre
  });

  return (
    <div className="dashboard-page">
      <div className="main-content-dashboard">
        <main className="content-dashboard">
          <h1>Dashboard</h1>
          <LocationSearch setCoordinates={setCoordinates} />
          <DataTable blocks={filteredBlocks} />
          {coordinates && (
            <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={10} style={{ height: '400px', width: '100%' }}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              {filteredBlocks.map((block, index) => (
                <Marker key={index} position={[block.data.location.latitude, block.data.location.longitude]} icon={customIcon}>
                  <Popup>
                    {JSON.stringify(block.data.environment, null, 2)}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
          <Stats totalBlocks={totalBlocks} />
          <ChartContainer averageData={averageData} />
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
