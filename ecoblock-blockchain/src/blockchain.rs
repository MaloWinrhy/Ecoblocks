use serde::{Serialize, Deserialize};
use sha2::{Sha256, Digest};
use mongodb::{bson, Database};
use std::time::{SystemTime, UNIX_EPOCH};


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Block {
    pub index: u64,
    pub timestamp: String, // Change to String
    pub previous_hash: String,
    pub hash: String,
    pub data: String,
}

impl Block {
    pub fn new(index: u64, timestamp: u128, previous_hash: String, data: String) -> Self {
        let timestamp_str = timestamp.to_string(); // Convert u128 to String
        let mut block = Block {
            index,
            timestamp: timestamp_str,
            previous_hash: previous_hash.clone(),
            hash: String::new(),
            data,
        };
        block.hash = block.calculate_hash();
        block
    }

    pub fn calculate_hash(&self) -> String {
        let data = format!("{}{}{}{}", self.index, self.timestamp, self.previous_hash, self.data);
        let mut hasher = Sha256::new();
        hasher.update(data);
        format!("{:x}", hasher.finalize())
    }
}


pub struct Blockchain {
    pub chain: Vec<Block>,
    pub db: Database,
}

impl Blockchain {
    pub async fn new(db: Database) -> Self {
        let mut blockchain = Blockchain { chain: Vec::new(), db };
        blockchain.create_genesis_block().await;
        blockchain
    }

    async fn create_genesis_block(&mut self) {
        let genesis_block = Block::new(0, current_time(), String::from("0"), String::from("Genesis Block"));
        self.chain.push(genesis_block.clone());
        self.save_block(&genesis_block).await;
    }

    pub async fn add_block(&mut self, data: String) {
        let previous_block = self.chain.last().unwrap();
        let new_block = Block::new(
            previous_block.index + 1,
            current_time(),
            previous_block.hash.clone(),
            data,
        );
        self.chain.push(new_block.clone());
        self.save_block(&new_block).await;
    }

    async fn save_block(&self, block: &Block) {
        let collection = self.db.collection("blocks");
        let serialized_block = bson::to_bson(block).unwrap();
        if let bson::Bson::Document(document) = serialized_block {
            collection.insert_one(document, None).await.unwrap();
        }
    }
}

fn current_time() -> u128 {
    let start = SystemTime::now();
    let since_epoch = start.duration_since(UNIX_EPOCH).expect("Time went backwards");
    since_epoch.as_millis()
}
