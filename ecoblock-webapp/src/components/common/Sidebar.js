import React from 'react';
import './Sidebar.css';
import { Link as ScrollLink } from 'react-scroll';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <h2>Getting Started</h2>
        <ul>
          <li><ScrollLink to="introduction" smooth={true} duration={500}>Introduction</ScrollLink></li>
          <li><ScrollLink to="vision-and-mission" smooth={true} duration={500}>Vision and Mission</ScrollLink></li>
        </ul>
        <h2>For Users</h2>
        <ul>
          <li><ScrollLink to="ecoblocks-iot" smooth={true} duration={500}>EcoBlocks IoT</ScrollLink></li>
          <li><ScrollLink to="ecoblocks-app" smooth={true} duration={500}>EcoBlocks App</ScrollLink></li>
          <li><ScrollLink to="ecoblocks-client" smooth={true} duration={500}>EcoBlocks Client</ScrollLink></li>
          <li><ScrollLink to="ecoblocks-zksync" smooth={true} duration={500}>EcoBlocks on zkSync Era</ScrollLink></li>
          <li><ScrollLink to="ecoblocks-portal" smooth={true} duration={500}>EcoBlocks Portal</ScrollLink></li>
          <li><ScrollLink to="ecob-token" smooth={true} duration={500}>ECOB Token</ScrollLink></li>
          <li><ScrollLink to="nft-tool" smooth={true} duration={500}>NFT Minting Tool</ScrollLink></li>
          <li><ScrollLink to="explorer" smooth={true} duration={500}>EcoBlocks Explorer</ScrollLink></li>
          <li><ScrollLink to="participate" smooth={true} duration={500}>Participate</ScrollLink></li>
        </ul>
        <h2>For Developers</h2>
        <ul>
          <li><ScrollLink to="indexer" smooth={true} duration={500}>SubQuery Indexer</ScrollLink></li>
          <li><ScrollLink to="apis" smooth={true} duration={500}>EcoBlocks APIs</ScrollLink></li>
          <li><ScrollLink to="parachain" smooth={true} duration={500}>EcoBlocks Parachain</ScrollLink></li>
          <li><ScrollLink to="modules" smooth={true} duration={500}>Parachain Modules</ScrollLink></li>
          <li><ScrollLink to="sdk" smooth={true} duration={500}>EcoBlocks SDK</ScrollLink></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
