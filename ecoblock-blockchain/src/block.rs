use serde::{Serialize, Deserialize};
use sha2::{Sha256, Digest};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Block {
    pub index: u64,
    pub timestamp: f64,
    pub previous_hashes: Vec<String>,
    pub hash: String,
    pub data: Data,
    pub proposer_id: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Data {
    pub environment: Environment,
    pub location: Location,
    pub timestamp: f64,
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
    pub fn new(index: u64, timestamp: f64, previous_hashes: Vec<String>, data: Data, proposer_id: String) -> Self {
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

    pub fn validate_new_block(&self, new_block: &Block) -> bool {
        if new_block.timestamp <= self.timestamp {
            return false;
        }

        if new_block.data.environment.temperature < -273.15 || new_block.data.environment.temperature > 100.0 {
            return false;
        }
        if new_block.data.environment.humidity > 100 {
            return false;
        }
        if new_block.data.environment.air_quality_index > 500 {
            return false;
        }
        if new_block.data.environment.pm25 < 0.0 || new_block.data.environment.pm25 > 500.0 {
            return false;
        }
        if new_block.data.environment.pm10 < 0.0 || new_block.data.environment.pm10 > 500.0 {
            return false;
        }
        if new_block.data.environment.no2 < 0.0 || new_block.data.environment.no2 > 500.0 {
            return false;
        }
        if new_block.data.environment.co < 0.0 || new_block.data.environment.co > 500.0 {
            return false;
        }
        if new_block.data.environment.o3 < 0.0 || new_block.data.environment.o3 > 500.0 {
            return false;
        }
        if new_block.data.environment.so2 < 0.0 || new_block.data.environment.so2 > 500.0 {
            return false;
        }
        if new_block.data.environment.noise_level < 0.0 || new_block.data.environment.noise_level > 200.0 {
            return false;
        }
        if new_block.data.environment.uv_index > 11 {
            return false;
        }
        if new_block.data.environment.radiation_gamma < 0.0 || new_block.data.environment.radiation_gamma > 1000.0 {
            return false;
        }
        if new_block.data.environment.water_ph < 0.0 || new_block.data.environment.water_ph > 14.0 {
            return false;
        }
        if new_block.data.environment.water_turbidity < 0.0 || new_block.data.environment.water_turbidity > 1000.0 {
            return false;
        }
        if new_block.data.environment.dissolved_oxygen < 0.0 || new_block.data.environment.dissolved_oxygen > 20.0 {
            return false;
        }

        true
    }
}
