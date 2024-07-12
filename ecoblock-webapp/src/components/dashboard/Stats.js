import React from 'react';

const Stats = ({ totalBlocks }) => {
  return (
    <div className="stats">
      <h2>Total Blocks: {totalBlocks}</h2>
    </div>
  );
}

export default Stats;
