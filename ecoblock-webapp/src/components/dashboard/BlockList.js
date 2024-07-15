import React from 'react';
import './BlockList.css';

const BlockList = ({ blocks, selectedBlocks, setSelectedBlocks }) => {
  const handleSelectBlock = (blockHash) => {
    if (selectedBlocks.includes(blockHash)) {
      setSelectedBlocks(selectedBlocks.filter((hash) => hash !== blockHash));
    } else {
      setSelectedBlocks([...selectedBlocks, blockHash]);
    }
  };

  return (
    <div className="block-list">
      {blocks.map((block) => (
        <div
          key={block.hash}
          className={`block-item ${selectedBlocks.includes(block.hash) ? 'selected' : ''}`}
          onClick={() => handleSelectBlock(block.hash)}
        >
          <h3>EcoBlock: {block.address.split(',')[0]}</h3>
          <p className="block-address">{block.address}</p>
        </div>
      ))}
    </div>
  );
};

export default BlockList;
