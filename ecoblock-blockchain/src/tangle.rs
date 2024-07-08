use crate::block::{Block, Data, Environment, Location};
use mongodb::{bson::{self, Bson}, Database};
use std::collections::HashMap;
use crate::wallet::Wallet;
use std::sync::Arc;
use tokio::sync::Mutex;
use futures::stream::StreamExt; // Utilisez futures_util::stream::StreamExt

pub struct Tangle {
    pub blocks: HashMap<String, Block>,
    pub db: Database,
    pub wallet: Arc<Mutex<Wallet>>, // Ajout d'un portefeuille pour les récompenses
}

impl Tangle {
    pub async fn new(db: Database, wallet: Arc<Mutex<Wallet>>) -> Self {
        let mut tangle = Tangle { blocks: HashMap::new(), db, wallet };
        tangle.create_genesis_block().await;
        tangle
    }

    async fn create_genesis_block(&mut self) {
        let genesis_block = Block::new(0, current_time(), vec![], Data {
            environment: Environment {
                temperature: 0.0,
                humidity: 0,
                air_quality_index: 0,
                pm25: 0.0,
                pm10: 0.0,
                no2: 0.0,
                co: 0.0,
                o3: 0.0,
                so2: 0.0,
                noise_level: 0.0,
                uv_index: 0,
                radiation_gamma: 0.0,
                water_ph: 0.0,
                water_turbidity: 0.0,
                dissolved_oxygen: 0.0,
            },
            location: Location {
                latitude: 0.0,
                longitude: 0.0,
            },
            timestamp: current_time(),
        }, String::from("system"));
        self.blocks.insert(genesis_block.hash.clone(), genesis_block.clone());
        self.save_block(&genesis_block).await;
    }

    pub async fn add_block(&mut self, data: Data, proposer_id: String) -> Result<(), String> {
        let previous_hashes = self.select_previous_blocks();
        let new_block = Block::new(
            self.blocks.len() as u64,
            current_time(),
            previous_hashes.clone(),
            data,
            proposer_id.clone(),
        );

        if self.validate_block(&new_block) {
            self.blocks.insert(new_block.hash.clone(), new_block.clone());
            self.save_block(&new_block).await;
            self.reward_user(&new_block).await; 
            Ok(())
        } else {
            Err(String::from("Block validation failed"))
        }
    }

    fn select_previous_blocks(&self) -> Vec<String> {
        // Sélectionner deux blocs précédents de manière aléatoire ou selon une politique spécifique
        self.blocks.keys().take(2).cloned().collect()
    }

    fn validate_block(&self, block: &Block) -> bool {
        // Valider que les blocs précédents existent dans le Tangle
        for hash in &block.previous_hashes {
            if !self.blocks.contains_key(hash) {
                return false;
            }
        }
        true
    }

    async fn save_block(&self, block: &Block) {
        let collection = self.db.collection("blocks");
        let serialized_block = bson::to_bson(block).unwrap();
        if let Bson::Document(document) = serialized_block {
            collection.insert_one(document, None).await.unwrap();
        }
    }

    pub async fn load_blocks(&mut self) {
        let collection = self.db.collection("blocks");
        let mut cursor = collection.find(None, None).await.unwrap();

        while let Some(result) = cursor.next().await {
            if let Ok(document) = result {
                let block: Block = bson::from_bson(Bson::Document(document)).unwrap();
                self.blocks.insert(block.hash.clone(), block);
            }
        }
    }

    async fn reward_user(&self, block: &Block) {
        let reward = self.calculate_block_value(block);
        let mut wallet = self.wallet.lock().await;
        wallet.credit(&block.proposer_id, reward);
        println!("Rewarded proposer {} with {} units", block.proposer_id, reward);
    }

    fn calculate_block_value(&self, block: &Block) -> u64 {
        // Calculer la valeur du bloc en fonction des données environnementales
        // Par exemple, une valeur fixe pour chaque type de donnée mesurée
        let mut value = 0;
        if block.data.environment.temperature != 0.0 { value += 10; }
        if block.data.environment.humidity != 0 { value += 10; }
        if block.data.environment.air_quality_index != 0 { value += 10; }
        if block.data.environment.pm25 != 0.0 { value += 10; }
        if block.data.environment.pm10 != 0.0 { value += 10; }
        if block.data.environment.no2 != 0.0 { value += 10; }
        if block.data.environment.co != 0.0 { value += 10; }
        if block.data.environment.o3 != 0.0 { value += 10; }
        if block.data.environment.so2 != 0.0 { value += 10; }
        if block.data.environment.noise_level != 0.0 { value += 10; }
        if block.data.environment.uv_index != 0 { value += 10; }
        if block.data.environment.radiation_gamma != 0.0 { value += 10; }
        if block.data.environment.water_ph != 0.0 { value += 10; }
        if block.data.environment.water_turbidity != 0.0 { value += 10; }
        if block.data.environment.dissolved_oxygen != 0.0 { value += 10; }
        value
    }
}

fn current_time() -> u128 {
    let start = std::time::SystemTime::now();
    let since_epoch = start.duration_since(std::time::UNIX_EPOCH).expect("Time went backwards");
    since_epoch.as_millis()
}
