import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <h2>Getting Started</h2>
        <ul>
          <li><Link to="#introduction">Introduction</Link></li>
          <li><Link to="#vision-and-mission">Vision and Mission</Link></li>
        </ul>
        <h2>For Users</h2>
        <ul>
          <li><Link to="#ecoblocks-iot">EcoBlocks IoT</Link></li>
          <li><Link to="#ecoblocks-app">EcoBlocks App</Link></li>
          <li><Link to="#ecoblocks-client">EcoBlocks Client</Link></li>
          <li><Link to="#ecoblocks-zksync">EcoBlocks on zkSync Era</Link></li>
          <li><Link to="#ecoblocks-portal">EcoBlocks Portal</Link></li>
          <li><Link to="#ecob-token">ECOB Token</Link></li>
          <li><Link to="#nft-tool">NFT Minting Tool</Link></li>
          <li><Link to="#explorer">EcoBlocks Explorer</Link></li>
          <li><Link to="#participate">Participate</Link></li>
        </ul>
        <h2>For Developers</h2>
        <ul>
          <li><Link to="#indexer">SubQuery Indexer</Link></li>
          <li><Link to="#apis">EcoBlocks APIs</Link></li>
          <li><Link to="#parachain">EcoBlocks Parachain</Link></li>
          <li><Link to="#modules">Parachain Modules</Link></li>
          <li><Link to="#sdk">EcoBlocks SDK</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
