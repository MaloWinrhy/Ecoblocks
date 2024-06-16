// src/pages/LearnPage.js

import React from 'react';
import './LearnPage.css';

const LearnPage = () => {
  return (
    <div className="learn-page">
      <div className="main-content">
        <aside className="sidebar">
          <nav>
            <h2>Getting Started</h2>
            <ul>
              <li><a href="#introduction">Introduction</a></li>
              <li><a href="#vision-and-mission">Vision and Mission</a></li>
            </ul>
            <h2>For Users</h2>
            <ul>
              <li><a href="#ecoblocks-iot">EcoBlocks IoT</a></li>
              <li><a href="#ecoblocks-app">EcoBlocks App</a></li>
              <li><a href="#ecoblocks-client">EcoBlocks Client</a></li>
              <li><a href="#ecoblocks-zksync">EcoBlocks on zkSync Era</a></li>
              <li><a href="#ecoblocks-portal">EcoBlocks Portal</a></li>
              <li><a href="#ecob-token">ECOB Token</a></li>
              <li><a href="#nft-tool">NFT Minting Tool</a></li>
              <li><a href="#explorer">EcoBlocks Explorer</a></li>
              <li><a href="#participate">Participate</a></li>
            </ul>
            <h2>For Developers</h2>
            <ul>
              <li><a href="#indexer">SubQuery Indexer</a></li>
              <li><a href="#apis">EcoBlocks APIs</a></li>
              <li><a href="#parachain">EcoBlocks Parachain</a></li>
              <li><a href="#modules">Parachain Modules</a></li>
              <li><a href="#sdk">EcoBlocks SDK</a></li>
            </ul>
          </nav>
        </aside>
        <main className="content">
          <h1 id="introduction">Welcome to EcoBlocks Docs</h1>
          <p>This documentation describes the relevant components, modules, and features that constitute the EcoBlocks Network.</p>
          <p>EcoBlocks connects the physical world to Web3 by using smartphones as edge nodes. The edge nodes read devices and sensors in the physical world using Bluetooth Low Energy (BLE) and connect that information to the blockchain. Anyone with a smartphone can join the network and earn ECOB, EcoBlocks’s native token.</p>
          <h2>Getting Started</h2>
          <div className="card-container">
            <div className="card">
              <h3 id="introduction">Introduction</h3>
            </div>
            <div className="card">
              <h3 id="vision-and-mission">Vision and Mission</h3>
            </div>
          </div>
          <h2>For Users</h2>
          <div className="card-container">
            <div className="card">
              <h3 id="ecoblocks-iot">EcoBlocks IoT</h3>
            </div>
            <div className="card">
              <h3 id="ecoblocks-app">EcoBlocks App</h3>
            </div>
            <div className="card">
              <h3 id="ecoblocks-client">EcoBlocks Client</h3>
            </div>
            <div className="card">
              <h3 id="ecoblocks-zksync">EcoBlocks on zkSync Era</h3>
            </div>
            <div className="card">
              <h3 id="ecoblocks-portal">EcoBlocks Portal</h3>
            </div>
            <div className="card">
              <h3 id="ecob-token">ECOB Token</h3>
            </div>
            <div className="card">
              <h3 id="nft-tool">NFT Minting Tool</h3>
            </div>
            <div className="card">
              <h3 id="explorer">EcoBlocks Explorer</h3>
            </div>
            <div className="card">
              <h3 id="participate">Participate</h3>
            </div>
          </div>
          <h2>For Developers</h2>
          <div className="card-container">
            <div className="card">
              <h3 id="indexer">SubQuery Indexer</h3>
            </div>
            <div className="card">
              <h3 id="apis">EcoBlocks APIs</h3>
            </div>
            <div className="card">
              <h3 id="parachain">EcoBlocks Parachain</h3>
            </div>
            <div className="card">
              <h3 id="modules">Parachain Modules</h3>
            </div>
            <div className="card">
              <h3 id="sdk">EcoBlocks SDK</h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearnPage;
