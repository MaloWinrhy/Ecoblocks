import React from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Card from '../components/learn/Card';
import './LearnPage.css';

const LearnPage = () => {
  return (
    <div className="learn-page">
                <Header />

      <div className="main-content">
        <Sidebar />
        <main className="content">
          <h1 id="introduction">Welcome to EcoBlocks Docs</h1>
          <p>This documentation describes the relevant components, modules, and features that constitute the EcoBlocks Network.</p>
          <p>EcoBlocks connects the physical world to Web3 by using smartphones as edge nodes. The edge nodes read devices and sensors in the physical world using Bluetooth Low Energy (BLE) and connect that information to the blockchain. Anyone with a smartphone can join the network and earn ECOB, EcoBlocks’s native token.</p>
          <h2>Getting Started</h2>
          <div className="card-container">
            <Card title="Introduction"></Card>
            <Card title="Vision and Mission"></Card>
          </div>
          <h2>For Users</h2>
          <div className="card-container">
            <Card title="EcoBlocks IoT"></Card>
            <Card title="EcoBlocks App"></Card>
            <Card title="EcoBlocks Client"></Card>
            <Card title="EcoBlocks on zkSync Era"></Card>
            <Card title="EcoBlocks Portal"></Card>
            <Card title="ECOB Token"></Card>
            <Card title="NFT Minting Tool"></Card>
            <Card title="EcoBlocks Explorer"></Card>
            <Card title="Participate"></Card>
          </div>
          <h2>For Developers</h2>
          <div className="card-container">
            <Card title="SubQuery Indexer"></Card>
            <Card title="EcoBlocks APIs"></Card>
            <Card title="EcoBlocks Parachain"></Card>
            <Card title="Parachain Modules"></Card>
            <Card title="EcoBlocks SDK"></Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LearnPage;
