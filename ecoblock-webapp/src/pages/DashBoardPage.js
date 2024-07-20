import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../assets/plant.json';
import Stats from '../components/dashboard/Stats';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import ChartContainer from '../components/dashboard/ChartContainer';
import DataTable from '../components/dashboard/Datatable';
import { processData, blockchainData } from '../services/blockDataServices';
import LocationSearch from '../components/dashboard/LocationSearch';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './DashboardPage.css';
import BlockList from '../components/dashboard/BlockList';
import markerIcon from '../assets/logo.svg';
import { getAddressFromCoordinates } from '../utils/geoCodeUtils';

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
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [blocksWithAddress, setBlocksWithAddress] = useState([]);
  const [searchRadius, setSearchRadius] = useState(50); // Default search radius in km
  const [loading, setLoading] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      const updatedBlocks = await Promise.all(filteredBlocks.map(async (block) => {
        const address = await getAddressFromCoordinates(block.data.location.latitude, block.data.location.longitude);
        return { ...block, address };
      }));
      setBlocksWithAddress(updatedBlocks);
      setLoading(false);
    };

    if (coordinates) {
      fetchAddresses();
    }
  }, [coordinates, searchRadius]);

  useEffect(() => {
    if (coordinates && mapRef.current) {
      mapRef.current.setView([coordinates.lat, coordinates.lng], 10);
    }
  }, [coordinates]);

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

  const filteredBlocks = filterDataByDistance(blocks, coordinates, searchRadius);

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const handleRadiusChange = (e) => {
    setSearchRadius(e.target.value);
  };

  const selectedBlockData = selectedBlocks.map(hash => blocksWithAddress.find(block => block.hash === hash));

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="dashboard-page">
      {loading && (
        <div className="loading-overlay">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
      <div className={`main-content-dashboard ${loading ? 'blurred' : ''}`}>
        <main className="content-dashboard">
          <h1>Dashboard</h1>
          <LocationSearch setCoordinates={setCoordinates} />
          <div className="filter-form">
            <label>
              Search Radius (km):
              <input type="number" value={searchRadius} onChange={handleRadiusChange} />
            </label>
          </div>
          <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }} ref={mapRef}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {coordinates && (
              <Circle
                center={[coordinates.lat, coordinates.lng]}
                radius={searchRadius * 1000}
                color="green"
              />
            )}
            {filteredBlocks.map((block, index) => (
              <Marker key={index} position={[block.data.location.latitude, block.data.location.longitude]} icon={customIcon}>
                <Popup>
                  {JSON.stringify(block.data.environment, null, 2)}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          {coordinates && (
            <BlockList blocks={blocksWithAddress} selectedBlocks={selectedBlocks} setSelectedBlocks={setSelectedBlocks} />
          )}
          {selectedBlocks.length > 0 && (
            <>
              <DataTable blocks={selectedBlockData} />
              <Stats totalBlocks={totalBlocks} />
              <ChartContainer averageData={averageData} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
