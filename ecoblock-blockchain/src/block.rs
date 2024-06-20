use serde::{Serialize, Deserialize};
use sha2::{Sha256, Digest};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Block {
    pub index: u64,
    pub timestamp: u128,
    pub previous_hashes: Vec<String>,
    pub hash: String,
    pub data: Data,
    pub proposer_id: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Data {
    pub environment: Environment,
    pub location: Location,
    pub timestamp: u128,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Environment {
    pub temperature: f64,
    pub humidity: u64,
    pub air_quality_index: u64,
    pub pm25: f64,
    pub pm10: f64,
    pub no2: f64,
    pub co: f64,
    pub o3: f64,
    pub so2: f64,
    pub noise_level: f64,
    pub uv_index: u64,
    pub radiation_gamma: f64,
    pub water_ph: f64,
    pub water_turbidity: f64,
    pub dissolved_oxygen: f64,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Location {
    pub latitude: f64,
    pub longitude: f64,
}

impl Block {
    pub fn new(index: u64, timestamp: u128, previous_hashes: Vec<String>, data: Data, proposer_id: String) -> Self {
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
        let data = format!("{}{}{:?}{:?}{}", self.index, self.timestamp, self.previous_hashes, self.data, self.proposer_id);
        let mut hasher = Sha256::new();
        hasher.update(data);
        format!("{:x}", hasher.finalize())
    }
}
