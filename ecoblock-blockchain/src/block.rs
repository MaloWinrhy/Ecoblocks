use serde::{Serialize, Deserialize};
use sha2::{Sha256, Digest};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Block {
    pub index: u64,
    pub timestamp: u64,
    pub previous_hashes: Vec<String>, // Les hachages des blocs précédents
    pub hash: String,
    pub data: String,
    pub proposer_id: String,
}

impl Block {
    pub fn new(index: u64, timestamp: u64, previous_hashes: Vec<String>, data: String, proposer_id: String) -> Self {
        let mut block = Block {
            index,
            timestamp,
            previous_hashes: previous_hashes.clone(),
            hash: String::new(),
            data,
            proposer_id,
        };
        block.hash = block.calculate_hash();
        block
    }

    pub fn calculate_hash(&self) -> String {
        let data = format!("{}{}{:?}{}{}", self.index, self.timestamp, self.previous_hashes, self.data, self.proposer_id);
        let mut hasher = Sha256::new();
        hasher.update(data);
        format!("{:x}", hasher.finalize())
    }
}
