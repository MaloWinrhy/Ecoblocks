import React from "react";
import MapChart from "../components/MapChart";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import './MapPage.css';

const MapPage = () => {
  return (
    <div className="map-page">
      <Header />
      <div className="main-content">
        <main className="content">
          <h1>Map Page</h1>
          <div className="map-container">
            <MapChart />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;
