import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
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

          <h2 id="vision-and-mission">Getting Started</h2>
          <p>In this section, you will find the basic information to help you get started with the EcoBlocks platform. Our goal is to make sure you have everything you need to begin participating in the EcoBlocks network effectively and efficiently.</p>
          <div className="card-container">
            <Card title="Introduction" id="introduction-card">
              <p>Discover what EcoBlocks is, our mission, and the value we bring to the ecosystem.</p>
            </Card>
            <Card title="Vision and Mission" id="vision-and-mission-card">
              <p>Learn about the vision and mission of EcoBlocks and how we aim to revolutionize environmental data collection and analysis using blockchain and IoT technologies.</p>
            </Card>
          </div>

          <h2 id="for-users">For Users</h2>
          <p>EcoBlocks offers various tools and applications designed for users to interact with the platform. Below are the main components available for users:</p>
          <div className="card-container">
            <Card title="EcoBlocks IoT" id="ecoblocks-iot">
              <p>Understand how to use EcoBlocks IoT devices to collect environmental data.</p>
            </Card>
            <Card title="EcoBlocks App" id="ecoblocks-app">
              <p>Get started with the EcoBlocks mobile app, designed to help you connect and manage your IoT devices.</p>
            </Card>
            <Card title="EcoBlocks Client" id="ecoblocks-client">
              <p>Learn about the EcoBlocks client software and how it integrates with the network.</p>
            </Card>
            <Card title="EcoBlocks on zkSync Era" id="ecoblocks-zksync">
              <p>Explore how EcoBlocks leverages zkSync for scalable and efficient blockchain transactions.</p>
            </Card>
            <Card title="EcoBlocks Portal" id="ecoblocks-portal">
              <p>Access the EcoBlocks portal to manage your devices, data, and settings.</p>
            </Card>
            <Card title="ECOB Token" id="ecob-token">
              <p>Get information on ECOB tokens, their use, and how you can earn them by participating in the network.</p>
            </Card>
            <Card title="NFT Minting Tool" id="nft-tool">
              <p>Learn how to use the EcoBlocks NFT minting tool to create and manage your digital assets.</p>
            </Card>
            <Card title="EcoBlocks Explorer" id="explorer">
              <p>Use the EcoBlocks explorer to view blockchain transactions and data related to the EcoBlocks network.</p>
            </Card>
            <Card title="Participate" id="participate">
              <p>Find out how you can contribute to the EcoBlocks community and earn rewards.</p>
            </Card>
          </div>

          <h2 id="for-developers">For Developers</h2>
          <p>If you are a developer looking to integrate with EcoBlocks or build on top of our platform, this section provides all the technical details you need:</p>
          <div className="card-container">
            <Card title="SubQuery Indexer" id="indexer">
              <p>Learn about SubQuery Indexer and how it helps to index and query blockchain data efficiently.</p>
            </Card>
            <Card title="EcoBlocks APIs" id="apis">
              <p>Get detailed documentation on the EcoBlocks APIs to integrate with our platform.</p>
            </Card>
            <Card title="EcoBlocks Parachain" id="parachain">
              <p>Understand how the EcoBlocks Parachain operates and how you can interact with it.</p>
            </Card>
            <Card title="Parachain Modules" id="modules">
              <p>Explore the different modules available within the EcoBlocks Parachain and their functionalities.</p>
            </Card>
            <Card title="EcoBlocks SDK" id="sdk">
              <p>Access the EcoBlocks SDK to build custom applications and services on top of our platform.</p>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default LearnPage;
