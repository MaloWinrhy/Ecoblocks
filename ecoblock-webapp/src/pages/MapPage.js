import React from "react";
import MapChart from "../components/MapChart";
import './MapPage.css';

const MapPage = () => {
  return (
    <div className="map-page">
      <div className="main-content">
        <main className="content">
          <h1>Map Page</h1>
          <div className="map-container">
            <MapChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MapPage;
